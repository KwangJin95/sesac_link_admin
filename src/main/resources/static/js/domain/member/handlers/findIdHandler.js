import {
    enableButton, disableButton,
    showElement, hideElement
} from '../../../global/util/utils.js';

import {
    getEmailPattern,
    updateTimerDisplay
} from '../utils/memberUtil.js';

import {
    isEmailChecked, setEmailChecked,
    isEmailCodeChecked, setEmailCodeChecked,
    getEmailCode, setEmailCode,
    getCountdown, setCountdown,
} from '../find-id.js';

import {
    sendEmailVerifyCode
} from "../api/memberApi.js";

// 이메일 입력, 정규식 검증, 인증 코드 발송 버튼 활성화 이벤트 핸들러
export function onEmailInput(event) {
    // 이메일 input
    const emailInput = event.target;
    const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement("#emailInputMsg");
    } else {
        hideElement("#emailInputMsg");
    }

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        setEmailChecked(false);
        showElement("#emailCheckMsg");
    } else {
        setEmailChecked(true);
        hideElement("#emailCheckMsg");
        
        // 인증 코드 발송 버튼 활성화
        enableButton(emailCodeSendBtn);
    }
}
// 이메일 인증 코드 발송 버튼 클릭 이벤트 핸들러
export function onEmailCodeSendBtnClick(event, time) {
    event.preventDefault();
    const emailCodeSendBtn = event.target;
    const emailInput     = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");
    const emailCodeTimer = document.querySelector("#emailCodeTimer");

    // 이메일 input 비활성화
    emailInput.readOnly = true;

    // 이메일 인증 코드 입력 활성화
    emailCodeInput.disabled = false;

    // 인증 코드 전송 및 받아옴
    sendEmailVerifyCode(emailInput.value.trim())
        .then(data => {
            // 수정 필요
            alert(data);
            setEmailCode(data);
        })
        .catch(e => console.log(e));

    // 타이머 시작
    let timeLeft = time;
    updateTimerDisplay(timeLeft, emailCodeTimer); // 즉시 업데이트

    // 기존 타이머가 있으면 초기화
    if (getCountdown()) {
        clearInterval(getCountdown());
    }

    // 타이머 표시
    emailCodeTimer.classList.remove("hidden");

    // 인증 코드 발송 버튼 비활성화
    disableButton(emailCodeSendBtn, "인증 코드 발송 완료");

    // 1초마다 타이머 감소
    setCountdown(setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft, emailCodeTimer);

        // 타이머 종료 시
        if (timeLeft <= 0) {
            clearInterval(getCountdown());
            emailCodeTimer.innerHTML = "시간 초과됐습니다. 이메일 코드 발송 버튼을 다시 클릭해주세요.";

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn, "이메일 인증 코드 발송");
        }
    }, 1000));
}
// 이메일 인증 코드 입력 및 검증 이벤트 핸들러
export function onEmailCodeInput(event) {
    // 이메일 인증 코드 input
    const emailCodeInput = event.target;

    // 코드 입력값 검증
    if (emailCodeInput.value.trim() != getEmailCode()) {
        setEmailCodeChecked(false);
        showElement("#emailCodeCheckMsg");
    } else {
        clearInterval(getCountdown());
        setEmailCodeChecked(true);

        document.querySelector("#emailCodeSendBtn").innerHTML = "이메일 인증 완료";

        hideElement("#emailCodeCheckMsg");
        hideElement("#emailCodeTimer");
    }
    if (isEmailCodeChecked() === true) {
        emailCodeInput.disabled = true;
    }
}
// 아이디 찾기 버튼 클릭 이벤트 핸들러
export function onFindIdSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const findIdForm     = document.querySelector("#findIdForm");
    const emailInput     = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");

    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        emailInput.focus();
        showElement("#emailInputMsg");
        return ;
    }
    // 이메일 입력값 검증 확인
    if (isEmailChecked() === false) {
        emailInput.focus();
        showElement("#emailCheckMsg");
        return ;
    }
    // 이메일 인증 안 함
    if (isEmailCodeChecked() === false) {
        emailCodeInput.focus();
        showElement("#emailCodeCheckMsg");
        return ;
    }

    findIdForm.submit();
}
