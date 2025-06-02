import {
    hideElement, showElement,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    loadToday,
    getTimeSlots,
    prepareTimeSlotStatusCounts,
    renderStackedReservationChartDaily
} from "../utils/reservationUtil.js";

import {
    getAdviceReservationListDaily
} from "../api/adviceReservationApi.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

// ------------------------------------------------------------------------------------------------
// 상담 예약 목록 초기화 버튼 click(일별)
export async function onSearchAdviceReservationFormResetBtnClickDaily() {
    // 검색 조건 form
    const searchAdviceReservationForm = document.querySelector("#searchAdviceReservationForm");
    // form 초기화
    searchAdviceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#adviceReservationDateDaily");

    // 예약 목록 생성
    await onAdviceReservationSearchSelectChangeDaily();
}
// 상담 예약 목록(일별)
export async function onAdviceReservationSearchSelectChangeDaily() {
    // 상담 예약 목록 tbody
    const adviceReservationTbody = document.querySelector("#adviceReservationTbody");
    // 권한
    const authName = document.querySelector("#adviceReservationTbody").dataset.authName;
    // 잡코디 select
    const adminSelectedOption = document.querySelector("#selectAdmin").selectedOptions[0];
    // 잡코디 번호
    const jobAdminNo = adminSelectedOption.value;

    // 잡코디 목록 없음
    if (jobAdminNo.trim() === "잡코디 목록 없음") {
        adviceReservationTbody.innerHTML = `<tr><td colSpan="6" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td></tr>`;;

        // 차트 숨김
        hideElement("#reservationStatusChart");

        return false;
    }

    // 날짜 select
    const adviceReservationDateDaily = document.querySelector("#adviceReservationDateDaily");
    // 날짜
    const resDate = adviceReservationDateDaily.value;

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 상담 예약 목록
    let adviceReservationList = await getAdviceReservationListDaily(jobAdminNo, resDate, statusName);

    const timeSlots = getTimeSlots("09:00", "18:00");
    const dataMap = prepareTimeSlotStatusCounts(adviceReservationList, timeSlots);

    // 차트 그리기
    renderStackedReservationChartDaily(dataMap, timeSlots);

    // 목록 생성
    let str = "";
    let previousStartTime = null;

    if (!adviceReservationList || adviceReservationList.length === 0) {
        // const colspan = (authName === 'SUPER_ADMIN') ? 7 : 6;
        const colspan = 6;
        str += `<tr class="hover:bg-gray-50">
                   <td colSpan="${colspan}" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td>
                </tr>`;
    } else {
        adviceReservationList.forEach(dto => {
            // 이전 시간과 다르면 빈 줄 추가
            if (previousStartTime !== null && dto.startTime !== previousStartTime) {
                str += `
                <tr><td colspan="6" class="bg-white py-1 bg-gray-400"></td></tr>
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
                    ${dto.userNo != null ?
                        `${dto.userAuthNameKor} - ${dto.userName}` :
                        `${dto.adminAuthNameKor} - ${dto.adminName}`
                    }
                </td>
                
                <td class="py-1 px-1 text-left border border-gray-300">
                    ${dto.statusAdminNo != null ?
                        `${dto.statusAdminAuthNameKor} - ${dto.statusAdminName}` :
                        ``
                    }
                </td>
                <td class="py-1 px-1 text-center border border-gray-300 font-bold ${statusColorClass}">${dto.statusNameKor}</td>
                <td class="py-1 px-1 text-center border border-gray-300">
                    ${dto.adviceFile != null && dto.adviceFile !== '' ?
                        `<div class="flex justify-center space-x-3">
                            <button class="adviceFileDownloadBtn px-1 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                                    data-advice-file="${dto.adviceFile}"
                            >
                                다운로드
                            </button>
                        </div>` :
                        ``
                    }
                </td>
                
                <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-3">
                        <button class="adviceReservationReservationStatusModifyBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                data-advice-reservation-no="${dto.adviceReservationNo}"
                                data-reservation-status-no="${dto.reservationStatusNo}"
                                data-res-date="${dto.resDate}"
                                data-start-time="${dto.startTime}"
                                data-end-time="${dto.endTime}" 
                                data-user-name="${dto.userName}" 
                                data-user-auth-name-kor="${dto.userAuthNameKor}"
                                data-job-admin-no="${dto.jobAdminNo}" 
                                data-job-admin-name="${dto.jobAdminName}" 
                                data-admin-name="${dto.adminName}" 
                                data-admin-auth-name-kor="${dto.adminAuthNameKor}"
                                data-status-admin-name="${dto.statusAdminName}"
                                data-status-admin-auth-name-kor="${dto.statusAdminAuthNameKor}"
                        >
                            예약 상태 변경
                        </button>
                    </div>
                </td>
            </tr>`;
            
            previousStartTime = dto.startTime;
        });
    }
    adviceReservationTbody.innerHTML = str;
}

// ------------------------------------------------------------------------------------------------
// 예약 상태 변경 폼 - 변경하기 버튼 click 이벤트 핸들러
export async function onAdviceReservationReservationStatusModifyFormSubmitBtnClick(event, callback) {
    event.preventDefault();

    // form data
    const adviceReservationReservationStatusModifyForm =
        document.querySelector("#adviceReservationReservationStatusModifyForm");

    // 예약 상태 변경
    const result = await sendFormData("/api/reservation/advice",
                                            "PUT",
                                                   adviceReservationReservationStatusModifyForm);
    const message = await result.text();

    // 예약 상태 변경 모달 닫기
    hideElement("#adviceReservationReservationStatusModifyModal");

    // 알림 메시지
    showAlertMessage(message);

    // 상담 예약 목록
    if (typeof callback === "function") {
        await callback();
    }
}
// 예약 상태 변경 모달 닫기 버튼 click
export function onAdviceReservationReservationStatusModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
}

