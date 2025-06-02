import {
    loadToday
} from "./utils/reservationUtil.js";

import {
    onSpaceReservationWindowClick,

    onSpaceReservationDownloadExcelBtnClick,

    onSpaceReservationRegisterBtnClick,
    onSpaceReservationRegisterModalCloseBtnClick,
    onSpaceReservationRegisterFormSpaceChange,
    onSpaceReservationAvailableTimeChange,
    onSpaceReservationPeopleCountInput,
    onSpaceReservationPurposeInput,
    onSpaceReservationRegisterFormSubmitBtnClick,

} from "./handlers/spaceReservationHandler.js";

import {
    onSearchSpaceReservationFormResetBtnClickDaily,
    onSpaceReservationReservationStatusModifyFormSubmitBtnClick,
    onSpaceReservationReservationStatusModifyModalCloseBtnClick,
    onSpaceReservationSearchSelectChangeDaily,
    onSpaceReservationTbodyClick
} from "./handlers/spaceReservationDailyHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (spaceReservationDateDaily != null) {
        // 오늘 날짜 load 이벤트
        loadToday("#spaceReservationDateDaily");
        // 예약 목록 테이블 load
        await onSpaceReservationSearchSelectChangeDaily();
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 검색 조건 초기화 버튼 click 이벤트
    if (searchSpaceReservationFormResetBtn != null) {
        searchSpaceReservationFormResetBtn.addEventListener("click", onSearchSpaceReservationFormResetBtnClickDaily);
    }
    // 공간 select change 이벤트
    if (selectSpace != null) {
        selectSpace.addEventListener("change", onSpaceReservationSearchSelectChangeDaily);
    }
    // 날짜 select change 이벤트
    if (spaceReservationDateDaily != null) {
        spaceReservationDateDaily.addEventListener("change", onSpaceReservationSearchSelectChangeDaily);
    }
    // 예약 상태 select change 이벤트
    if (selectReservationStatus != null) {
        selectReservationStatus.addEventListener("change", onSpaceReservationSearchSelectChangeDaily);
    }

    // ------------------------------------------------------------------------------------------------
    // 엑셀 다운로드
    if (downloadExcelBtn != null) {
        downloadExcelBtn.addEventListener("click", () => {
            const resDate = "#spaceReservationDateDaily";
            onSpaceReservationDownloadExcelBtnClick(resDate);
        });
    }
    // ------------------------------------------------------------------------------------------------
    // 예약 등록
    // 예약 등록 버튼 click 이벤트
    if (spaceReservationRegisterBtn != null) {
        spaceReservationRegisterBtn.addEventListener("click", onSpaceReservationRegisterBtnClick);
    }
    // 예약 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceReservationRegisterModal";
        const form  = "#spaceReservationRegisterForm";
        onSpaceReservationWindowClick(event, modal, form);
    });
    // 예약 등록 모달 닫기 버튼 click 이벤트
    if (spaceReservationRegisterModalCloseBtn != null) {
        spaceReservationRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceReservationRegisterModal";
            const form  = "#spaceReservationRegisterForm";
            onSpaceReservationRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 등록 폼 - 공간 change 이벤트
    if (spaceReservationRegisterFormSpace != null) {
        spaceReservationRegisterFormSpace.addEventListener("change", onSpaceReservationRegisterFormSpaceChange);
    }
    // 예약 등록 폼 - 시작 시간 change 이벤트
    if (spaceReservationRegisterFormStartTime != null) {
        spaceReservationRegisterFormStartTime.addEventListener("change", (event) => {
            const startTime = "#spaceReservationRegisterFormStartTime";
            const endTime   = "#spaceReservationRegisterFormEndTime";
            const checkMsg  = "#spaceReservationRegisterFormAvailableTimeCheckMsg";
            onSpaceReservationAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 예약 등록 폼 - 종료 시간 change 이벤트
    if (spaceReservationRegisterFormEndTime != null) {
        spaceReservationRegisterFormEndTime.addEventListener("change", (event) => {
            const startTime = "#spaceReservationRegisterFormStartTime";
            const endTime = "#spaceReservationRegisterFormEndTime";
            const checkMsg = "#spaceReservationRegisterFormAvailableTimeCheckMsg";
            onSpaceReservationAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 예약 등록 폼 - 인원수 input 이벤트
    if (spaceReservationRegisterFormPeopleCount != null) {
        spaceReservationRegisterFormPeopleCount.addEventListener("input", (event) => {
            const inputMsg = "#spaceReservationRegisterFormPeopleCountInputMsg";
            const checkMsg = "#spaceReservationRegisterFormPeopleCountCheckMsg";
            onSpaceReservationPeopleCountInput(event, inputMsg, checkMsg);
        });
    }
    // 예약 등록 폼 - 사용 목적 input 이벤트
    if (spaceReservationRegisterFormPurpose != null) {
        spaceReservationRegisterFormPurpose.addEventListener("input", (event) => {
            const inputMsg = "#spaceReservationRegisterFormPurposeInputMsg";
            onSpaceReservationPurposeInput(event, inputMsg);
        });
    }
    // 예약 등록 폼 - 등록하기 버튼 click 이벤트
    if (spaceReservationRegisterFormSubmitBtn != null) {
        spaceReservationRegisterFormSubmitBtn.addEventListener("click", (event) => {
            onSpaceReservationRegisterFormSubmitBtnClick(event, onSpaceReservationSearchSelectChangeDaily);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 예약 상태 변경
    // 예약 상태 변경 버튼 클릭 이벤트
    if (spaceReservationTbody != null) {
        spaceReservationTbody.addEventListener("click", onSpaceReservationTbodyClick);
    }
    // 예약 상태 변경 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceReservationReservationStatusModifyModal";
        const form  = "#spaceReservationReservationStatusModifyForm";
        onSpaceReservationWindowClick(event, modal, form);
    });
    // 예약 상태 변경 모달 닫기 버튼 click 이벤트
    if (spaceReservationReservationStatusModifyModalCloseBtn != null) {
        spaceReservationReservationStatusModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceReservationReservationStatusModifyModal";
            const form  = "#spaceReservationReservationStatusModifyForm";
            onSpaceReservationReservationStatusModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // 예약 상태 변경 - 변경하기 버튼 클릭
    if (spaceReservationReservationStatusModifyFormSubmitBtn != null) {
        spaceReservationReservationStatusModifyFormSubmitBtn.addEventListener("click", (event) => {
            onSpaceReservationReservationStatusModifyFormSubmitBtnClick(event, onSpaceReservationSearchSelectChangeDaily);
        });
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 옵션
// 공간 select
const selectSpace = document.querySelector("#selectSpace");
// 날짜 select
const spaceReservationDateDaily = document.querySelector("#spaceReservationDateDaily");
// 예약 상태 select
const selectReservationStatus = document.querySelector("#selectReservationStatus");
// 검색 조건 초기화 버튼
const searchSpaceReservationFormResetBtn = document.querySelector("#searchSpaceReservationFormResetBtn");
// 엑셀 다운로드 버튼
const downloadExcelBtn = document.querySelector("#downloadExcelBtn");

// ------------------------------------------------------------------------------------------------
// 예약 등록
// 예약 등록 버튼
const spaceReservationRegisterBtn = document.querySelector("#spaceReservationRegisterBtn");
// 예약 등록 모달 닫기 버튼
const spaceReservationRegisterModalCloseBtn = document.querySelector("#spaceReservationRegisterModalCloseBtn");
// 예약 등록 폼 - 공간 select
const spaceReservationRegisterFormSpace = document.querySelector("#spaceReservationRegisterFormSpace");
// 예약 등록 폼 - 시작 시간
const spaceReservationRegisterFormStartTime = document.querySelector("#spaceReservationRegisterFormStartTime");
// 예약 등록 폼 - 종료 시간
const spaceReservationRegisterFormEndTime = document.querySelector("#spaceReservationRegisterFormEndTime");
// 예약 등록 폼 - 인원수
const spaceReservationRegisterFormPeopleCount = document.querySelector("#spaceReservationRegisterFormPeopleCount");
// 예약 등록 폼 - 사용 목적
const spaceReservationRegisterFormPurpose = document.querySelector("#spaceReservationRegisterFormPurpose");
// 예약 등록 폼 - 등록하기 버튼
const spaceReservationRegisterFormSubmitBtn = document.querySelector("#spaceReservationRegisterFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 예약 목록 테이블
const spaceReservationTbody = document.querySelector("#spaceReservationTbody");
// 예약 상태 변경 모달 닫기 버튼
const spaceReservationReservationStatusModifyModalCloseBtn =
    document.querySelector("#spaceReservationReservationStatusModifyModalCloseBtn");
// 예약 상태 변경 - 변경하기 버튼
const spaceReservationReservationStatusModifyFormSubmitBtn =
    document.querySelector("#spaceReservationReservationStatusModifyFormSubmitBtn");