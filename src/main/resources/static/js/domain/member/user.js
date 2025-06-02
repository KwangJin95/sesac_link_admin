import {
    onUserModifyModalCloseBtnClick,
    onSearchResetBtnClick,
    onWindowClick,

    onNameInput,
    onPhoneInput,
    onAddressInput,
    onDetailAddressInput,
    onUserModifyFormSubmitBtnClick,

    setCampusList,
    onCampusSelectChange,
    onCourseModifyFormCourseRegisterBtnClick,
    onCourseModifyFormSubmitBtnClick,
    onModalCloseBtnClick,
    loadUserList,
    onUserTbodyClick,
    onUserDeleteFormSubmitBtnClick
} from "./handlers/AdminHandler.js";

import {
    openDaumPostcode
} from "./handlers/memberHandler.js";

import {
    onPaginationContainerClick
} from "../../global/handlers/globalHandler.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (userPaginationContainer != null) {
        // USER 목록 load
        await loadUserList();
        // 페이징
        userPaginationContainer.addEventListener("click", (event) => {
            onPaginationContainerClick(event, loadUserList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 상태 select change 이벤트
    if (courseSelect != null) {
        courseSelect.addEventListener("change", () => {
            loadUserList();
        });
    }
    // 검색 select change 이벤트
    if (userSearchType != null) {
        userSearchType.addEventListener("change", () => {
            loadUserList();
        });
    }
    // 검색 버튼 click 이벤트
    if (userSearchSubmitBtn !=   null) {
        userSearchSubmitBtn.addEventListener("click", () => {
            loadUserList();
        });
    }
    // 검색 form submit 이벤트
    if (userSearchForm != null) {
        userSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            loadUserList();
        });
    }
    // 검색 초기화 버튼 click 이벤트
    if (userSearchResetBtn != null) {
        userSearchResetBtn.addEventListener("click", (event) => {
            const form = "#userSearchForm";
            onSearchResetBtnClick(event, form, loadUserList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // USER 목록 - 버튼 click 이벤트
    if (userTbody != null) {
        userTbody.addEventListener("click", onUserTbodyClick);
    }

    // USER 회원수정 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#userModifyModal";
        const form  = "#userModifyForm";
        onWindowClick(event, modal, form);
    });
    // USER 회원수정 모달 닫기 이벤트
    if (userModifyModalCloseBtn != null) {
        userModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#userModifyModal";
            const form  = "#userModifyForm";
            onUserModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // USER 회원수정 폼 - 주소 찾기 버튼 click 이벤트
    if (userModifyFormFindAddressBtn != null) {
        userModifyFormFindAddressBtn.addEventListener("click", (event) => {
            const addressInput = "#userModifyFormAddress";
            const detailAddressInput = "#userModifyFormDetailAddress";
            openDaumPostcode(event, addressInput, detailAddressInput);
        });
    }
    // USER 회원수정 폼 - 이름 input 이벤트
    if (userModifyFormNameInput != null) {
        userModifyFormNameInput.addEventListener("input", (event) => {
            const inputMsg = "#userModifyFormNameInputMsg";
            onNameInput(event, inputMsg);
        });
    }
    // USER 회원수정 폼 - 주소 input 이벤트
    if (userModifyFormAddressInput != null) {
        userModifyFormAddressInput.addEventListener("input", (event) => {
            const inputMsg = "#userModifyFormAddressInputMsg";
            onAddressInput(event, inputMsg);
        });
    }
    // USER 회원수정 폼 - 상세 주소 input 이벤트
    if (userModifyFormDetailAddressInput != null) {
        userModifyFormDetailAddressInput.addEventListener("input", (event) => {
            const inputMsg = "#userModifyFormDetailAddressInputMsg";
            onDetailAddressInput(event, inputMsg);
        });
    }
    // USER 회원수정 폼 - 핸드폰 번호 input 및 정규식 검증 이벤트
    if (userModifyFormPhoneInput != null) {
        userModifyFormPhoneInput.addEventListener("input", (event) => {
            const inputMsg = "#userModifyFormPhoneInputMsg";
            const checkMsg = "#userModifyFormPhoneCheckMsg";
            onPhoneInput(event, inputMsg, checkMsg);
        });
    }
    // USER 회원수정 폼 - 수정하기 click 버튼
    if (userModifyFormSubmitBtn != null) {
        userModifyFormSubmitBtn.addEventListener("click", onUserModifyFormSubmitBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 강좌수정
    // 강좌수정 모달 캠퍼스 목록 set
    if (courseModifyFormCampusSelect != null) {
        await setCampusList("#courseModifyFormCampusSelect");
    }
    // 강좌수정 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#courseModifyModal";
        const form  = "#courseModifyForm";
        onWindowClick(event, modal, form);
    });
    // 강좌수정 모달 닫기 이벤트
    if (courseModifyModalCloseBtn != null) {
        courseModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#courseModifyModal";
            const form  = "#courseModifyForm";
            onModalCloseBtnClick(event, modal, form);
        });
    }
    // 강좌수정 폼 - 캠퍼스 select change 이벤트
    if (courseModifyFormCampusSelect != null) {
        courseModifyFormCampusSelect.addEventListener("change", () => {
            const target = "#courseModifyFormCampusSelect";
            const element = "#courseModifyFormCourseSelect";
            onCampusSelectChange(target, element);
        });
    }
    // 강좌수정 폼 - 강좌 등록 버튼 click 이벤트
    if (courseModifyFormCourseRegisterBtn != null) {
        courseModifyFormCourseRegisterBtn.addEventListener("click", onCourseModifyFormCourseRegisterBtnClick);
    }
    // 강좌수정 폼 - 수정하기 click 버튼
    if (courseModifyFormSubmitBtn != null) {
        courseModifyFormSubmitBtn.addEventListener("click", onCourseModifyFormSubmitBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // USER 강제탈퇴 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#userDeleteModal";
        const form = "#userDeleteForm";
        onWindowClick(event, modal, form);
    });
    // USER 강제탈퇴 모달 닫기 이벤트
    if (userDeleteModalCloseBtn != null) {
        userDeleteModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#userDeleteModal";
            const form  = "#userDeleteForm";
            onModalCloseBtnClick(event, modal, form);
        });
    }
    // USER 강제탈퇴 폼 - 탈퇴 시키기 버튼 click 이벤트
    if (userDeleteFormSubmitBtn != null) {
        userDeleteFormSubmitBtn.addEventListener("click", onUserDeleteFormSubmitBtnClick);
    }
});

