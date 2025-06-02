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
    getSpaceReservationListDaily,
    getSpaceReservationListPeriod
} from "../api/spaceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 엑셀 다운로드 버튼 click
export async function onSpaceReservationDownloadExcelBtnClick (startDateSelector, endDateSelector) {
    // 헤더
    const headers = ["날짜", "시간", "예약자",	"인원수", "사용 목적",	"마지막 상태 변경인", "예약 상태"];

    // 공간 예약 목록
    let spaceReservationList;

    // 공간 select
    const spaceSelectedOption = document.querySelector("#selectSpace").selectedOptions[0];
    // 공간 번호
    const spaceNo = spaceSelectedOption.dataset.spaceNo;
    // 공간 이름
    const spaceName = spaceSelectedOption.dataset.spaceName;

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // daily
    if (!endDateSelector) {
        spaceReservationList = await getSpaceReservationListDaily(spaceNo,
                                                                  document.querySelector(startDateSelector).value,
                                                                  reservationStatusSelectedOption.value);
    }
    // period
    else {
        spaceReservationList = await getSpaceReservationListPeriod(spaceNo,
                                                                  document.querySelector(startDateSelector).value,
                                                                  document.querySelector(endDateSelector).value,
                                                                  reservationStatusSelectedOption.value);
    }

    if (!spaceReservationList || spaceReservationList.length === 0) {
        return ;
    }

    // 서버에서 받은 데이터 구조에 맞춰 2차원 배열 만들기
    const dataRows = spaceReservationList.map(item => [
        item.resDate,
        (item.startTime + " - " + item.endTime),
        (item.userNo != null
            ? item.userAuthNameKor + " - " + item.userName
            : item.adminAuthNameKor + " - " + item.adminName),

        item.peopleCount,
        item.purpose,
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

    let filename = spaceName + "_" +
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
export function onSpaceReservationWindowClick(event, modal, form) {
    if (event.target === document.querySelector(modal)) {
        hideElement(modal);

        // 폼 초기화
        document.querySelector(form).reset();
    }

    // 예약 등록 모달
    if (event.target === document.querySelector("#spaceReservationRegisterModal")) {
        hideElement("#spaceReservationRegisterFormPeopleCountInputMsg");
        hideElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
        hideElement("#spaceReservationRegisterFormPurposeInputMsg");
        hideElement("#spaceReservationRegisterFormAvailableTimeCheckMsg");
    }
}

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 버튼 click
export async function onSpaceReservationRegisterBtnClick(event) {
    event.preventDefault();

    // 공간 예약 등록 공간 select
    const spaceReservationRegisterFormSpace = document.querySelector("#spaceReservationRegisterFormSpace");

    // 공간 목록 없음
    if (!spaceReservationRegisterFormSpace ||
         spaceReservationRegisterFormSpace.selectedOptions.length === 0 ||
         spaceReservationRegisterFormSpace.selectedOptions[0].disabled) {
        return;
    }

    // 기존 필터링된 공간으로 세팅
    spaceReservationRegisterFormSpace.value = document.querySelector("#selectSpace").value;

    // 오늘 날짜 load
    loadToday("#spaceReservationRegisterFormResDate");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 오늘 날짜 이후로 select 하도록 min 설정
    document.querySelector("#spaceReservationRegisterFormResDate")
        .setAttribute("min", todayStr);

    // 예약 등록 공간 정보 세팅
    await onSpaceReservationRegisterFormSpaceChange();

    showElement("#spaceReservationRegisterModal");
}
// 예약 등록 - 공간 change
export async function onSpaceReservationRegisterFormSpaceChange() {
    // 공간 예약 등록 공간 select
    const space =
        document.querySelector("#spaceReservationRegisterFormSpace").selectedOptions[0];

    // 공간 시작 시간
    const spaceAvailableStartTime = space.dataset.spaceAvailableStartTime;
    // 공간 종료 시간
    const spaceAvailableEndTime = space.dataset.spaceAvailableEndTime;

    // 공간 정보 보여주기
    // 공간 이미지
    document.querySelector("#spaceReservationRegisterFormSpaceImage").innerHTML =
        '<img src="/api/space/view/' + space.dataset.spaceImage + '" class="w-64 h-40" />';
    // 화이트보드
    document.querySelector("#spaceReservationRegisterFormSpaceWhiteBoard").innerHTML =
        (space.dataset.whiteBoard ? '있음' : '없음');
    // 빔프로젝터
    document.querySelector("#spaceReservationRegisterFormSpaceBeamProjector").innerHTML =
        (space.dataset.beamProjector ? '있음' : '없음');
    // 공간 인원수
    document.querySelector("#spaceReservationRegisterFormSpacePeopleCount").innerHTML =
        space.dataset.peopleCount + '명';

    let timeOptionValue = spaceAvailableStartTime;
    let str = "";

    str += `<option value=${timeOptionValue}>${timeOptionValue}</option>`;
    // 공간 시작 시간 ~ 종료 시간 option 추가
    while (timeOptionValue !== spaceAvailableEndTime){
        timeOptionValue = addOneHour(timeOptionValue);
        str += `<option value=${timeOptionValue}>${timeOptionValue}</option>`;
    }

    const spaceReservationRegisterFormStartTime = document.querySelector("#spaceReservationRegisterFormStartTime");
    const spaceReservationRegisterFormEndTime = document.querySelector("#spaceReservationRegisterFormEndTime");

    spaceReservationRegisterFormStartTime.innerHTML = str;
    spaceReservationRegisterFormEndTime.innerHTML = str;

    spaceReservationRegisterFormEndTime.value = spaceAvailableEndTime;
}
// 예약 등록 - 시작 및 종료 시간 change 이벤트 핸들러
export function onSpaceReservationAvailableTimeChange(startTime, endTime, checkMsg) {

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
// 예약 등록 - 사용 목적 input 이벤트 핸들러
export function onSpaceReservationPurposeInput(event, inputMsg) {
    const purpose = event.target;

    // 사용 목적 입력값 확인 후 입력 메시지 출력
    if (purpose.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 예약 등록 - 인원수 input 이벤트 핸들러
export function onSpaceReservationPeopleCountInput(event, inputMsg, checkMsg) {
    const peopleCount = event.target;

    // 공간 예약 등록 공간 select
    const space = document.querySelector("#spaceReservationRegisterFormSpace").selectedOptions[0];

    const spacePeopleCount = space.dataset.peopleCount;

    // 인원수 입력 확인 후 입력 메시지 출력
    if (peopleCount.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 인원수 입력값 검증 후 검증 메시지 출력
    if (isNaN(peopleCount.value.trim()) ||
        parseInt(peopleCount.value.trim()) < 1 ||
        parseInt(peopleCount.value.trim()) > parseInt(spacePeopleCount)) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}
// 예약 등록 모달 닫기 버튼 click
export function onSpaceReservationRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#spaceReservationRegisterFormPeopleCountInputMsg");
    hideElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
    hideElement("#spaceReservationRegisterFormPurposeInputMsg");
    hideElement("#spaceReservationRegisterFormAvailableTimeCheckMsg");
}
// 예약 등록 폼 - 등록하기 버튼 click 이벤트 핸들러
export async function onSpaceReservationRegisterFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const spaceReservationRegisterForm = document.querySelector("#spaceReservationRegisterForm");

    const spaceReservationRegisterFormPeopleCount =
        document.querySelector("#spaceReservationRegisterFormPeopleCount");
    const spaceReservationRegisterFormPurpose =
        document.querySelector("#spaceReservationRegisterFormPurpose");
    const spaceReservationRegisterFormStartTime =
        document.querySelector("#spaceReservationRegisterFormStartTime").value;
    const spaceReservationRegisterFormEndTime =
        document.querySelector("#spaceReservationRegisterFormEndTime").value;

    // 공간 예약 등록 공간 select
    const space = document.querySelector("#spaceReservationRegisterFormSpace")
                                        .selectedOptions[0];

    const spacePeopleCount = space.dataset.peopleCount;

    // 인원수 입력값 없음
    if (spaceReservationRegisterFormPeopleCount.value.trim() == "") {
        spaceReservationRegisterFormPeopleCount.focus();
        showElement("#spaceReservationRegisterFormPeopleCountInputMsg");
        return ;
    }
    // 인원수 입력값 검증
    if (isNaN(spaceReservationRegisterFormPeopleCount.value.trim()) ||
        parseInt(spaceReservationRegisterFormPeopleCount.value.trim()) < 1 ||
        parseInt(spaceReservationRegisterFormPeopleCount.value.trim()) > parseInt(spacePeopleCount)) {
        spaceReservationRegisterFormPeopleCount.focus();
        showElement("#spaceReservationRegisterFormPeopleCountCheckMsg");
        return ;
    }
    // 사용 목적 입력값 없음
    if (spaceReservationRegisterFormPurpose.value.trim() == "") {
        spaceReservationRegisterFormPurpose.focus();
        showElement("#spaceReservationRegisterFormPurposeInputMsg");
        return ;
    }

    const today     = new Date().toISOString().split("T")[0]
    const startDate = new Date(`${today}T${spaceReservationRegisterFormStartTime}`);
    const endDate   = new Date(`${today}T${spaceReservationRegisterFormEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement("#spaceRegisterFormAvailableTimeCheckMsg");
        return ;
    }

    // 예약 등록
    const result = await sendFormData("/api/reservation/space",
                                            "POST",
                                                    spaceReservationRegisterForm);
    const message = await result.text();

    // 폼 초기화
    spaceReservationRegisterForm.reset();
    
    // 예약 등록 모달 닫기
    hideElement("#spaceReservationRegisterModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    if (typeof callback === "function") {
        await callback();
    }
}