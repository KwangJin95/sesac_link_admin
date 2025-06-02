import {
    addOneDay,
    loadToday,
    getTimeSlots,
    prepareTimeSlotStatusCounts,
    renderStackedReservationChartPeriod
} from "../utils/reservationUtil.js";

import {
    showElement, hideElement,
} from "../../../global/util/utils.js";

import {
    getResDate,
    setResDate,
    setAdviceReservationList, getAdviceReservationList
} from "../advice.period.js";

import {
    getAdviceReservationListDaily
} from "../api/adviceReservationApi.js";

// ------------------------------------------------------------------------------------------------
// 상담 예약 목록 초기화 버튼 click(기간별)
export async function onSearchAdviceReservationFormResetBtnClickPeriod() {
    // 검색 조건 form
    const searchAdviceReservationForm = document.querySelector("#searchAdviceReservationForm");
    const adviceReservationDatePeriodStart = document.querySelector("#adviceReservationDatePeriodStart");
    // form 초기화
    searchAdviceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#adviceReservationDatePeriodStart");
    loadToday("#adviceReservationDatePeriodEnd");

    // 날짜, 목록 초기화
    setResDate(adviceReservationDatePeriodStart.value);
    setAdviceReservationList([]);

    // 차트 초기화
    const canvas = document.getElementById('reservationStatusChart');
    canvas.classList.add("hidden");
    if (window.reservationChart) {
        window.reservationChart.destroy();
        window.reservationChart = null;
    }

    // 예약 목록 생성
    await onAdviceReservationSearchSelectChangePeriod();
}
// 상담 예약 목록(기간별)
export async function onAdviceReservationSearchSelectChangePeriod() {
    // 상담 예약 목록 tbody
    const adviceReservationTbody = document.querySelector("#adviceReservationTbody");
    // 잡코디 select
    const adminSelectedOption = document.querySelector("#selectAdmin").selectedOptions[0];
    // 잡코디 번호
    const jobAdminNo = adminSelectedOption.value;

    // 날짜 select
    const adviceReservationDatePeriodStart = document.querySelector("#adviceReservationDatePeriodStart");
    const adviceReservationDatePeriodEnd   = document.querySelector("#adviceReservationDatePeriodEnd");

    // 시작 > 끝 날짜
    if (new Date(adviceReservationDatePeriodStart.value) > new Date(adviceReservationDatePeriodEnd.value)) {
       // 끝 날짜를 시작 날짜로 바꿈
       adviceReservationDatePeriodEnd.value = adviceReservationDatePeriodStart.value;
    }
    // 날짜
    setResDate(adviceReservationDatePeriodStart.value);

    // 잡코디 목록 없음
    if (jobAdminNo.trim() === "잡코디 목록 없음") {
        adviceReservationTbody.innerHTML = `<tr><td colSpan="6" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td></tr>`;;

        // 차트 숨김
        hideElement("#reservationStatusChart");
        // 더보기 버튼 숨김
        hideElement("#loadMoreBtn");

        return false;
    }

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 상담 예약 목록
    let adviceReservationList;

    while (getResDate() <= adviceReservationDatePeriodEnd.value) {
        adviceReservationList = await getAdviceReservationListDaily(jobAdminNo,
                                                                    getResDate(),
                                                                    statusName);

        if (!adviceReservationList || adviceReservationList.length === 0) {
            setResDate(addOneDay(getResDate()));
        } else {
            break;
        }
    }

    setAdviceReservationList(adviceReservationList);

    // 목록 생성
    let str = "";
    let previousStartTime = null;

    if (!adviceReservationTbody || adviceReservationTbody.length === 0) {
        str += `<tr class="hover:bg-gray-50">
                    <td colSpan="6" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td>
                </tr>`;
        adviceReservationTbody.innerHTML = str;
        hideElement("#loadMoreBtn");

        // 차트 숨기기
        const canvas = document.querySelector("#reservationStatusChart");
        const container = document.querySelector("#reservationChartContainer");
        canvas.classList.add("hidden");
        container.classList.add("hidden");

        if (window.reservationChart) {
            window.reservationChart.destroy();
            window.reservationChart = null;
        }

        return ;
    } else {
        setAdviceReservationList(adviceReservationList);
        showElement("#loadMoreBtn");

        const timeSlots = getTimeSlots("09:00", "18:00");
        const dataMap = prepareTimeSlotStatusCounts(getAdviceReservationList(), timeSlots);

        // 차트 그리기
        renderStackedReservationChartPeriod(dataMap, timeSlots);

        adviceReservationList.forEach(dto => {
            // 이전 시간과 다르면 빈 줄 추가
            if (previousStartTime !== null && dto.startTime !== previousStartTime) {
                str += `
                    <tr><td colspan="6" class="py-1 bg-white bg-gray-400"></td></tr>
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
                <td class="py-1 px-1 text-center border border-gray-300">${dto.resDate}</td>
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
            </tr>`;
            previousStartTime = dto.startTime;
        });
    }
    adviceReservationTbody.innerHTML = str;
}
// 상담 예약 목록(기간별) 더 보기 버튼 click
export async function onAdviceReservationLoadMoreBtnClick(event) {
    event.preventDefault();

    // 권한
    const authName = document.querySelector("#adviceReservationTbody").dataset.authName;
    // 잡코디 select
    const adminSelectedOption = document.querySelector("#selectAdmin").selectedOptions[0];
    // 잡코디 번호
    const jobAdminNo = adminSelectedOption.value;

    // 날짜 select
    const adviceReservationDatePeriodStart = document.querySelector("#adviceReservationDatePeriodStart");
    const adviceReservationDatePeriodEnd   = document.querySelector("#adviceReservationDatePeriodEnd");

    // 시작 > 끝 날짜
    if (new Date(adviceReservationDatePeriodStart.value) > new Date(adviceReservationDatePeriodEnd.value)) {
        // 끝 날짜를 시작 날짜로 바꿈
        adviceReservationDatePeriodEnd.value = adviceReservationDatePeriodStart.value;
    }

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 목록 생성
    // 상담 예약 목록 tbody
    const adviceReservationTbody = document.querySelector("#adviceReservationTbody");
    let str = "";
    let previousStartTime = null;

    // 상담 예약 목록
    let adviceReservationList;

    setResDate(addOneDay(getResDate()));

    while (getResDate() <= adviceReservationDatePeriodEnd.value) {
        adviceReservationList = await getAdviceReservationListDaily(jobAdminNo,
                                                                    getResDate(),
                                                                    statusName);

        if (!adviceReservationList || adviceReservationList.length === 0) {
            setResDate(addOneDay(getResDate()));
        } else {
            break;
        }
    }

    if (!adviceReservationList || adviceReservationList.length === 0) {
        hideElement("#loadMoreBtn");
        return ;
    }

    setAdviceReservationList(getAdviceReservationList().concat(adviceReservationList));

    const timeSlots = getTimeSlots("09:00", "18:00");
    const dataMap = prepareTimeSlotStatusCounts(getAdviceReservationList(), timeSlots);

    // 차트 그리기
    renderStackedReservationChartPeriod(dataMap, timeSlots);

    str += `<tr><td colspan="6" class="py-2 bg-white bg-red-400"></td></tr>`;

    adviceReservationList.forEach(dto => {
        // 이전 시간과 다르면 빈 줄 추가
        if (previousStartTime !== null && dto.startTime !== previousStartTime) {
            str += `
            <tr><td colspan="6" class="py-1 bg-white bg-gray-400"></td></tr>
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
                <td class="py-1 px-1 text-center border border-gray-300">${dto.resDate}</td>
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
            </tr>`;
        previousStartTime = dto.startTime;
    });

    adviceReservationTbody.innerHTML += str;
}