// ------------------------------------------------------------------------------------------------
// 검색 form
const userSearchForm = document.querySelector("#userSearchForm");
// 검색 조건 select
const userSearchType = document.querySelector("#userSearchType");
// 강좌 select
const courseSelect = document.querySelector("#courseSelect");
// 검색 버튼
const userSearchSubmitBtn = document.querySelector("#userSearchSubmitBtn");
// 검색 초기화 버튼
const userSearchResetBtn = document.querySelector("#userSearchResetBtn");

// ------------------------------------------------------------------------------------------------
// 페이징
const userPaginationContainer = document.querySelector("#userPaginationContainer");
// 현재 페이지
let userCurrentPage;
// ------------------------------------------------------------------------------------------------
// getter
// 현재 페이지 get
export function getUserCurrentPage() {
    return userCurrentPage;
}
// setter
// 현재 페이지 set
export function setUserCurrentPage(page) {
    userCurrentPage = page;
}

// ------------------------------------------------------------------------------------------------
// 학생 목록
const userTbody = document.querySelector("#userTbody");
// 수정하기 모달 닫기 버튼
const userModifyModalCloseBtn = document.querySelector("#userModifyModalCloseBtn");
// 수정하기 폼 - 수정하기 버튼
const userModifyFormSubmitBtn = document.querySelector("#userModifyFormSubmitBtn");
// 이름 input
const userModifyFormNameInput = document.querySelector("#userModifyFormName");
// 주소 input
const userModifyFormAddressInput = document.querySelector("#userModifyFormAddress");
// 상세 주소 input
const userModifyFormDetailAddressInput = document.querySelector("#userModifyFormDetailAddress");
// 핸드폰 번호 input
const userModifyFormPhoneInput = document.querySelector("#userModifyFormPhone");
// 회원 수정 - 주소 찾기 버튼
const userModifyFormFindAddressBtn = document.querySelector("#userModifyFormFindAddressBtn");

// ------------------------------------------------------------------------------------------------
// 강좌 수정 모달 닫기 버튼
const courseModifyModalCloseBtn = document.querySelector("#courseModifyModalCloseBtn");
// 강좌 수정 모달 - 캠퍼스 select
const courseModifyFormCampusSelect = document.querySelector("#courseModifyFormCampusSelect");
// 강좌 수정 모달 - 강좌 등록 버튼
const courseModifyFormCourseRegisterBtn = document.querySelector("#courseModifyFormCourseRegisterBtn");
// 강좌 수정 모달 - 수정하기 버튼
const courseModifyFormSubmitBtn = document.querySelector("#courseModifyFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 학생 강제 탈퇴 모달 닫기 버튼
const userDeleteModalCloseBtn = document.querySelector("#userDeleteModalCloseBtn");
// 강제탈퇴 탈퇴 시키기 버튼
const userDeleteFormSubmitBtn = document.querySelector("#userDeleteFormSubmitBtn");