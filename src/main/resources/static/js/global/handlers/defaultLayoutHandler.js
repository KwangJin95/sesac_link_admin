import {
    showElement, hideElement
} from '../util/utils.js';

// 모달 닫기 이벤트 핸들러
export function onWindowClick(event) {
    const myPageModal = document.querySelector("#myPageModal");

    // 마이페이지 모달 닫기
    if (myPageModal && !myPageModal.contains(event.target) && !event.target.closest("#myPageButton")) {
        hideElement("#myPageModal");
    }
    // 알림 모달 닫기
    if (event.target === document.querySelector("#alertModal")) {
        hideElement("#alertModal");
    }
    // 로그인 모달 닫기
    if (event.target === document.querySelector("#loginModal")) {
        // 로그인 모달 숨김
        hideElement("#loginModal");

        // 로그인 폼 초기화
        document.querySelector("#loginForm").reset();

        // 경고 메시지 숨김
        hideElement("#usernameMsg");
        hideElement("#passwordMsg");
        hideElement("#usernamePasswordMsg");
    }
}
// -----------------------------------------------------------------------------
// 로그인 모달 버튼 클릭 이벤트 핸들러
export function onLoginModalBtnClick() {
    showElement("#loginModal");
}
// 로그인 모달 닫기 버튼 클릭 이벤트 핸들러
export function onLoginModalCloseBtnClick() {
    // 로그인 모달 숨김
    hideElement("#loginModal");

    // 로그인 폼 초기화
    document.querySelector("#loginForm").reset();

    // 경고 메시지 숨김
    hideElement("#usernameMsg");
    hideElement("#passwordMsg");
    hideElement("#usernamePasswordMsg");
}
// 로그인 - username 입력 이벤트 핸들러
export function onUsernameInput(event) {
    // username input
    const usernameInput = event.target;

    // username 입력값 없음
    if (usernameInput.value.trim() == "") {
        showElement("#usernameMsg");
    } else {
        hideElement("#usernameMsg");
        hideElement("#usernamePasswordMsg");
    }
}
// 로그인 - password 입력 이벤트 핸들러
export function onPasswordInput(event) {
    // password input
    const passwordInput = event.target;

    // password 입력 값 없음
    if (passwordInput.value.trim() == "") {
        showElement("#passwordMsg");
    }
    else {
        hideElement("#passwordMsg");
        hideElement("#usernamePasswordMsg");
    }
}
// 로그인 - 로그인 제출 버튼 클릭 이벤트
export function onLoginSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");

    // username 입력값 없음
    if (usernameInput.value.trim() == "") {
        showElement("#usernameMsg");
        return ;
    }
    // password 입력값 없음
    if (passwordInput.value.trim() == "") {
        showElement("#passwordMsg");
        return ;
    }

    document.querySelector("#loginForm").submit();
}
// -----------------------------------------------------------------------------
// 마이페이지 버튼 클릭 이벤트 핸들러
export function onMyPageBtnClick(event) {
    event.stopPropagation();

    // 마이페이지 모달
    const myPageModal = document.querySelector("#myPageModal");

    // toggle
    if (myPageModal.classList.contains("hidden"))
        showElement("#myPageModal");
    else
        hideElement("#myPageModal");
}
// -----------------------------------------------------------------------------
// 알림 모달 닫기(확인) 버튼 클릭 이벤트 핸들러
export function onAlertModalCloseBtnClick() {
    hideElement("#alertModal");
}