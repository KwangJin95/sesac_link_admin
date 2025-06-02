import {
    onIdInput, onIdCheckBtnClick,
    onEmailInput, onEmailCodeSendBtnClick, onEmailCodeInput,
    onPwInput, onConfirmPwInput,
    onFindPwSubmitBtnClick
} from "./handlers/findPwHandler.js";

document.addEventListener("DOMContentLoaded", function () {

    // 아이디 입력 이벤트
    idInput.addEventListener("input", onIdInput);

    // 아이디 확인 버튼 이벤트
    idCheckBtn.addEventListener("click", onIdCheckBtnClick);

    // 이메일 입력 및 검증 이벤트
    emailInput.addEventListener("input", onEmailInput);

    // 이메일 인증 코드 발송 버튼 클릭 이벤트
    emailCodeSendBtn.addEventListener("click", (event) => {
        const time = 180; // 3분 = 180초
        onEmailCodeSendBtnClick(event, time);
    });

    // 이메일 인증 코드 입력 및 검증 이벤트
    emailCodeInput.addEventListener("input", onEmailCodeInput);

    // 비밀번호 입력값 확인 및 정규식 검증 이벤트
    pwInput.addEventListener('input', onPwInput);

    // 비밀번호 확인 입력값 확인 및 검증 이벤트
    confirmPwInput.addEventListener('input', onConfirmPwInput);

    // 비밀번호 재설정 버튼 클릭 이벤트
    findPwSubmitBtn.addEventListener("click", onFindPwSubmitBtnClick);
});

// -------------------------------------------------------------------
// 비밀번호 재설정 버튼
const findPwSubmitBtn = document.querySelector("#findPwSubmitBtn");
// -------------------------------------------------------------------
// 아이디 input
const idInput = document.querySelector("#id");
// 아이디 확인 버튼
const idCheckBtn = document.querySelector("#idCheckBtn");
// 아이디 확인 여부
let idChecked = false;
// -------------------------------------------------------------------
// 이메일 input
const emailInput = document.querySelector("#email");
// 이메일 검증 확인 여부
let emailChecked = false;
// -------------------------------------------------------------------
// 이메일 인증 코드 발송 버튼
const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");
// 이메일 인증 코드 input
const emailCodeInput = document.querySelector("#email-code");
// 이메일 인증 코드
let emailCode;
// 이메일 인증 여부
let emailCodeChecked = false;
// setInterval 저장할 변수
let countdown;
// -------------------------------------------------------------------
// 비밀번호 input
const pwInput = document.querySelector("#pw");
// 비밀번호 검증 여부
let pwChecked = false;
// 비밀번호 확인 input
const confirmPwInput = document.querySelector("#confirm-password");
// 비밀번호 확인 검증 여부
let confirmPwChecked = false;
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
// emailChecked 반환
export function isEmailChecked() {
    return emailChecked;
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

// emailChecked 설정
export function setEmailChecked(value) {
    emailChecked = value;
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