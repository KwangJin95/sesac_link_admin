import {
    addOneHour,
    loadToday
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getAdviceReservationListDaily,
    getAdviceReservationListPeriod,
} from "../api/adviceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 엑셀 다운로드 버튼 click
export async function onAdviceReservationDownloadExcelBtnClick (startDateSelector, endDateSelector) {
    // 헤더
    const headers = ["날짜", "시간", "예약자",	"마지막 상태 변경인", "예약 상태"];

    // 상담 예약 목록
    let adviceReservationList;

    // 잡코디 select
    const adminSelectedOption = document.querySelector("#selectAdmin").selectedOptions[0];
    // 잡코디 번호
    const jobAdminNo = adminSelectedOption.value;
    // 잡코디 이름
    const jobCoordinatorName = adminSelectedOption.dataset.name;

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // daily
    if (!endDateSelector) {
        adviceReservationList = await getAdviceReservationListDaily(jobAdminNo,
                                                                    document.querySelector(startDateSelector).value,
                                                                    statusName);
    }
    // period
    else {
        adviceReservationList = await getAdviceReservationListPeriod(jobAdminNo,
                                                                     document.querySelector(startDateSelector).value,
                                                                     document.querySelector(endDateSelector).value,
                                                                     statusName);
    }

    if (!adviceReservationList || adviceReservationList.length === 0) {
        return ;
    }

    // 서버에서 받은 데이터 구조에 맞춰 2차원 배열 만들기
    const dataRows = adviceReservationList.map(item => [
        item.resDate,
        (item.startTime + " - " + item.endTime),
        (item.userNo != null
            ? item.userAuthNameKor + " - " + item.userName
            : item.adminAuthNameKor + " - " + item.adminName),

        (item.statusAdminNo != null
            ? item.statusAdminAuthNameKor + " - " + item.statusAdminName
            : ""),
        item.statusNameKor
    ]);

    // 엑셀 데이터 구성 (헤더 + 데이터)
    const excelData = [headers, ...dataRows];

    // 워크시트 생성
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // 워크북 생성 및 시트 추가
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "예약목록");

    let filename = "잡코디 " + jobCoordinatorName + "_" +
                          document.querySelector(startDateSelector).value;

    if (endDateSelector &&
        (document.querySelector(startDateSelector).value !== document.querySelector(endDateSelector).value)) {
        filename += "~" + document.querySelector(endDateSelector).value;
    }

    filename += "_예약목록.xlsx";

    // 파일 저장
    XLSX.writeFile(workbook, filename);
}


// ------------------------------------------------------------------------------------------------
// 모달 닫기 이벤트 핸들러
export function onAdviceReservationWindowClick(event, modal, form) {
    if (event.target === document.querySelector(modal)) {
        hideElement(modal);

        // 폼 초기화
        document.querySelector(form).reset();
    }

    // 예약 등록 모달
    if (event.target === document.querySelector("#adviceReservationRegisterModal")) {
        hideElement("#adviceReservationRegisterFormAvailableTimeCheckMsg");
    }
}

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 버튼 click
export async function onAdviceReservationRegisterBtnClick(event) {
    event.preventDefault();

    // 상담 예약 잡코디 select
    const adviceReservationRegisterFormJobAdmin = document.querySelector("#adviceReservationRegisterFormJobAdmin");

    // 잡코디 목록 없음
    if (!adviceReservationRegisterFormJobAdmin ||
        adviceReservationRegisterFormJobAdmin.selectedOptions.length === 0 ||
        adviceReservationRegisterFormJobAdmin.selectedOptions[0].disabled) {
        return;
    }

    // 기존 필터링된 잡코디로 세팅
    adviceReservationRegisterFormJobAdmin.value = document.querySelector("#selectAdmin").value;

    // 오늘 날짜 load
    loadToday("#adviceReservationRegisterFormResDate");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 오늘 날짜 이후로 select 하도록 min 설정
    document.querySelector("#adviceReservationRegisterFormResDate")
        .setAttribute("min", todayStr);

    showElement("#adviceReservationRegisterModal");
}

