import {
    onWindowClick,
    onLoginModalBtnClick,
    onLoginModalCloseBtnClick,
    onUsernameInput,
    onPasswordInput,
    onLoginSubmitBtnClick,
    onMyPageBtnClick,
    onAlertModalCloseBtnClick
} from "./handlers/defaultLayoutHandler.js";

import {
    showElement
} from "./util/utils.js";

document.addEventListener("DOMContentLoaded", function () {

    // 모달 닫기 이벤트
    window.addEventListener("click", onWindowClick);

    // -----------------------------------------------------------------------------
    // 로그인 모달 버튼 클릭 이벤트
    loginModalBtn.addEventListener("click", onLoginModalBtnClick);
    // 로그인 모달 닫기 버튼 클릭 이벤트
    loginModalCloseBtn.addEventListener("click", onLoginModalCloseBtnClick);

    // 로그인 - username 입력 이벤트
    usernameInput.addEventListener("input", onUsernameInput);
    // 로그인 - password 입력 이벤트
    passwordInput.addEventListener("input", onPasswordInput);
    // 로그인 - 로그인 제출 버튼 클릭 이벤트
    loginSubmitBtn.addEventListener("click", onLoginSubmitBtnClick);

    // -----------------------------------------------------------------------------
    // 마이페이지 버튼 클릭 이벤트
    myPageBtn.addEventListener("click", onMyPageBtnClick);

    // -----------------------------------------------------------------------------
    // 알림 모달 닫기 버튼 클릭 이벤트
    alertModalCloseBtn.addEventListener("click", onAlertModalCloseBtnClick);
    // 알림 모달 확인 버튼 클릭 이벤트
    alertModalConfirmBtn.addEventListener("click", onAlertModalCloseBtnClick);

    // -----------------------------------------------------------------------------
    // 로그인 에러
    let errorParam = urlParams.get("error");
    // 로그인 폼 메시지 보여줌
    if (errorParam != null) {
        showElement("#usernamePasswordMsg");
    }
});

// -----------------------------------------------------------------------------------------------
// 로그인 모달 버튼
const loginModalBtn = document.querySelector("#loginModalBtn");
// 로그인 모달 닫기 버튼
const loginModalCloseBtn = document.querySelector("#loginModalCloseBtn");

// username input
const usernameInput = document.querySelector("#username");
// password input
const passwordInput = document.querySelector("#password");
// 로그인 제출 버튼
const loginSubmitBtn = document.querySelector("#loginSubmitBtn");
// url parameter
const urlParams = new URLSearchParams(window.location.search);
// -----------------------------------------------------------------------------------------------
// 마이페이지 모달
const myPageModal = document.querySelector("#myPageModal");
// 마이페이지 버튼
const myPageBtn = document.querySelector("#myPageBtn");
// -----------------------------------------------------------------------------------------------
// 알림 모달 닫기 버튼
const alertModalConfirmBtn = document.querySelector("#alertModalConfirmBtn");
// 알림 모달 확인 버튼
const alertModalCloseBtn = document.querySelector("#alertModalCloseBtn");