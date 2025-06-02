import {
    onWindowClick,
    onMemberModifyBtnClick,
    onMemberModifyModalCloseBtnClick,
    onFileCancelBtnClick,
    onNameInput,
    onPhoneInput,
    onMemberModifySubmitBtnClick,

    onEmailModifyBtnClick,
    onEmailModifyModalCloseBtnClick,
    onEmailInput,
    onEmailDuplicatedCheckBtnClick,
    onEmailCodeSendBtnClick,
    onEmailCodeInput,
    onEmailModifySubmitBtnClick,

    onPwModifyBtnClick,
    onPwModifyModalCloseBtnClick,
    onOriginPwInput,
    onOriginPwCheckBtnClick,
    onPwInput,
    onConfirmPwInput,
    onPwModifySubmitBtnClick,

    onWithdrawBtnClick,
    onWithdrawModalCloseBtnClick,
    onPwForWithdrawInput,
    onPwForWithdrawCheckBtnClick,
    onWithdrawFormSubmitBtnClick

} from "./handlers/memberHandler.js";

import {
    showUploadImage
} from "../../global/util/utils.js";

// -------------------------------------------------------------------

// 공간 등록 폼 - 이미지 초기화 버튼
const spaceRegisterFormSpaceImageCancelBtn = document.querySelector("#spaceRegisterFormSpaceImageCancelBtn");
// 공간 등록 폼 - 이미지 input
const spaceRegisterFormSpaceImage = document.querySelector("#spaceRegisterFormSpaceImage");