// 예약 등록 - 시작 및 종료 시간 change 이벤트 핸들러
export function onAdviceReservationAvailableTimeChange(startTime, endTime, checkMsg) {

    const availableStartTime = document.querySelector(startTime).value;
    const availableEndTime = document.querySelector(endTime).value;

    const today = new Date().toISOString().split("T")[0]

    const startDate = new Date(`${today}T${availableStartTime}`);
    const endDate = new Date(`${today}T${availableEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}

// 예약 등록 모달 닫기 버튼 click
export function onAdviceReservationRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#adviceReservationRegisterFormAvailableTimeCheckMsg");
}
// 예약 등록 폼 - 등록하기 버튼 click 이벤트 핸들러
export async function onAdviceReservationRegisterFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const adviceReservationRegisterForm = document.querySelector("#adviceReservationRegisterForm");

    const adviceReservationRegisterFormStartTime =
        document.querySelector("#adviceReservationRegisterFormStartTime").value;
    const adviceReservationRegisterFormEndTime =
        document.querySelector("#adviceReservationRegisterFormEndTime").value;

    const today     = new Date().toISOString().split("T")[0]
    const startDate = new Date(`${today}T${adviceReservationRegisterFormStartTime}`);
    const endDate   = new Date(`${today}T${adviceReservationRegisterFormEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement("#adviceReservationRegisterFormAvailableTimeCheckMsg");
        return ;
    }

    // 예약 등록
    const result = await sendFormData("/api/reservation/advice",
                                            "POST",
                                                    adviceReservationRegisterForm);
    const message = await result.text();

    // 폼 초기화
    adviceReservationRegisterForm.reset();
    
    // 예약 등록 모달 닫기
    hideElement("#adviceReservationRegisterModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    if (typeof callback === "function") {
        await callback();
    }
}

// 예약 테이블 click 이벤트 핸들러
export async function onAdviceReservationTbodyClick(event) {
    event.preventDefault();

    // 예약 상태 변경 버튼 클릭 이벤트
    if (event.target.classList.contains("adviceReservationReservationStatusModifyBtn")) {
        const adviceReservationReservationStatusModifyBtn = event.target;

        const resDate = adviceReservationReservationStatusModifyBtn.dataset.resDate;
        const startTime = adviceReservationReservationStatusModifyBtn.dataset.startTime;
        const endTime = adviceReservationReservationStatusModifyBtn.dataset.endTime;

        const userAuthNameKor = adviceReservationReservationStatusModifyBtn.dataset.userAuthNameKor;
        const userName = adviceReservationReservationStatusModifyBtn.dataset.userName;

        const jobAdminNo = adviceReservationReservationStatusModifyBtn.dataset.jobAdminNo;
        const jobAdminName = adviceReservationReservationStatusModifyBtn.dataset.jobAdminName;

        const adminAuthNameKor = adviceReservationReservationStatusModifyBtn.dataset.adminAuthNameKor;
        const adminName = adviceReservationReservationStatusModifyBtn.dataset.adminName;

        const statusAdminAuthNameKor = adviceReservationReservationStatusModifyBtn.dataset.statusAdminAuthNameKor;
        const statusAdminName = adviceReservationReservationStatusModifyBtn.dataset.statusAdminName;

        const reservationStatusNo = adviceReservationReservationStatusModifyBtn.dataset.reservationStatusNo;
        const adviceReservationNo = adviceReservationReservationStatusModifyBtn.dataset.adviceReservationNo;

        // 정보 표시 및 값 설정
        // 잡코디 이름
        document.querySelector("#adviceReservationReservationStatusModifyFormJobAdminName").value
            = jobAdminName;
        // 날짜
        document.querySelector("#adviceReservationReservationStatusModifyFormResDate").value
            = resDate;
        // 시작 시간
        document.querySelector("#adviceReservationReservationStatusModifyFormStartTime").value
            = startTime;
        // 종료 시간
        document.querySelector("#adviceReservationReservationStatusModifyFormEndTime").value
            = endTime;
        // 예약자
        document.querySelector("#adviceReservationReservationStatusModifyFormUser").value
            = userName !== 'null' ? userAuthNameKor + " - " + userName :
            adminAuthNameKor + " - " + adminName;
        // 마지막 상태 변경인
        document.querySelector("#adviceReservationReservationStatusModifyFormStatusAdmin").value
            = statusAdminName !== 'null' ? statusAdminAuthNameKor + " - " + statusAdminName :
            "";
        // 예약 상태
        document.querySelector("#adviceReservationReservationStatusModifyFormReservationStatus").value
            = reservationStatusNo;

        // 잡코디 번호
        document.querySelector("#adviceReservationReservationStatusModifyFormJobAdminNo").value
            = jobAdminNo;

        // 예약 번호
        document.querySelector("#adviceReservationReservationStatusModifyFormAdviceReservationNo").value
            = adviceReservationNo;

        showElement("#adviceReservationReservationStatusModifyModal");
    }

    // 첨부파일 다운로드 버튼 click 이벤트
    if (event.target.classList.contains("adviceFileDownloadBtn")) {
        const adviceFileDownloadBtn = event.target;

        // 첨부파일 이름
        const adviceFile = adviceFileDownloadBtn.dataset.adviceFile;

        await fetch(`/api/reservation/advice/advice-file/${adviceFile}`, {
            method: 'GET'
        })
            .then(async response => {
                const blob = await response.blob();

                // disposition 헤더 추출
                const disposition = response.headers.get('Content-Disposition');

                const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/);

                const filename = filenameMatch ? filenameMatch[1] : 'downloaded-file';

                // 파일 다운로드 링크 생성
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = decodeURIComponent(filename); // 한글 깨짐 방지
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('다운로드 실패:', error);
            });
    }
}