import {
    enableButton, disableButton,
    showElement, hideElement
} from '../../../global/util/utils.js';

import {
    getPasswordPattern,
    getEmailPattern,
    updateTimerDisplay
} from '../utils/memberUtil.js';

import {
    isIdChecked, setIdChecked,
    isPwChecked, setPwChecked,
    isConfirmPwChecked, setConfirmPwChecked,
    isEmailChecked, setEmailChecked,
    isEmailCodeChecked, setEmailCodeChecked,
    getEmailCode, setEmailCode,
    getCountdown, setCountdown,
} from '../find-pw.js';

import {
    checkId,
    checkIdWithEmail,
    sendEmailVerifyCode,
} from "../api/memberApi.js";

// 아이디 입력 이벤트 핸들러
export function onIdInput(event) {
    // 아이디 input
    const idInput = event.target;
    // 아이디 확인 버튼
    const idCheckBtn = document.querySelector("#idCheckBtn");

    // 아이디 확인 메시지 숨김
    hideElement("#idCheckMsg");

    // 아이디 확인 여부
    setIdChecked(false);

    // 아이디 확인 버튼 활성화
    enableButton(idCheckBtn, "아이디 확인");

    // 아이디 입력값 확인 후 입력 메시지 출력
    if (idInput.value.trim() == "") {
        showElement("#idInputMsg");
    } else {
        hideElement("#idInputMsg");
    }
}
// 아이디 확인 버튼 이벤트 핸들러
export function onIdCheckBtnClick(event) {
    event.preventDefault()

    const idCheckBtn = event.target;
    const idInput = document.querySelector("#id");
    const pwInput = document.querySelector("#pw");
    const confirmPwInput = document.querySelector("#confirm-password");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        showElement("#idInputMsg");
        idInput.focus();
        return ;
    }

    // 아이디 확인
    checkId(idInput.value).then(data => {
        // 조회됨
        if (data === false) {
            // 확인됨
            setIdChecked(true);

            // 아이디 체크 메시지 숨김
            hideElement("#idCheckMsg");

            // 아이디 확인 버튼 비활성화
            disableButton(idCheckBtn, "확인 완료");

            // 아이디 입력 비활성화
            idInput.readonly = true;

            // 아이디, 이메일, 이메일 인증 완료
            if (isIdChecked() === true &&
                isEmailChecked() === true &&
                isEmailCodeChecked() === true) {
                // 비밀번호 입력 가능
                pwInput.disabled = false;
                confirmPwInput.disabled = false;
                pwInput.focus();
            }
        }
        // 아이디 없음
        else {
            showElement("#idCheckMsg");
            idInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}
// 이메일 입력 및 검증 이벤트 핸들러
export function onEmailInput(event) {
    // 이메일 input
    const emailInput = event.target;
    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");

    // 아이디, 이메일 매칭 메시지 숨김
    hideElement("#idEmailCheckMsg");

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement("#emailInputMsg");
        // 인증 코드 발송 버튼 비활성화
        disableButton(emailCodeSendBtn);
    } else {
        hideElement("#emailInputMsg");
    }

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value)) {
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
export async function onEmailCodeSendBtnClick(event, time) {
    event.preventDefault();
    // 아이디 input
    const idInput = document.querySelector("#id");

    const emailCodeSendBtn = event.target;
    const emailInput     = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");
    const emailCodeTimer = document.querySelector("#emailCodeTimer");

    let idEmailCheck = false;

    // 아이디 중복 확인 안 함
    if (isIdChecked() === false) {
        showElement("#idCheckMsg");
        return ;
    }

    // 아이디, 이메일 매칭 확인
    try {
        idEmailCheck = await checkIdWithEmail(idInput.value.trim(), emailInput.value.trim());
    } catch(e) {
        console.log(e);
    }

    // 아이디, 이메일 매칭 안 됨
    if (!idEmailCheck) {
        showElement("#idEmailCheckMsg");
        emailInput.focus();
        return ;
    }

    // 아이디, 이메일 입력 비활성화
    idInput.readOnly = true;
    emailInput.readOnly = true;

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
    showElement("#emailCodeTimer");

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

// 이메일 인증 코드 입력 이벤트 핸들러
export function onEmailCodeInput(event) {
    const emailCodeSendBtn = event.target;
    // 아이디 input
    const idInput = document.querySelector("#id");
    
    // 이메일, 이메일 인증 코드 input
    const emailInput = document.querySelector("#email");
    const emailCodeInput = event.target;
    // 비밀번호, 비밀번호 확인 input
    const pwInput = document.querySelector("#pw");
    const confirmPwInput = document.querySelector("#confirm-password");

    // 이메일 인증 완료 여부 메시지 숨김
    hideElement("#emailCodeCheckMsg");

    // 코드 입력값 검증
    if (emailCodeInput.value != getEmailCode()) {
        setEmailCodeChecked(false);
        showElement("#emailCodeCheckMsg");
    } else {
        clearInterval(getCountdown());

        setEmailCodeChecked(true);

        emailCodeSendBtn.innerHTML = "이메일 인증 완료";

        hideElement("#emailCodeCheckMsg");
        hideElement("#emailCodeTimer");
    }

    // 이메일 인증 완료
    if (isEmailCodeChecked() === true) {
        emailCodeInput.disabled = true;
    }

    // 아이디, 이메일, 이메일 인증 완료
    if (isIdChecked() === true &&
        isEmailChecked() === true &&
        isEmailCodeChecked() === true) {

        // 비밀번호 입력 가능
        pwInput.disabled = false;
        confirmPwInput.disabled = false;
        pwInput.focus();
    }
}

// 비밀번호 입력값 확인 및 정규식 검증 이벤트 핸들러
export function onPwInput(event) {
    // 비밀번호 input
    const pwInput = event.target;
    // 비밀번호 확인 input
    const confirmPwInput = document.querySelector("#confirm-password");

    // 비밀번호 입력값 확인 후 입력 메시지 출력
    if (pwInput.value.trim() == "") {
        showElement("#pwInputMsg");
    } else {
        hideElement("#pwInputMsg");
    }

    // 비밀번호 정규식 검증
    if (!getPasswordPattern().test(pwInput.value)) {
        setPwChecked(false);
        showElement("#pwCheckMsg");
    } else {
        setPwChecked(true);
        hideElement("#pwCheckMsg");
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value !== confirmPwInput.value) {
        setConfirmPwChecked(false);
        showElement("#confirmPwCheckMsg");
    } else {
        setConfirmPwChecked(true);
        hideElement("#confirmPwCheckMsg");
    }
}
// 비밀번호 확인 입력값 확인 및 검증 이벤트 핸들러
export function onConfirmPwInput(event) {
    // 비밀번호 확인 input
    const confirmPwInput = event.target;
    // 비밀번호 input
    const pwInput = document.querySelector("#pw");

    // 비밀번호 확인 입력값 확인 후 입력 메시지 출력
    if (confirmPwInput.value.trim() == "") {
        showElement("#confirmPwInputMsg");
    } else {
        hideElement("#confirmPwInputMsg");
    }

    // 비밀번호 확인 입력값 검증
    if (pwInput.value !== confirmPwInput.value) {
        setConfirmPwChecked(false);
        showElement("#confirmPwCheckMsg");
    } else {
        setConfirmPwChecked(true);
        hideElement("#confirmPwCheckMsg");
    }
}
// 비밀번호 재설정 버튼 클릭 이벤트 핸들러
export function onFindPwSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const findPwForm = document.querySelector("#findPwForm");
    const idInput = document.querySelector("#id");
    const pwInput = document.querySelector("#pw");
    const emailInput = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#email-code");
    const confirmPwInput = document.querySelector("#confirm-password");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        idInput.focus();
        showElement("#idInputMsg");
        return ;
    }
    // 아이디 확인 여부
    if (isIdChecked() === false) {
        idInput.focus();
        showElement("#idCheckMsg");
        return ;
    }
    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        emailInput.focus();
        showElement("#emailInputMsg");
        return ;
    }
    // 이메일 입력값 검증 확인 여부
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
    // 비밀번호 입력값 없음
    if (pwInput.value.trim() == "") {
        pwInput.focus();
        showElement("#pwInputMsg");
        return ;
    }
    // 비밀번호 입력값 검증 확인
    if (isPwChecked() === false) {
        pwInput.focus();
        showElement("#pwCheckMsg");
        return ;
    }
    // 비밀번호 확인 입력값 없음
    if (confirmPwInput.value.trim() == "") {
        confirmPwInput.focus();
        showElement("#confirmPwInputMsg");
        return ;
    }
    // 비밀번호 확인 검증 확인
    if (isConfirmPwChecked() === false) {
        confirmPwInput.focus();
        showElement("#confirmPwCheckMsg");
        return ;
    }

    findPwForm.submit();
}