import {
    addOneDay, getTimeSlots,
    loadToday, prepareTimeSlotStatusCounts, renderStackedReservationChartPeriod
} from "../utils/reservationUtil.js";

import {
    getSpaceReservationListDaily,
} from "../api/spaceReservationApi.js";

import {
    showElement, hideElement,
} from "../../../global/util/utils.js";

import {
    getResDate,
    getSpaceReservationList,
    setResDate,
    setSpaceReservationList
} from "../space.period.js";

// ------------------------------------------------------------------------------------------------
// 공간 예약 목록 초기화 버튼 click(기간별)
export async function onSearchSpaceReservationFormResetBtnClickPeriod() {
    // 검색 조건 form
    const searchSpaceReservationForm = document.querySelector("#searchSpaceReservationForm");
    const spaceReservationDatePeriodStart = document.querySelector("#spaceReservationDatePeriodStart");
    // form 초기화
    searchSpaceReservationForm.reset();

    // 오늘 날짜 select
    loadToday("#spaceReservationDatePeriodStart");
    loadToday("#spaceReservationDatePeriodEnd");

    // 날짜, 목록 초기화
    setResDate(spaceReservationDatePeriodStart.value);
    setSpaceReservationList([]);

    // 차트 초기화
    const canvas = document.getElementById('reservationStatusChart');
    canvas.classList.add("hidden");
    if (window.reservationChart) {
        window.reservationChart.destroy();
        window.reservationChart = null;
    }

    // 예약 목록 생성
    await onSpaceReservationSearchSelectChangePeriod();
}
// 공간 예약 목록(기간별)
export async function onSpaceReservationSearchSelectChangePeriod() {
    // 공간 예약 목록 tbody
    const spaceReservationTbody = document.querySelector("#spaceReservationTbody");
    // 공간 select
    const spaceSelectedOption = document.querySelector("#selectSpace").selectedOptions[0];
    // 날짜 select
    const spaceReservationDatePeriodStart = document.querySelector("#spaceReservationDatePeriodStart");
    const spaceReservationDatePeriodEnd   = document.querySelector("#spaceReservationDatePeriodEnd");

    // 시작 > 끝 날짜
    if (new Date(spaceReservationDatePeriodStart.value) > new Date(spaceReservationDatePeriodEnd.value)) {
       // 끝 날짜를 시작 날짜로 바꿈
       spaceReservationDatePeriodEnd.value = spaceReservationDatePeriodStart.value;
    }

    // 공간 목록 없음
    if (spaceSelectedOption.value.trim() === "공간 목록 없음") {
        spaceReservationTbody.innerHTML = `<tr><td colSpan="7" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td></tr>`;;

        // 차트 숨김
        hideElement("#reservationStatusChart");
        // 더보기 버튼 숨김
        hideElement("#loadMoreBtn");

        return false;
    }

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // 공간 정보
    const spaceNo = spaceSelectedOption.dataset.spaceNo;
    const startTime = spaceSelectedOption.dataset.spaceAvailableStartTime;
    const endTime = spaceSelectedOption.dataset.spaceAvailableEndTime;

    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 날짜
    setResDate(spaceReservationDatePeriodStart.value);

    // 공간 예약 목록
    let spaceReservationList;

    while (getResDate() <= spaceReservationDatePeriodEnd.value) {
        spaceReservationList = await getSpaceReservationListDaily(spaceNo,
                                                                  getResDate(),
                                                                  statusName);

        if (!spaceReservationList || spaceReservationList.length === 0) {
            setResDate(addOneDay(getResDate()));
        } else {
            break;
        }
    }

    setSpaceReservationList(spaceReservationList);

    // 목록 생성
    let str = "";
    let previousStartTime = null;

    if (!spaceReservationList || spaceReservationList.length === 0) {
        str += `
        <tr class="hover:bg-gray-50">
            <td colSpan="7" class="py-4 px-4 text-center text-gray-500">예약 정보가 없습니다.</td>
        </tr>
        `;
        spaceReservationTbody.innerHTML = str;
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
        setSpaceReservationList(spaceReservationList);
        showElement("#loadMoreBtn");

        const timeSlots = getTimeSlots(startTime, endTime);
        const dataMap = prepareTimeSlotStatusCounts(getSpaceReservationList(), timeSlots);

        // 차트 그리기
        renderStackedReservationChartPeriod(dataMap, timeSlots);

        spaceReservationList.forEach(dto => {
            // 이전 시간과 다르면 빈 줄 추가
            if (previousStartTime !== null && dto.startTime !== previousStartTime) {
                str += `
                    <tr><td colspan="8" class="py-1 bg-white bg-gray-400"></td></tr>
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
            </tr>
        `;
            previousStartTime = dto.startTime;
        });
    }
    spaceReservationTbody.innerHTML = str;
}
// 공간 예약 목록(기간별) 더 보기 버튼 click
export async function onSpaceReservationLoadMoreBtnClick(event) {
    event.preventDefault();

    // 공간 select
    const spaceSelectedOption = document.querySelector("#selectSpace").selectedOptions[0];
    // 날짜 select
    const spaceReservationDatePeriodStart = document.querySelector("#spaceReservationDatePeriodStart");
    const spaceReservationDatePeriodEnd   = document.querySelector("#spaceReservationDatePeriodEnd");

    // 예약 상태 select
    const reservationStatusSelectedOption =
        document.querySelector("#selectReservationStatus").selectedOptions[0];

    // 공간 정보
    const spaceNo = spaceSelectedOption.dataset.spaceNo;
    const startTime = spaceSelectedOption.dataset.spaceAvailableStartTime;
    const endTime = spaceSelectedOption.dataset.spaceAvailableEndTime;
    
    // 예약 상태 이름
    const statusName = reservationStatusSelectedOption.value;

    // 목록 생성
    // 공간 예약 목록 tbody
    const spaceReservationTbody = document.querySelector("#spaceReservationTbody");
    let str = "";
    let previousStartTime = null;

    // 공간 예약 목록
    let spaceReservationList;

    setResDate(addOneDay(getResDate()));

    while (getResDate() <= spaceReservationDatePeriodEnd.value) {
        spaceReservationList = await getSpaceReservationListDaily(spaceNo,
                                                                  getResDate(),
                                                                  statusName);

        if (!spaceReservationList || spaceReservationList.length === 0) {
            setResDate(addOneDay(getResDate()));
        } else {
            break;
        }
    }

    if (!spaceReservationList || spaceReservationList.length === 0) {
        hideElement("#loadMoreBtn");
        return ;
    }

    setSpaceReservationList(getSpaceReservationList().concat(spaceReservationList));

    const timeSlots = getTimeSlots(startTime, endTime);
    const dataMap = prepareTimeSlotStatusCounts(getSpaceReservationList(), timeSlots);

    // 차트 그리기
    renderStackedReservationChartPeriod(dataMap, timeSlots);

    str += `<tr><td colspan="7" class="py-2 bg-white bg-red-400"></td></tr>`;

    spaceReservationList.forEach(dto => {
        // 이전 시간과 다르면 빈 줄 추가
        if (previousStartTime !== null && dto.startTime !== previousStartTime) {
            str += `
            <tr><td colspan="7" class="py-1 bg-white bg-gray-400"></td></tr>
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
            </tr>
        `;
        previousStartTime = dto.startTime;
    });

    spaceReservationTbody.innerHTML += str;
}

