import {
    enableButton, disableButton,
    showElement, hideElement
} from '../../../global/util/utils.js';

import {
    getEmailPattern,
    getPasswordPattern,
    getPhonePattern,
    updateTimerDisplay
} from '../utils/memberUtil.js'

import {
    isIdChecked, setIdChecked,
    isPwChecked, setPwChecked,
    isConfirmPwChecked, setConfirmPwChecked,
    isPhoneChecked, setPhoneChecked,
    isEmailChecked, setEmailChecked,
    isEmailDuplicatedChecked, setEmailDuplicatedChecked,
    isEmailCodeChecked, setEmailCodeChecked,
    getEmailCode, setEmailCode,
    getCountdown, setCountdown,
} from '../signup.js';

import {
    checkId,
    checkEmail,
    sendEmailVerifyCode
} from "../api/memberApi.js";

// 아이디 입력 이벤트 핸들러
export function onIdInput (event, inputMsg, checkMsg) {

    // id input
    const idInput = event.target;
    // id 중복 확인 버튼
    const idDuplicatedCheckBtn = document.querySelector("#idDuplicatedCheckBtn");

    // 아이디 중복 확인 메시지 숨김
    hideElement(checkMsg);

    // 아이디 중복 확인 여부
    setIdChecked(false);

    // 아이디 중복 확인 버튼 활성화
    enableButton(idDuplicatedCheckBtn, "중복 확인");

    // 아이디 입력값 확인 후 입력 메시지 출력
    if (idInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}

// 아이디 중복 확인 버튼 클릭 이벤트 핸들러
export function onIdDuplicatedCheckBtnClick (event, inputMsg, checkMsg) {
    event.preventDefault()

    const idInput = document.querySelector("#id");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        showElement(inputMsg);
        idInput.focus();
        return;
    }

    // 아이디 중복 확인
    checkId(idInput.value).then(data => {
        // 사용 가능(중복 x)
        if (data === true) {
            setIdChecked(true);

            hideElement(checkMsg);
            disableButton(event.target, "사용 가능");
        }
        // 사용 불가능(중복)
        else {
            showElement(checkMsg);
            idInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}

// 비밀번호 입력 및 정규식 검증 이벤트 핸들러
export function onPwInput(event, inputMsg, checkMsg, confirmPwCheckMsg) {
    // 비밀번호 input
    const pwInput = event.target;
    // 비밀번호 확인 input
    const confirmPwInput = document.querySelector("#confirm-password");

    // 비밀번호 입력값 확인 후 입력 메시지 출력
    if (pwInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 비밀번호 정규식 검증
    if (!getPasswordPattern().test(pwInput.value.trim())) {
        setPwChecked(false);
        showElement(checkMsg);
    } else {
        setPwChecked(true);
        hideElement(checkMsg);
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value.trim() != confirmPwInput.value.trim()) {
        setConfirmPwChecked(false);
        showElement(confirmPwCheckMsg);
    } else {
        setConfirmPwChecked(true);
        hideElement(confirmPwCheckMsg);
    }
}

// 비밀번호 확인 입력 및 검증 이벤트 핸들러
export function onConfirmPwInput(event, inputMsg, checkMsg) {
    const pwInput = document.querySelector("#pw");
    const confirmPwInput = event.target;

    // 비밀번호 확인 입력값 확인 후 입력 메시지 출력
    if (confirmPwInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value !== confirmPwInput.value) {
        setConfirmPwChecked(false);
        showElement(checkMsg);
    } else {
        setConfirmPwChecked(true);
        hideElement(checkMsg);
    }
}

// 이름 입력 이벤트 핸들러 핸들러
export function onNameInput(event, inputMsg) {
    // 이름 input
    const nameInput = event.target;

    // 이름 입력값 확인 후 입력 메시지 출력
    if (nameInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}

// 핸드폰 번호 입력 및 정규식 검증 이벤트 핸들러
export function onPhoneInput(event, inputMsg, checkMsg) {
    const phoneInput = event.target;
    // 핸드폰 번호 입력값 확인 후 입력 메시지 출력
    if (phoneInput.value.trim() == "") {
        showElement(inputMsg)
    } else {
        hideElement(inputMsg)
    }
    // 핸드폰 번호 정규식 검증
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        setPhoneChecked(false);
        showElement(checkMsg)
    } else {
        setPhoneChecked(true);
        hideElement(checkMsg)
    }
}

// 이메일 입력 및 정규식 검증 이벤트 핸들러
export function onEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    // 이메일 input
    const emailInput = event.target;

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 이메일 중복 체크 메시지 숨김
    hideElement(duplicatedCheckMsg);

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        setEmailChecked(false);
        showElement(checkMsg);
    } else {
        setEmailChecked(true);
        hideElement(checkMsg);
    }
}
// 이메일 중복 확인 버튼 클릭 이벤트 핸들러
export function onEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    event.preventDefault()
    // 이메일 input
    const emailInput = document.querySelector("#email");
    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");

    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        showElement(inputMsg);
        emailInput.focus();
        return;
    }

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        showElement(checkMsg);
        return;
    } else {
        hideElement(checkMsg);
    }

    // 이메일 중복 확인
    checkEmail(emailInput.value).then(data => {
        // 사용 가능(중복 x)
        if (data === true) {
            setEmailDuplicatedChecked(true); // 확인됨

            hideElement(duplicatedCheckMsg);

            // 중복 확인 버튼 비활성화
            disableButton(event.target, "사용 가능");

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn);

            // 이메일 입력 비활성화
            emailInput.readOnly = true;
        }
        // 사용 불가능(중복)
        else {
            showElement(duplicatedCheckMsg);
            emailInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}
// 이메일 인증 코드 발송 버튼 클릭 이벤트 핸들러
export function onEmailCodeSendBtnClick(event, time) {
    event.preventDefault();
    const emailCodeSendBtn = event.target;
    const emailInput     = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");
    const emailCodeTimer = document.querySelector("#emailCodeTimer");

    // 이메일 인증 코드 입력 활성화
    emailCodeInput.disabled = false;

    // 인증 코드 전송 및 받아옴
    sendEmailVerifyCode(emailInput.value.trim())
        .then(data => {
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
export function onEmailCodeInput(event, checkMsg) {
    // 이메일 인증 코드 input
    const emailCodeInput = event.target;

    // 코드 입력값 검증
    if (emailCodeInput.value != getEmailCode()) {
        setEmailCodeChecked(false);
        showElement(checkMsg);
    } else {
        clearInterval(getCountdown());
        setEmailCodeChecked(true);

        document.querySelector("#emailCodeSendBtn").innerHTML = "이메일 인증 완료";

        hideElement(checkMsg);
        hideElement("#emailCodeTimer");
    }
    if (isEmailCodeChecked() === true) {
        emailCodeInput.disabled = true;
    }
}

// 가입하기 버튼 클릭 이벤트 핸들러
export function onSignupSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const signupForm = document.querySelector("#signupForm");
    const idInput = document.querySelector("#id");
    const pwInput = document.querySelector("#pw");
    const confirmPwInput = document.querySelector("#confirm-password");
    const nameInput = document.querySelector("#name");
    const phoneInput = document.querySelector("#phone");
    const emailInput = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        idInput.focus();
        showElement("#idInputMsg");
        return;
    }
    // 아이디 중복 확인 여부
    if (isIdChecked() === false) {
        idInput.focus();
        showElement("#idCheckMsg");
        return;
    }
    // 비밀번호 입력값 없음
    if (pwInput.value.trim() == "") {
        pwInput.focus();
        showElement("#pwInputMsg");
        return;
    }
    // 비밀번호 입력값 검증 확인 여부
    if (isPwChecked() === false) {
        pwInput.focus();
        showElement("#pwCheckMsg");
        return;
    }
    // 비밀번호 확인 입력값 없음
    if (confirmPwInput.value.trim() == "") {
        confirmPwInput.focus();
        showElement("#confirmPwInputMsg");
        return;
    }
    // 비밀번호 확인 검증 확인 여부
    if (isConfirmPwChecked() === false) {
        confirmPwInput.focus();
        showElement("#confirmPwCheckMsg");
        return;
    }
    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#nameInputMsg");
        return;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#phoneInputMsg");
        return;
    }
    // 핸드폰 번호 입력값 검증 확인 여부
    if (isPhoneChecked() === false) {
        phoneInput.focus();
        showElement("#phoneCheckMsg");
        return;
    }
    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        emailInput.focus();
        showElement("#emailInputMsg");
        return;
    }
    // 이메일 입력값 검증 확인 여부
    if (isEmailChecked() === false) {
        emailInput.focus();
        showElement("#emailCheckMsg");
        return;
    }
    // 이메일 중복 확인 여부
    if (isEmailDuplicatedChecked() === false) {
        emailInput.focus();
        showElement("#emailDuplicatedCheckMsg");
        return;
    }
    // 이메일 인증 여부
    if (isEmailCodeChecked() === false) {
        emailCodeInput.focus();
        showElement("#emailCodeCheckMsg");
        return;
    }
    signupForm.submit();
}
// 회원가입 실패 후 다시 돌아왔을 경우 처리
export function setSignup() {
    // 아이디 중복 확인 여부
    setIdChecked(true);
    // 아이디 중복 확인 버튼 비활성화
    disableButton(document.querySelector("#idDuplicatedCheckBtn"), "사용 가능");

    // 비밀번호, 비밀번호 확인
    setPwChecked(false);
    setConfirmPwChecked(false);
    document.querySelector("#pw").value = "";
    document.querySelector("#confirm-password").value = "";

    // 핸드폰 번호 확인 여부
    setPhoneChecked(true);

    // 이메일
    setEmailChecked(true);
    setEmailDuplicatedChecked(true);
    // 이메일 중복 확인 버튼 비활성화
    disableButton(document.querySelector("#emailDuplicatedCheckBtn"), "사용 가능");
    // 이메일 인증 코드 발송 버튼 활성화
    enableButton(document.querySelector("#emailCodeSendBtn"));
    // 이메일 입력 비활성화
    document.querySelector("#email").readOnly = true;

    // 비밀번호 입력
    document.querySelector("#pw").focus();
    showElement("#pwInputMsg");
}