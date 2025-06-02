import {
    loadToday
} from "./utils/reservationUtil.js";

import {
    onAdviceReservationAvailableTimeChange,
    onAdviceReservationDownloadExcelBtnClick,
    onAdviceReservationRegisterBtnClick,
    onAdviceReservationRegisterFormSubmitBtnClick,
    onAdviceReservationRegisterModalCloseBtnClick, onAdviceReservationTbodyClick,
    onAdviceReservationWindowClick
} from "./handlers/adviceReservationHandler.js";

import {
    onAdviceReservationLoadMoreBtnClick,
    onAdviceReservationSearchSelectChangePeriod,
    onSearchAdviceReservationFormResetBtnClickPeriod
} from "./handlers/adviceReservationPeriodHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (adviceReservationDatePeriodStart != null) {
        // 오늘 날짜 load 이벤트
        loadToday("#adviceReservationDatePeriodStart");
        loadToday("#adviceReservationDatePeriodEnd");
        // 예약 목록 테이블 load
        await onAdviceReservationSearchSelectChangePeriod();
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchAdviceReservationFormResetBtn != null) {
        searchAdviceReservationFormResetBtn.addEventListener("click", onSearchAdviceReservationFormResetBtnClickPeriod);
    }
    // 잡코디 select change 이벤트
    if (selectAdmin != null) {
        selectAdmin.addEventListener("change", onAdviceReservationSearchSelectChangePeriod);
    }
    // 날짜 select change 이벤트
    if (adviceReservationDatePeriodStart != null) {
        adviceReservationDatePeriodStart.addEventListener("change", onAdviceReservationSearchSelectChangePeriod);
    }
    if (adviceReservationDatePeriodEnd != null) {
        adviceReservationDatePeriodEnd.addEventListener("change", onAdviceReservationSearchSelectChangePeriod);
    }
    // 예약 상태 select change 이벤트
    if (selectReservationStatus != null) {
        selectReservationStatus.addEventListener("change", onAdviceReservationSearchSelectChangePeriod);
    }
    // 더 보기 버튼 click 이벤트
    if (loadMoreBtn != null) {
        loadMoreBtn.addEventListener("click", onAdviceReservationLoadMoreBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 엑셀 다운로드
    if (downloadExcelBtn != null) {
        downloadExcelBtn.addEventListener("click", () => {
            const startDate = "#adviceReservationDatePeriodStart";
            const endDate   = "#adviceReservationDatePeriodEnd";
            onAdviceReservationDownloadExcelBtnClick(startDate, endDate);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 테이블 클릭 이벤트
    if (adviceReservationTbody != null) {
        adviceReservationTbody.addEventListener("click", onAdviceReservationTbodyClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 등록
    // 예약 등록 버튼 click 이벤트
    if (adviceReservationRegisterBtn != null) {
        adviceReservationRegisterBtn.addEventListener("click", onAdviceReservationRegisterBtnClick);
    }
    // 예약 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adviceReservationRegisterModal";
        const form  = "#adviceReservationRegisterForm";
        onAdviceReservationWindowClick(event, modal, form);
    });
    // 예약 등록 모달 닫기 버튼 click 이벤트
    if (adviceReservationRegisterModalCloseBtn != null) {
        adviceReservationRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adviceReservationRegisterModal";
            const form  = "#adviceReservationRegisterForm";
            onAdviceReservationRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 등록 폼 - 시작 시간 change 이벤트
    if (adviceReservationRegisterFormStartTime != null) {
        adviceReservationRegisterFormStartTime.addEventListener("change", (event) => {
            const startTime = "#adviceReservationRegisterFormStartTime";
            const endTime   = "#adviceReservationRegisterFormEndTime";
            const checkMsg  = "#adviceReservationRegisterFormAvailableTimeCheckMsg";
            onAdviceReservationAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 예약 등록 폼 - 종료 시간 change 이벤트
    if (adviceReservationRegisterFormEndTime != null) {
        adviceReservationRegisterFormEndTime.addEventListener("change", (event) => {
            const startTime = "#adviceReservationRegisterFormStartTime";
            const endTime = "#adviceReservationRegisterFormEndTime";
            const checkMsg = "#adviceReservationRegisterFormAvailableTimeCheckMsg";
            onAdviceReservationAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 예약 등록 폼 - 등록하기 버튼 click 이벤트
    if (adviceReservationRegisterFormSubmitBtn != null) {
        adviceReservationRegisterFormSubmitBtn.addEventListener("click", (event) => {
            onAdviceReservationRegisterFormSubmitBtnClick(event, onAdviceReservationSearchSelectChangePeriod);
        });
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 잡코디 select
const selectAdmin = document.querySelector("#selectAdmin");
// 날짜 select
const adviceReservationDatePeriodStart = document.querySelector("#adviceReservationDatePeriodStart");
const adviceReservationDatePeriodEnd = document.querySelector("#adviceReservationDatePeriodEnd");
// 예약 상태 select
const selectReservationStatus = document.querySelector("#selectReservationStatus");
// 검색 조건 초기화 버튼
const searchAdviceReservationFormResetBtn = document.querySelector("#searchAdviceReservationFormResetBtn");
// 엑셀 다운로드 버튼
const downloadExcelBtn = document.querySelector("#downloadExcelBtn");

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 버튼
const adviceReservationRegisterBtn = document.querySelector("#adviceReservationRegisterBtn");
// 예약 등록 모달 닫기 버튼
const adviceReservationRegisterModalCloseBtn = document.querySelector("#adviceReservationRegisterModalCloseBtn");
// 예약 등록 폼 - 시작 시간
const adviceReservationRegisterFormStartTime = document.querySelector("#adviceReservationRegisterFormStartTime");
// 예약 등록 폼 - 종료 시간
const adviceReservationRegisterFormEndTime = document.querySelector("#adviceReservationRegisterFormEndTime");
// 예약 등록 폼 - 등록하기 버튼
const adviceReservationRegisterFormSubmitBtn = document.querySelector("#adviceReservationRegisterFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 예약 목록 테이블
const adviceReservationTbody = document.querySelector("#adviceReservationTbody");
// 더 보기 버튼
const loadMoreBtn = document.querySelector("#loadMoreBtn");
// 페이징용 날짜
let resDate;

let adviceReservationList;

export function getResDate() {
    return resDate;
}
export function setResDate(date) {
    resDate = date;
}
export function getAdviceReservationList() {
    return adviceReservationList;
}
export function setAdviceReservationList(list) {
    adviceReservationList = list;
}