document.addEventListener("DOMContentLoaded", function () {

    // 모달 닫기 이벤트
    window.addEventListener("click", onWindowClick);

    // 프로필 수정 버튼 클릭 이벤트
    if(memberModifyBtn != null)
        memberModifyBtn.addEventListener("click", onMemberModifyBtnClick);
    // 프로필 수정 모달 닫기 버튼 클릭 이벤트
    if(memberModifyModalCloseBtn != null)
        memberModifyModalCloseBtn.addEventListener("click", onMemberModifyModalCloseBtnClick);
    // 프로필 수정 폼 - 프로필 이미지 change 이벤트
    if (fileInput != null) {
        fileInput.addEventListener("change", (event) => {
            const container = "#memberModifyFormImageContainer";
            showUploadImage(event, container);
        });
    }
    // 프로필 수정 - 프로필 이미지 업로드 취소 버튼 클릭 이벤트
    if(fileCancelBtn != null)
        fileCancelBtn.addEventListener("click", onFileCancelBtnClick);
    // 프로필 수정 - 이름 입력 이벤트
    if(nameInput != null)
        nameInput.addEventListener("input", onNameInput);
    // 프로필 수정 - 핸드폰 번호 입력 및 정규식 검증 이벤트
    if(phoneInput != null)
        phoneInput.addEventListener("input", onPhoneInput);
    // 프로필 수정 버튼 클릭 이벤트
    if(memberModifySubmitBtn != null)
        memberModifySubmitBtn.addEventListener("click", onMemberModifySubmitBtnClick);

    // -------------------------------------------------------------------
    // 이메일 재설정 버튼 클릭 이벤트
    if(emailModifyBtn != null)
        emailModifyBtn.addEventListener('click', onEmailModifyBtnClick);
    // 이메일 재설정 모달 닫기 버튼 클릭 이벤트
    if(emailModifyModalCloseBtn != null)
        emailModifyModalCloseBtn.addEventListener("click", onEmailModifyModalCloseBtnClick);

    // 이메일 재설정 - 이메일 입력 이벤트
    if(emailInput != null)
        emailInput.addEventListener("input", onEmailInput);
    // 이메일 재설정 - 이메일 중복 확인 버튼 클릭 이벤트
    if(emailDuplicatedCheckBtn != null)
        emailDuplicatedCheckBtn.addEventListener("click", onEmailDuplicatedCheckBtnClick);
    // 이메일 재설정 - 이메일 인증 코드 발송 버튼 클릭 이벤트
    if(emailCodeSendBtn != null) {
        emailCodeSendBtn.addEventListener("click", (event) => {
            const time = 180; // 3분 = 180초
            onEmailCodeSendBtnClick(event, time);
        });
    }
    // 이메일 재설정 - 이메일 인증 코드 입력 및 검증 이벤트
    if(emailCodeInput != null)
        emailCodeInput.addEventListener("input", onEmailCodeInput);
    // 이메일 재설정 - 이메일 변경하기 버튼 클릭
    if(emailModifySubmitBtn != null)
        emailModifySubmitBtn.addEventListener("click", onEmailModifySubmitBtnClick);

    // -------------------------------------------------------------------
    // 비밀번호 재설정 버튼 클릭 이벤트
    if(pwModifyBtn != null)
        pwModifyBtn.addEventListener("click", onPwModifyBtnClick);
    // 비밀번호 재설정 모달 닫기 버튼 클릭 이벤트
    if(pwModifyModalCloseBtn != null)
        pwModifyModalCloseBtn.addEventListener('click', onPwModifyModalCloseBtnClick);

    // 비밀번호 재설정 - 현재 비밀번호 입력 이벤트
    if(originPwInput != null)
        originPwInput.addEventListener("input", onOriginPwInput);
    // 비밀번호 재설정 - 현재 비밀번호 확인 버튼 클릭 이벤트
    if(originPwCheckBtn != null)
        originPwCheckBtn.addEventListener("click", onOriginPwCheckBtnClick);
    // 비밀번호 재설정 - 비밀번호 입력 및 검증 이벤트
    if(pwInput != null)
        pwInput.addEventListener("input", onPwInput);
    // 비밀번호 재설정 - 비밀번호 확인 입력 및 검증 이벤트
    if(confirmPwInput != null)
        confirmPwInput.addEventListener("input", onConfirmPwInput);
    // 비밀번호 재설정 - 비밀번호 재설정 버튼 클릭 이벤트
    if(pwModifySubmitBtn != null)
        pwModifySubmitBtn.addEventListener("click", onPwModifySubmitBtnClick);

    // -------------------------------------------------------------------
    // 계정 탈퇴 버튼 클릭 이벤트
    if(withdrawBtn != null)
        withdrawBtn.addEventListener("click", onWithdrawBtnClick);
    // 계정 탈퇴 모달 닫기 버튼 클릭 이벤트
    if(withdrawModalCloseBtn != null)
        withdrawModalCloseBtn.addEventListener("click", onWithdrawModalCloseBtnClick);

    // 계정 탈퇴 - 탈퇴 비밀번호 입력 이벤트
    if(pwForWithdrawInput != null)
        pwForWithdrawInput.addEventListener("input", onPwForWithdrawInput);
    // 계정 탈퇴 - 탈퇴 비밀번호 확인 버튼 클릭 이벤트
    if(pwForWithdrawCheckBtn != null)
        pwForWithdrawCheckBtn.addEventListener("click", onPwForWithdrawCheckBtnClick);
    // 계정 탈퇴 - 탈퇴하기 버튼 클릭 이벤트
    if(withdrawFormSubmitBtn != null)
        withdrawFormSubmitBtn.addEventListener("click", onWithdrawFormSubmitBtnClick);
});

// --------------------------------------------------------------------------------------------
// 프로필 수정 버튼
const memberModifyBtn = document.querySelector("#memberModifyBtn")
// 프로필 수정 모달 닫기 버트
const memberModifyModalCloseBtn = document.querySelector("#memberModifyModalCloseBtn")

// 프로필 수정하기 버튼
const memberModifySubmitBtn = document.querySelector("#memberModifySubmitBtn")

// 파일 업로드 취소 버튼
const fileCancelBtn = document.querySelector("#fileCancelBtn");
// 프로필 이미지 input
const fileInput = document.querySelector("#file");
// 이름 input
const nameInput = document.querySelector("#name");
// 핸드폰 번호 input
const phoneInput = document.querySelector("#phone");
// 핸드폰 번호 검증 여부
let phoneChecked = false;

