import {
    onIdInput, onIdDuplicatedCheckBtnClick,
    onPwInput, onConfirmPwInput,
    onNameInput,
    onPhoneInput,
    onEmailInput, onEmailDuplicatedCheckBtnClick, onEmailCodeSendBtnClick, onEmailCodeInput,
    onSignupSubmitBtnClick,
    setSignup
} from "./handlers/signupHandler.js";

document.addEventListener("DOMContentLoaded", function () {

    // 아이디 입력 이벤트
    idInput.addEventListener("input", (event) => {
        const inputMsg = "#idInputMsg";
        const checkMsg = "#idCheckMsg";
        onIdInput(event, inputMsg, checkMsg);
    });

    // 아이디 중복 확인 버튼 클릭 이벤트
    idDuplicatedCheckBtn.addEventListener("click", (event) => {
        const inputMsg = "#idInputMsg";
        const checkMsg = "#idCheckMsg";
        onIdDuplicatedCheckBtnClick(event, inputMsg, checkMsg);
    });

    // 비밀번호 입력 및 정규식 검증 이벤트
    pwInput.addEventListener("input", (event) => {
        const inputMsg = "#pwInputMsg";
        const checkMsg = "#pwCheckMsg";
        const confirmPwCheckMsg = "#confirmPwCheckMsg";
        onPwInput(event, inputMsg, checkMsg, confirmPwCheckMsg);
    });

    // 비밀번호 확인 입력 및 검증 이벤트
    confirmPwInput.addEventListener("input", (event) => {
        const inputMsg = "#confirmPwInputMsg";
        const checkMsg = "#confirmPwCheckMsg";
        onConfirmPwInput(event, inputMsg, checkMsg);
    });

    // 이름 입력 이벤트
    nameInput.addEventListener("input", (event) => {
        const inputMsg = "#nameInputMsg";
        onNameInput(event, inputMsg);
    });


    // 핸드폰 번호 입력 및 정규식 검증 이벤트
    phoneInput.addEventListener("input", (event) => {
        const inputMsg = "#phoneInputMsg";
        const checkMsg = "#phoneCheckMsg";
        onPhoneInput(event, inputMsg, checkMsg);
    });

    // 이메일 입력 및 정규식 검증 이벤트
    emailInput.addEventListener("input", (event) => {
        const inputMsg = "#emailInputMsg";
        const checkMsg = "#emailCheckMsg";
        const duplicatedCheckMsg = "#emailDuplicatedCheckMsg";
        onEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg);
    });

    // 이메일 중복 확인 버튼 클릭 이벤트
    emailDuplicatedCheckBtn.addEventListener("click", (event) => {
        const inputMsg = "#emailInputMsg";
        const checkMsg = "#emailCheckMsg";
        const duplicatedCheckMsg = "#emailDuplicatedCheckMsg";
        onEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg);
    });

    // 이메일 인증 코드 발송 버튼 클릭 이벤트
    emailCodeSendBtn.addEventListener("click", (event) => {
        const time = 180; // 3분 = 180초
        onEmailCodeSendBtnClick(event, time);
    });
    // 이메일 인증 코드 입력 및 검증 이벤트
    emailCodeInput.addEventListener("input", (event) => {
        const checkMsg = "#emailCodeCheckMsg";
        onEmailCodeInput(event, checkMsg);
    });

    // 가입하기 버튼 클릭 이벤트
    signupSubmitBtn.addEventListener("click", onSignupSubmitBtnClick);
});
// ------------------------------------------------------------------------------------------
// 아이디 input
const idInput = document.querySelector("#id");
// 아이디 중복 확인 버튼
const idDuplicatedCheckBtn = document.querySelector("#idDuplicatedCheckBtn");
// 아이디 중복 확인 여부
let idChecked = false;
// ------------------------------------------------------------------------------------------
// 비밀번호 input
const pwInput = document.querySelector("#pw");
// 비밀번호 검증 여부
let pwChecked = false;
// 비밀번호 확인 input
const confirmPwInput = document.querySelector("#confirm-password");
// 비밀번호 확인 검증 여부
let confirmPwChecked = false;
// ------------------------------------------------------------------------------------------
// 이름 input
const nameInput = document.querySelector("#name");
// ------------------------------------------------------------------------------------------
// 핸드폰 번호 input
const phoneInput = document.querySelector("#phone");
// 핸드폰 번호 검증 여부
let phoneChecked = false;
// ------------------------------------------------------------------------------------------
// 이메일 input
const emailInput = document.querySelector("#email");
// 이메일 검증 확인 여부
let emailChecked = false;
// 이메일 중복 확인 버튼
const emailDuplicatedCheckBtn = document.querySelector("#emailDuplicatedCheckBtn");
// 이메일 중복 확인 여부
let emailDuplicatedChecked = false;
// ------------------------------------------------------------------------------------------
// 이메일 인증 코드 input
const emailCodeInput = document.querySelector("#email-code");
// 이메일 인증 코드 발송 버튼
const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");
// 이메일 인증 코드
let emailCode;
// 이메일 인증 여부
let emailCodeChecked = false;
// setInterval 저장할 변수
let countdown;
// ------------------------------------------------------------------------------------------
// 가입하기 버튼
const signupSubmitBtn = document.querySelector("#signupSubmitBtn");
// ------------------------------------------------------------------------------------------
// getter
// idChecked 반환
export function isIdChecked() {
    return idChecked;
}
// pwChecked 반환
export function isPwChecked() {
    return pwChecked;
}
// confirmPwChecked 반환
export function isConfirmPwChecked() {
    return confirmPwChecked;
}
// phoneChecked 반환
export function isPhoneChecked() {
    return phoneChecked;
}
// emailChecked 반환
export function isEmailChecked() {
    return emailChecked;
}
// emailDuplicatedChecked 반환
export function isEmailDuplicatedChecked() {
    return emailDuplicatedChecked;
}
// emailCodeChecked 반환
export function isEmailCodeChecked() {
    return emailCodeChecked;
}
// 이메일 인증 코드 반환
export function getEmailCode() {
    return emailCode;
}
// countdown 반환
export function getCountdown() {
    return countdown;
}
// ------------------------------------------------------------------------------------------
// setter
// idChecked 설정
export function setIdChecked(value) {
    idChecked = value;
}
// pwChecked 설정
export function setPwChecked(value) {
    pwChecked = value;
}
// confirmPwChecked 설정
export function setConfirmPwChecked(value) {
    confirmPwChecked = value;
}
// phoneChecked 설정
export function setPhoneChecked(value) {
    phoneChecked = value;
}

// emailChecked 설정
export function setEmailChecked(value) {
    emailChecked = value;
}
// emailDuplicatedChecked 설정
export function setEmailDuplicatedChecked(value) {
    emailDuplicatedChecked = value;
}
// emailCodeChecked 설정
export function setEmailCodeChecked(value) {
    emailCodeChecked = value;
}
// 이메일 인증 코드 설정
export function setEmailCode(value) {
    emailCode = value;
}
// countdown 설정
export function setCountdown(interval) {
    countdown = interval;
}