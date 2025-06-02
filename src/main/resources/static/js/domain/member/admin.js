import {
    onModalCloseBtnClick,
    onWindowClick,

    onSearchResetBtnClick,
    loadAdminList,
    onAdminTbodyClick,

    onAdminRegisterBtnClick,
    onAdminRegisterModalCloseBtnClick,
    onIdInput,
    onPwInput,
    onNameInput,
    onPhoneInput,
    onEmailInput,
    onAdminIdDuplicatedCheckBtnClick,
    onAdminEmailDuplicatedCheckBtnClick,
    onAdminRegisterFormSubmitBtnClick,

    onAdminModifyModalCloseBtnClick,
    onAdminModifyFormSubmitBtnClick,

    onAdminDeleteFormSubmitBtnClick
} from "./handlers/AdminHandler.js";

import {
    onPaginationContainerClick
} from "../../global/handlers/globalHandler.js";

document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (adminPaginationContainer != null) {
        // ADMIN 목록 load
        await loadAdminList();
        // 페이징
        adminPaginationContainer.addEventListener("click", (event) => {
            onPaginationContainerClick(event, loadAdminList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 상태 select change 이벤트
    if (adminAuthType != null) {
        adminAuthType.addEventListener("change", () => {
            loadAdminList();
        });
    }
    // 검색 select change 이벤트
    if (adminSearchType != null) {
        adminSearchType.addEventListener("change", () => {
            loadAdminList();
        });
    }
    // 검색 버튼 click 이벤트
    if (adminSearchSubmitBtn !=   null) {
        adminSearchSubmitBtn.addEventListener("click", () => {
            loadAdminList();
        });
    }
    // 검색 form submit 이벤트
    if (adminSearchForm != null) {
        adminSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            loadAdminList();
        });
    }
    // 검색 초기화 버튼 click 이벤트
    if (adminSearchResetBtn != null) {
        adminSearchResetBtn.addEventListener("click", (event) => {
            const form = "#adminSearchForm";
            onSearchResetBtnClick(event, form, loadAdminList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // ADMIN 등록
    // 등록하기 버튼 클릭 이벤트
    if (adminRegisterBtn != null) {
        adminRegisterBtn.addEventListener("click", onAdminRegisterBtnClick);
    }
    // ADMIN 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adminRegisterModal";
        const form = "#adminRegisterForm";
        onWindowClick(event, modal, form);
    });
    // ADMIN 등록 모달 닫기 이벤트
    if (adminRegisterModalCloseBtn != null) {
        adminRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adminRegisterModal";
            const form = "#adminRegisterForm";
            onAdminRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // ADMIN 등록 폼 - 아이디 입력 이벤트
    if (idInput != null) {
        idInput.addEventListener("input", (event) => {
            const inputMsg = "#adminRegisterFormIdInputMsg";
            const checkMsg = "#adminRegisterFormIdCheckMsg";
            onIdInput(event, inputMsg, checkMsg);
        });
    }
    // ADMIN 등록 폼 - 아이디 중복 확인 버튼 클릭 이벤트
    if (adminIdDuplicatedCheckBtn != null) {
        adminIdDuplicatedCheckBtn.addEventListener("click", (event) => {
            const inputMsg = "#adminRegisterFormIdInputMsg";
            const checkMsg = "#adminRegisterFormIdCheckMsg";
            onAdminIdDuplicatedCheckBtnClick(event, inputMsg, checkMsg);
        });
    }
    // ADMIN 등록 폼 - 비밀번호 입력 이벤트
    if (pwInput != null) {
        pwInput.addEventListener("input", (event) => {
            const inputMsg = "#adminRegisterFormPwInputMsg";
            onPwInput(event, inputMsg);
        });
    }
    // ADMIN 등록 폼 - 이름 입력 이벤트
    if (nameInput != null) {
        nameInput.addEventListener("input", (event) => {
            const inputMsg = "#adminRegisterFormNameInputMsg";
            onNameInput(event, inputMsg);
        });
    }
    // ADMIN 등록 폼 - 핸드폰 번호 입력 및 정규식 검증 이벤트
    if (phoneInput != null) {
        phoneInput.addEventListener("input", (event) => {
            const inputMsg = "#adminRegisterFormPhoneInputMsg";
            const checkMsg = "#adminRegisterFormPhoneCheckMsg";
            onPhoneInput(event, inputMsg, checkMsg);
        });
    }
    // ADMIN 등록 폼 - 이메일 입력 및 정규식 검증 이벤트
    if (emailInput != null) {
        emailInput.addEventListener("input", (event) => {
            const inputMsg = "#adminRegisterFormEmailInputMsg";
            const checkMsg = "#adminRegisterFormEmailCheckMsg";
            const duplicatedCheckMsg = "#adminRegisterFormEmailDuplicatedCheckMsg";
            onEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg);
        });
    }
    // ADMIN 등록 폼 - 이메일 중복 확인 버튼 클릭 이벤트
    if (adminEmailDuplicatedCheckBtn != null) {
        adminEmailDuplicatedCheckBtn.addEventListener("click", (event) => {
            const inputMsg = "#adminRegisterFormEmailInputMsg";
            const checkMsg = "#adminRegisterFormEmailCheckMsg";
            const duplicatedCheckMsg = "#adminRegisterFormEmailDuplicatedCheckMsg";
            onAdminEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg);
        });
    }
    // ADMIN 등록 폼 - 등록하기 버튼 클릭 이벤트
    if (adminRegisterFormSubmitBtn != null) {
        adminRegisterFormSubmitBtn.addEventListener("click", onAdminRegisterFormSubmitBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // ADMIN 목록 수정하기, 탈퇴하기 click 이벤트
    if (adminTbody != null) {
        adminTbody.addEventListener("click", onAdminTbodyClick);
    }
    // ------------------------------------------------------------------------------------------------
    // 회원수정 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adminModifyModal";
        const form = "#adminModifyForm";
        onWindowClick(event, modal, form);
    });
    // 회원수정 모달 닫기 이벤트
    if (adminModifyModalCloseBtn != null) {
        adminModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adminModifyModal";
            const form = "#adminModifyForm";
            onAdminModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // 회원수정 폼 - 이름 input 이벤트
    if (adminModifyFormName != null) {
        adminModifyFormName.addEventListener("input", (event) => {
            const inputMsg = "#adminModifyFormNameInputMsg";
            onNameInput(event, inputMsg);
        });
    }
    // 회원수정 폼 - 핸드폰 번호 input 이벤트
    if (adminModifyFormPhone != null) {
        adminModifyFormPhone.addEventListener("input", (event) => {
            const inputMsg = "#adminModifyFormPhoneInputMsg";
            const checkMsg = "#adminModifyFormPhoneCheckMsg";
            onPhoneInput(event, inputMsg, checkMsg);
        });
    }
    // 회원수정 폼 - 수정하기 버튼
    if (adminModifyFormSubmitBtn != null) {
        adminModifyFormSubmitBtn.addEventListener("click", onAdminModifyFormSubmitBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 강제탈퇴 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adminDeleteModal";
        const form = "#adminDeleteForm";
        onWindowClick(event, modal, form);
    });
    // 강제탈퇴 모달 닫기 이벤트
    if (adminDeleteModalCloseBtn != null) {
        adminDeleteModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adminDeleteModal";
            const form = "#adminDeleteForm";
            onModalCloseBtnClick(event, modal, form);
        });
    }
    // ADMIN 강제탈퇴 폼 - 탈퇴 시키기 버튼 click 이벤트
    if (adminDeleteFormSubmitBtn != null) {
        adminDeleteFormSubmitBtn.addEventListener("click", onAdminDeleteFormSubmitBtnClick);
    }

});