// --------------------------------------------------------------------------------------------
// 이메일 재설정 모달
const emailModifyBtn   = document.querySelector("#emailModifyBtn");
// 이메일 재설정 모달 닫기 버튼
const emailModifyModalCloseBtn = document.querySelector("#emailModifyModalCloseBtn");

// 이메일 재설정 제출 버튼
const emailModifySubmitBtn = document.querySelector("#emailModifySubmitBtn");
// 이메일 input
const emailInput = document.querySelector("#email");
// 이메일 검증 확인 여부
let emailChecked = false;

// 이메일 중복 확인 버튼
const emailDuplicatedCheckBtn = document.querySelector("#emailDuplicatedCheckBtn");
// 이메일 중복 확인 여부
let emailDuplicatedChecked = false;

// 이메일 인증 코드 발송 버튼
const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");
// 이메일 인증 코드 input
const emailCodeInput = document.querySelector("#emailCode");
// 이메일 인증 코드
let emailCode;
// 이메일 인증 여부
let emailCodeChecked = false;
// setInterval 저장할 변수
let countdown;

// --------------------------------------------------------------------------------------------
// 비밀번호 재설정 버튼
const pwModifyBtn = document.querySelector("#pwModifyBtn");
// 비밀번호 재설정 모달 닫기 버튼
const pwModifyModalCloseBtn = document.querySelector("#pwModifyModalCloseBtn");

// 비밀번호 재설정 제출 버튼
const pwModifySubmitBtn = document.querySelector("#pwModifySubmitBtn");
// 현재 비밀번호 input
const originPwInput = document.querySelector("#originPw");
// 현재 비밀번호 확인 버튼
const originPwCheckBtn = document.querySelector("#originPwCheckBtn");
// 현재 비밀번호 확인 여부
let originPwChecked = false;

// 새 비밀번호 input
const pwInput = document.querySelector("#pw");
// 새 비밀번호 검증 여부
let pwChecked = false;

// 새 비밀번호 확인 input
const confirmPwInput = document.querySelector("#confirmPw");
// 새 비밀번호 확인 검증 여부
let confirmPwChecked = false;

// --------------------------------------------------------------------------------------------
// 계정 탈퇴 버튼
const withdrawBtn = document.querySelector("#withdrawBtn")
// 계정 탈퇴 모달 닫기 버튼
const withdrawModalCloseBtn = document.querySelector("#withdrawModalCloseBtn")

// 탈퇴하기 버튼
const withdrawFormSubmitBtn = document.querySelector("#withdrawFormSubmitBtn")
// 탈퇴 비밀번호 input
const pwForWithdrawInput = document.querySelector("#pwForWithdraw");
// 탈퇴 비밀번호 확인 버튼
const pwForWithdrawCheckBtn = document.querySelector("#pwForWithdrawCheckBtn")
// 탈퇴 비밀번호 확인 여부
let pwForWithdrawChecked = false;

// --------------------------------------------------------------------------------------------
// getter
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
// originPwChecked 반환
export function isOriginPwChecked() {
    return originPwChecked;
}
// pwChecked 반환
export function isPwChecked() {
    return pwChecked;
}
// confirmPwChecked 반환
export function isConfirmPwChecked() {
    return confirmPwChecked;
}
// pwForWithdrawChecked 반환
export function isPwForWithdrawChecked() {
    return pwForWithdrawChecked;
}
// ------------------------------------------------------------------------------------------
// setter
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
// originPwChecked 설정
export function setOriginPwChecked(value) {
    originPwChecked = value;
}
// pwChecked 설정
export function setPwChecked(value) {
    pwChecked = value;
}
// confirmPwChecked 설정
export function setConfirmPwChecked(value) {
    confirmPwChecked = value;
}
// pwForWithdrawChecked 설정
export function setPwForWithdrawChecked(value) {
    pwForWithdrawChecked = value;
}