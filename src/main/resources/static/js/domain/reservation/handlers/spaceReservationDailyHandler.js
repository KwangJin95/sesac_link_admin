import {
    getTimeSlots,
    loadToday,
    prepareTimeSlotStatusCounts,
    renderStackedReservationChartDaily
} from "../utils/reservationUtil.js";

import {
    getSpaceReservationListDaily,
} from "../api/spaceReservationApi.js";

import {
    showElement, hideElement,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

// ------------------------------------------------------------------------------------------------
// 공간 예약 목록 초기화 버튼 click(일별)
export async function onSearchSpaceReservationFormResetBtnClickDaily() {
    // 검색 조건 form
    const searchSpaceReservationForm = document.querySelector("#searchSpaceReservationForm");
    // form 초기화
    searchSpaceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#spaceReservationDateDaily");

    // 예약 목록 생성
    await onSpaceReservationSearchSelectChangeDaily();
}
// 공간 예약 목록(일별)
export async function onSpaceReservationSearchSelectChangeDaily() {
    // 공간 예약 목록 tbody
    const spaceReservationTbody = document.querySelector("#spaceReservationTbody");
    // 권한
    const authName = document.querySelector("#spaceReservationTbody").dataset.authName;
    // 공간 select
    const spaceSelectedOption = document.querySelector("#selectSpace").selectedOptions[0];

    // 공간 목록 없음
    if (spaceSelectedOption.value.trim() === "공간 목록 없음") {
        const colspan = (authName === 'SUPER_ADMIN') ? 7 : 6;

        spaceReservationTbody.innerHTML = `<tr><td colSpan="${colspan}" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td></tr>`;;

        // 차트 숨김
        hideElement("#reservationStatusChart");

        return false;
    }

    // 공간 정보
    const spaceNo = spaceSelectedOption.dataset.spaceNo;
    const startTime = spaceSelectedOption.dataset.spaceAvailableStartTime;
    const endTime = spaceSelectedOption.dataset.spaceAvailableEndTime;

    // 날짜 select
    const spaceReservationDateDaily = document.querySelector("#spaceReservationDateDaily");
    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // 날짜
    const resDate = spaceReservationDateDaily.value;
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 공간 예약 목록
    let spaceReservationList = await getSpaceReservationListDaily(spaceNo, resDate, statusName);

    const timeSlots = getTimeSlots(startTime, endTime);
    const dataMap = prepareTimeSlotStatusCounts(spaceReservationList, timeSlots);

    // 차트 그리기
    renderStackedReservationChartDaily(dataMap, timeSlots);

    // 목록 생성
    let str = "";
    let previousStartTime = null;

    if (!spaceReservationList || spaceReservationList.length === 0) {
        const colspan = (authName === 'SUPER_ADMIN') ? 7 : 6;
        str += `<tr><td colSpan="${colspan}" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td></tr>`;
    } else {
        spaceReservationList.forEach(dto => {
            // 이전 시간과 다르면 빈 줄 추가
            if (previousStartTime !== null && dto.startTime !== previousStartTime) {
                str += `
                <tr><td colspan="7" class="bg-white py-1 bg-gray-400"></td></tr>
            `;
            }
            let statusColorClass = "";

            switch (dto.statusNameKor) {
                case "승인":
                    statusColorClass = "text-blue-600";
                    break;
                case "취소":
                    statusColorClass = "text-gray-600";
                    break;
                case "거절":
                    statusColorClass = "text-red-600";
                    break;
                default:
                    statusColorClass = "text-black";
            }

            str += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="py-1 px-1 text-center border border-gray-300">${dto.startTime} - ${dto.endTime}</td>
                <td class="py-1 px-1 text-left border border-gray-300">
                    ${dto.userNo != null
                ? `${dto.userAuthNameKor} - ${dto.userName}`
                : `${dto.adminAuthNameKor} - ${dto.adminName}`
            }
                </td>
                <td class="py-1 px-1 text-center border border-gray-300">${dto.peopleCount}</td>
                <td class="py-1 px-1 text-left border border-gray-300 truncate max-w-[180px]" title="${dto.purpose}">${dto.purpose}</td>
                <td class="py-1 px-1 text-left border border-gray-300">
                    ${dto.statusAdminNo != null
                ? `${dto.statusAdminAuthNameKor} - ${dto.statusAdminName}`
                : ""
            }
                </td>
                
                <td class="py-1 px-1 text-center border border-gray-300 font-bold ${statusColorClass}">${dto.statusNameKor}</td>
            `;

            // SUPER_ADMIN 권한일 때만 예약 상태 변경 버튼 추가
            if (authName === 'SUPER_ADMIN') {
                str += `
                <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-3">
                        <button class="spaceReservationReservationStatusModifyBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                data-space-reservation-no="${dto.spaceReservationNo}"
                                data-reservation-status-no="${dto.reservationStatusNo}"
                                data-res-date="${dto.resDate}"
                                data-start-time="${dto.startTime}"
                                data-end-time="${dto.endTime}" 
                                data-user-name="${dto.userName}" 
                                data-user-auth-name-kor="${dto.userAuthNameKor}"
                                data-admin-name="${dto.adminName}" 
                                data-admin-auth-name-kor="${dto.adminAuthNameKor}"
                                data-status-admin-name="${dto.statusAdminName}"
                                data-status-admin-auth-name-kor="${dto.statusAdminAuthNameKor}"
                        >
                            예약 상태 변경
                        </button>
                    </div>
                </td>
                `;
            }
            str += `</tr>`;
            
            previousStartTime = dto.startTime;
        });
    }
    spaceReservationTbody.innerHTML = str;
}

// ------------------------------------------------------------------------------------------------
// 예약 상태 변경
// 예약 테이블 click 이벤트 핸들러
export async function onSpaceReservationTbodyClick(event) {
    event.preventDefault();

    // 예약 상태 변경 버튼 클릭 이벤트
    if (event.target.classList.contains("spaceReservationReservationStatusModifyBtn")) {
        const spaceReservationReservationStatusModifyBtn = event.target;

        const resDate = spaceReservationReservationStatusModifyBtn.dataset.resDate;
        const startTime = spaceReservationReservationStatusModifyBtn.dataset.startTime;
        const endTime = spaceReservationReservationStatusModifyBtn.dataset.endTime;

        const userAuthNameKor = spaceReservationReservationStatusModifyBtn.dataset.userAuthNameKor;
        const userName = spaceReservationReservationStatusModifyBtn.dataset.userName;

        const adminAuthNameKor = spaceReservationReservationStatusModifyBtn.dataset.adminAuthNameKor;
        const adminName = spaceReservationReservationStatusModifyBtn.dataset.adminName;

        const statusAdminAuthNameKor = spaceReservationReservationStatusModifyBtn.dataset.statusAdminAuthNameKor;
        const statusAdminName = spaceReservationReservationStatusModifyBtn.dataset.statusAdminName;

        const reservationStatusNo = spaceReservationReservationStatusModifyBtn.dataset.reservationStatusNo;
        const spaceReservationNo = spaceReservationReservationStatusModifyBtn.dataset.spaceReservationNo;
        const spaceNo = document.querySelector("#selectSpace").selectedOptions[0].value;

        // 정보 표시 및 값 설정
        // 날짜
        document.querySelector("#spaceReservationReservationStatusModifyFormResDate").value
            = resDate;
        // 시작 시간
        document.querySelector("#spaceReservationReservationStatusModifyFormStartTime").value
            = startTime;
        // 종료 시간
        document.querySelector("#spaceReservationReservationStatusModifyFormEndTime").value
            = endTime;
        // 예약자
        document.querySelector("#spaceReservationReservationStatusModifyFormUser").value
            = userName !== 'null' ? userAuthNameKor + " - " + userName :
                                    adminAuthNameKor + " - " + adminName;
        // 마지막 상태 변경인
        document.querySelector("#spaceReservationReservationStatusModifyFormStatusAdmin").value
            = statusAdminName !== 'null' ? statusAdminAuthNameKor + " - " + statusAdminName :
                                           "";
        // 예약 상태
        document.querySelector("#spaceReservationReservationStatusModifyFormReservationStatus").value
            = reservationStatusNo;

        // 예약 번호
        document.querySelector("#spaceReservationReservationStatusModifyFormSpaceReservationNo").value
            = spaceReservationNo;

        // 공간 번호
        document.querySelector("#spaceReservationReservationStatusModifyFormSpaceNo").value
            = spaceNo;

        showElement("#spaceReservationReservationStatusModifyModal");
    }
}
// 예약 상태 변경 폼 - 변경하기 버튼 click 이벤트 핸들러
export async function onSpaceReservationReservationStatusModifyFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const spaceReservationReservationStatusModifyForm =
        document.querySelector("#spaceReservationReservationStatusModifyForm");

    // 예약 상태 변경
    const result = await sendFormData("/api/reservation/space",
                                            "PUT",
                                                   spaceReservationReservationStatusModifyForm);
    const message = await result.text();

    // 예약 상태 변경 모달 닫기
    hideElement("#spaceReservationReservationStatusModifyModal");

    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    if (typeof callback === "function") {
        await callback();
    }
}
// 예약 상태 변경 모달 닫기 버튼 click
export function onSpaceReservationReservationStatusModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
}