// 검색 버튼
const adminSearchSubmitBtn = document.querySelector("#adminSearchSubmitBtn");
// 검색 조건 select
const adminSearchType = document.querySelector("#adminSearchType");
// 검색 form
const adminSearchForm = document.querySelector("#adminSearchForm");
// 권한 select
const adminAuthType = document.querySelector("#adminAuthType");
// 검색 초기화 버튼
const adminSearchResetBtn = document.querySelector("#adminSearchResetBtn");

// 현재 페이지
let adminCurrentPage;
// 페이징
const adminPaginationContainer = document.querySelector("#adminPaginationContainer");
// getter
// 현재 페이지 get
export function getAdminCurrentPage() {
    return adminCurrentPage;
}
// setter
// 현재 페이지 set
export function setAdminCurrentPage(page) {
    adminCurrentPage = page;
}

// ------------------------------------------------------------------------------------------------
// 운영진 목록
const adminTbody = document.querySelector("#adminTbody");

// ------------------------------------------------------------------------------------------------
// 등록하기 버튼
const adminRegisterBtn = document.querySelector("#adminRegisterBtn");
// ADMIN 등록 모달 닫기 버튼
const adminRegisterModalCloseBtn = document.querySelector("#adminRegisterModalCloseBtn");
// ADMIN 등록 폼 - id input
const idInput = document.querySelector("#adminRegisterFormId");
// ADMIN 등록 폼 - 아이디 중복 확인 버튼
const adminIdDuplicatedCheckBtn = document.querySelector("#adminIdDuplicatedCheckBtn");
// 비밀번호 input
const pwInput = document.querySelector("#adminRegisterFormPw");
// 이름 input
const nameInput = document.querySelector("#adminRegisterFormName");
// 핸드폰 번호 input
const phoneInput = document.querySelector("#adminRegisterFormPhone");
// 이메일 input
const emailInput = document.querySelector("#adminRegisterFormEmail");
// 이메일 중복 확인 버튼
const adminEmailDuplicatedCheckBtn = document.querySelector("#adminEmailDuplicatedCheckBtn");
// 이메일 중복 확인 여부
let emailDuplicatedChecked = false;
// 등록하기 버튼
const adminRegisterFormSubmitBtn = document.querySelector("#adminRegisterFormSubmitBtn");
// 아이디 중복 확인 여부
let idChecked = false;
// getter
// idChecked 반환
export function isIdChecked() {
    return idChecked;
}
// emailDuplicatedChecked 반환
export function isEmailDuplicatedChecked() {
    return emailDuplicatedChecked;
}
// setter
// idChecked 설정
export function setIdChecked(value) {
    idChecked = value;
}
// emailDuplicatedChecked 설정
export function setEmailDuplicatedChecked(value) {
    emailDuplicatedChecked = value;
}

// ------------------------------------------------------------------------------------------------
// 회원수정 모달 닫기 버튼
const adminModifyModalCloseBtn = document.querySelector("#adminModifyModalCloseBtn");
// 수정하기 폼 - 이름 input
const adminModifyFormName = document.querySelector("#adminModifyFormName");
// 수정하기 폼 - 핸드폰 번호 input
const adminModifyFormPhone = document.querySelector("#adminModifyFormPhone");
// 회원수정 폼 - 수정하기 버튼
const adminModifyFormSubmitBtn = document.querySelector("#adminModifyFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// ADMIN 강제탈퇴 모달 닫기 버튼
const adminDeleteModalCloseBtn = document.querySelector("#adminDeleteModalCloseBtn");
// ADMIN 강제탈퇴 시키기 버튼
const adminDeleteFormSubmitBtn = document.querySelector("#adminDeleteFormSubmitBtn");