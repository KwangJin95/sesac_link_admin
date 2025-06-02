import {
    loadToday
} from "./utils/reservationUtil.js";

import {
    onAdviceReservationReservationStatusModifyFormSubmitBtnClick,
    onAdviceReservationReservationStatusModifyModalCloseBtnClick,
    onAdviceReservationSearchSelectChangeDaily,
    onSearchAdviceReservationFormResetBtnClickDaily
} from "./handlers/adviceReservationDailyHandler.js";
import {
    onAdviceReservationAvailableTimeChange,
    onAdviceReservationDownloadExcelBtnClick,
    onAdviceReservationRegisterBtnClick,
    onAdviceReservationRegisterFormSubmitBtnClick,
    onAdviceReservationRegisterModalCloseBtnClick,
    onAdviceReservationTbodyClick,
    onAdviceReservationWindowClick
} from "./handlers/adviceReservationHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (adviceReservationDateDaily != null) {
        // 오늘 날짜 load 이벤트
        loadToday("#adviceReservationDateDaily");
        // 예약 목록 테이블 load
        await onAdviceReservationSearchSelectChangeDaily();
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchAdviceReservationFormResetBtn != null) {
        searchAdviceReservationFormResetBtn.addEventListener("click", onSearchAdviceReservationFormResetBtnClickDaily);
    }
    // 잡코디 select change 이벤트
    if (selectAdmin != null) {
        selectAdmin.addEventListener("change", onAdviceReservationSearchSelectChangeDaily);
    }
    // 날짜 select change 이벤트
    if (adviceReservationDateDaily != null) {
        adviceReservationDateDaily.addEventListener("change", onAdviceReservationSearchSelectChangeDaily);
    }
    // 예약 상태 select change 이벤트
    if (selectReservationStatus != null) {
        selectReservationStatus.addEventListener("change", onAdviceReservationSearchSelectChangeDaily);
    }

    // ------------------------------------------------------------------------------------------------
    // 엑셀 다운로드
    if (downloadExcelBtn != null) {
        downloadExcelBtn.addEventListener("click", () => {
            const resDate = "#adviceReservationDateDaily";
            onAdviceReservationDownloadExcelBtnClick(resDate);
        });
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
            onAdviceReservationRegisterFormSubmitBtnClick(event, onAdviceReservationSearchSelectChangeDaily);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 테이블 클릭 이벤트
    if (adviceReservationTbody != null) {
        adviceReservationTbody.addEventListener("click", onAdviceReservationTbodyClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 상태 변경
    // 예약 상태 변경 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adviceReservationReservationStatusModifyModal";
        const form  = "#adviceReservationReservationStatusModifyForm";
        onAdviceReservationWindowClick(event, modal, form);
    });
    // 예약 상태 변경 모달 닫기 버튼 click 이벤트
    if (adviceReservationReservationStatusModifyModalCloseBtn != null) {
        adviceReservationReservationStatusModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adviceReservationReservationStatusModifyModal";
            const form  = "#adviceReservationReservationStatusModifyForm";
            onAdviceReservationReservationStatusModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 상태 변경 - 변경하기 버튼 클릭
    if (adviceReservationReservationStatusModifyFormSubmitBtn != null) {
        adviceReservationReservationStatusModifyFormSubmitBtn.addEventListener("click", (event) => {
            onAdviceReservationReservationStatusModifyFormSubmitBtnClick(event, onAdviceReservationSearchSelectChangeDaily);
        });
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 잡코디 select
const selectAdmin = document.querySelector("#selectAdmin");
// 날짜 select
const adviceReservationDateDaily = document.querySelector("#adviceReservationDateDaily");
// 예약 상태 select
const selectReservationStatus = document.querySelector("#selectReservationStatus");
// 검색 조건 초기화 버튼
const searchAdviceReservationFormResetBtn = document.querySelector("#searchAdviceReservationFormResetBtn");
// 엑셀 다운로드 버튼
const downloadExcelBtn = document.querySelector("#downloadExcelBtn");

// 예약 목록 테이블
const adviceReservationTbody = document.querySelector("#adviceReservationTbody");

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
// 예약 상태 변경 모달 닫기 버튼
const adviceReservationReservationStatusModifyModalCloseBtn =
    document.querySelector("#adviceReservationReservationStatusModifyModalCloseBtn");
// 예약 상태 변경 - 변경하기 버튼
const adviceReservationReservationStatusModifyFormSubmitBtn =
    document.querySelector("#adviceReservationReservationStatusModifyFormSubmitBtn");