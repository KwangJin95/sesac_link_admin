import {
    enableButton, disableButton,
    showElement, hideElement, getAllowedImageExtensions
} from '../../../global/util/utils.js';

import {
    getEmailPattern,
    getPasswordPattern,
    getPhonePattern,
    updateTimerDisplay
} from '../utils/memberUtil.js'

import {
    isPwChecked, setPwChecked,
    isConfirmPwChecked, setConfirmPwChecked,
    isPhoneChecked, setPhoneChecked,
    isEmailChecked, setEmailChecked,
    isEmailDuplicatedChecked, setEmailDuplicatedChecked,
    isEmailCodeChecked, setEmailCodeChecked,
    getEmailCode, setEmailCode,
    getCountdown, setCountdown,
    isOriginPwChecked, setOriginPwChecked,
    isPwForWithdrawChecked, setPwForWithdrawChecked
} from '../member.js';

import {
    checkEmail,
    sendEmailVerifyCode,
    checkPw
} from "../api/memberApi.js";

// 모달 닫기 이벤트 핸들러
export function onWindowClick(event) {
    // 프로필 수정 모달 닫기
    if (event.target === document.querySelector("#memberModifyModal")) {
        hideElement("#memberModifyModal");
        hideElement("#fileInputMsg");
        hideElement("#nameInputMsg");
        hideElement("#phoneInputMsg");
        hideElement("#phoneCheckMsg");

        // 프로필 수정 폼 초기화
        document.querySelector("#memberModifyForm").reset();

        setPhoneChecked(false);
    }

    // 이메일 재설정 모달 닫기
    if (event.target === document.querySelector("#emailModifyModal")) {
        // 이메일 중복 확인 버튼
        const emailDuplicatedCheckBtn = document.querySelector("#emailDuplicatedCheckBtn");
        // 이메일 인증 코드 발송 버튼
        const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");
        // 이메일 input
        const emailInput = document.querySelector("#email");

        // 이메일 재설정 모달 숨김
        hideElement("#emailModifyModal");

        // 이메일 재설정 폼 초기화
        document.querySelector("#emailModifyForm").reset();

        // 경고 메시지 숨김
        hideElement("#emailInputMsg");
        hideElement("#emailCheckMsg");
        hideElement("#emailDuplicatedCheckMsg");
        hideElement("#emailCodeCheckMsg");

        // 이메일 중복 확인 버튼 활성화
        enableButton(emailDuplicatedCheckBtn, "중복 확인");

        // 이메일 인증 코드 발송 버튼 활성화
        enableButton(emailCodeSendBtn, "이메일 인증 코드 발송");

        clearInterval(getCountdown());

        hideElement("#emailCodeTimer");

        emailInput.readOnly = false;

        setEmailChecked(false);
        setEmailDuplicatedChecked(false);
        setEmailCodeChecked(false);
    }

    // 비밀번호 재설정 모달 닫기
    if (event.target === document.querySelector("#pwModifyModal")) {
        // 현재 비밀번호 확인 버튼
        const originPwCheckBtn = document.querySelector("#originPwCheckBtn");

        // 비밀번호 재설정 모달 숨김
        hideElement("#pwModifyModal");

        // 비밀번호 재설정 폼 초기화
        document.querySelector("#pwModifyForm").reset();

        // 현재 비밀번호 확인 버튼 활성화
        enableButton(originPwCheckBtn, "확인");

        // 현재 비밀번호 입력 활성화
        document.querySelector("#originPw").disabled = false;

        // 경고 메시지 숨김
        hideElement("#originPwInputMsg");
        hideElement("#originPwCheckMsg");
        hideElement("#pwInputMsg");
        hideElement("#pwCheckMsg");
        hideElement("#confirmPwInputMsg");
        hideElement("#confirmPwCheckMsg");

        setOriginPwChecked(false);
        setPwChecked(false);
        setConfirmPwChecked(false);
    }

    // 계정 탈퇴 모달 닫기
    if (event.target === document.querySelector("#withdrawModal")) {
        // 계정 탈퇴 모달 숨김
        hideElement("#withdrawModal");

        // 경고 메시지 숨김
        hideElement("#pwForWithdrawInputMsg");
        hideElement("#pwForWithdrawCheckMsg");

        // 계정 탈퇴 폼 초기화
        document.querySelector("#withdrawForm").reset();

        setPwForWithdrawChecked(false);

        // 탈퇴 비밀번호 확인 버튼 활성화
        enableButton(document.querySelector("#pwForWithdrawCheckBtn"), "확인");

        // 탈퇴하기 버튼 비활성화
        disableButton(document.querySelector("#withdrawFormSubmitBtn"));
    }
}

// 프로필 수정 버튼 클릭 이벤트 핸들러
export function onMemberModifyBtnClick() {
    showElement("#memberModifyModal");
}

// 프로필 수정 모달 닫기 버튼 클릭 이벤트 핸들러
export function onMemberModifyModalCloseBtnClick() {
    hideElement("#memberModifyModal");
    hideElement("#fileInputMsg");
    hideElement("#nameInputMsg");
    hideElement("#phoneInputMsg");
    hideElement("#phoneCheckMsg");

    // 프로필 수정 폼 초기화
    document.querySelector("#memberModifyForm").reset();

    setPhoneChecked(false);
}

// 프로필 수정 - 프로필 이미지 업로드 취소 버튼 클릭 이벤트 핸들러
export function onFileCancelBtnClick(event) {
    event.preventDefault();

    hideElement("#fileInputMsg");

    // 프로필 사진 input
    document.querySelector("#file").value = null;

    hideElement("#memberModifyFormImageContainer");
}

// 프로필 수정 - 이름 입력 이벤트
export function onNameInput(event) {
    // 이름 input
    const nameInput = event.target;

    // 이름 입력값 확인 후 입력 메시지 출력
    if (nameInput.value.trim() == "") {
        showElement("#nameInputMsg");
    } else {
        hideElement("#nameInputMsg");
    }
}
// 프로필 수정 - 핸드폰 번호 입력 및 정규식 검증 이벤트 핸들러
export function onPhoneInput(event) {
    // 핸드폰 번호 input
    const phoneInput = event.target;

    // 핸드폰 번호 입력값 확인 후 입력 메시지 출력
    if (phoneInput.value.trim() == "") {
        showElement("#phoneInputMsg");
    } else {
        hideElement("#phoneInputMsg");
    }

    // 핸드폰 번호 정규식 검증
    if (!getPhonePattern().test(phoneInput.value)) {
        setPhoneChecked(false);
        showElement("#phoneCheckMsg");
    } else {
        setPhoneChecked(true);
        hideElement("#phoneCheckMsg");
    }
}
// 프로필 수정 버튼 클릭 이벤트 핸들러
export function onMemberModifySubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const memberModifyForm = document.querySelector("#memberModifyForm");
    const fileInput = document.querySelector("#file");
    const file = fileInput.files[0];
    const nameInput = document.querySelector("#name");
    const phoneInput = document.querySelector("#phone");
    const allowedExtensions = getAllowedImageExtensions();

    // 프로필 사진 확장자 체크
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            showElement("#fileInputMsg");
            fileInput.value = "";
            return;
        }
    }

    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#nameInputMsg");
        return ;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#phoneInputMsg");
        return ;
    }
    // 핸드폰 번호 입력값 검증 확인
    if (isPhoneChecked() === false && !getPhonePattern().test(phoneInput.value)) {
        phoneInput.focus();
        showElement("#phoneCheckMsg");
        return ;
    }

    memberModifyForm.submit();
}

// 이메일 재설정 버튼 클릭 이벤트
export function onEmailModifyBtnClick() {
    showElement("#emailModifyModal");
}
// 이메일 재설정 모달 닫기 버튼 클릭 이벤트
export function onEmailModifyModalCloseBtnClick () {
    // 이메일 input
    const emailInput = document.querySelector("#email");

    // 이메일 재설정 모달 숨김
    hideElement("#emailModifyModal");

    // 이메일 재설정 폼 초기화
    document.querySelector("#emailModifyForm").reset();

    // 경고 메시지 숨김
    hideElement("#emailInputMsg");
    hideElement("#emailCheckMsg");
    hideElement("#emailDuplicatedCheckMsg");
    hideElement("#emailCodeCheckMsg");

    // 이메일 중복 확인 버튼 활성화
    enableButton(document.querySelector("#emailDuplicatedCheckBtn"), "중복 확인");

    // 이메일 인증 코드 발송 버튼 활성화
    enableButton(document.querySelector("#emailCodeSendBtn"), "이메일 인증 코드 발송");

    clearInterval(getCountdown());

    hideElement("#emailCodeTimer");

    emailInput.readOnly = false;

    setEmailChecked(false);
    setEmailDuplicatedChecked(false);
    setEmailCodeChecked(false);
}
// 이메일 재설정 - 이메일 입력 이벤트 핸들러
export function onEmailInput(event) {
    // 이메일 input
    const emailInput = event.target;

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement("#emailInputMsg");
    } else {
        hideElement("#emailInputMsg");
    }

    // 이메일 중복 확인 메시지 숨김
    hideElement("#emailDuplicatedCheckMsg");

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value)) {
        setEmailChecked(false);
        showElement("#emailCheckMsg");
    } else {
        setEmailChecked(true);
        hideElement("#emailCheckMsg");
    }
}
// 이메일 재설정 - 이메일 중복 확인 버튼 클릭 이벤트 핸들러
export function onEmailDuplicatedCheckBtnClick(event) {
    event.preventDefault()

    // 이메일 input
    const emailInput = document.querySelector("#email");
    // 이메일 중복 확인 버튼
    const emailDuplicatedCheckBtn = document.querySelector("#emailDuplicatedCheckBtn");

    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");

    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        showElement("#emailInputMsg");
        emailInput.focus();
        return ;
    }

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value)) {
        showElement("#emailCheckMsg");
        return ;
    } else {
        hideElement("#emailCheckMsg");
    }

    // 이메일 중복 확인
    checkEmail(emailInput.value).then(data => {
        // 사용 가능(중복 x)
        if (data === true) {
            // 확인됨
            setEmailDuplicatedChecked(true);

            hideElement("#emailDuplicatedCheckMsg");

            // 이메일 중복 확인 버튼 비활성화
            disableButton(emailDuplicatedCheckBtn, "사용 가능");

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn);

            // 이메일 입력 비활성화
            emailInput.readOnly = true;
        }
        // 사용 불가능(중복)
        else {
            showElement("#emailDuplicatedCheckMsg");
            emailInput.focus();
        }
    }).catch(e => {
        console.log(e);
    });
}
// 이메일 재설정 - 이메일 인증 코드 발송 버튼 클릭 이벤트 핸들러
export function onEmailCodeSendBtnClick(event, time) {
    event.preventDefault();

    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = event.target;
    // 이메일 인증 코드 input
    const emailCodeInput = document.querySelector("#emailCode");
    // 이메일 input
    const emailInput = document.querySelector("#email");
    // 이메일 인증 타이머
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

            emailCodeTimer.innerHTML =
                "시간 초과됐습니다. 이메일 코드 발송 버튼을 다시 클릭해주세요.";

            // 이메일 인증 코드 발송 버튼 활성화
            enableButton(emailCodeSendBtn, "이메일 인증 코드 발송");
        }
    }, 1000));
}
// 이메일 재설정 - 이메일 인증 코드 입력 및 검증 이벤트 핸들러
export function onEmailCodeInput(event) {
    // 이메일 인증 코드 input
    const emailCodeInput = event.target;
    // 이메일 인증 코드 발송 버튼
    const emailCodeSendBtn = document.querySelector("#emailCodeSendBtn");

    // 코드 입력값 검증
    if (emailCodeInput.value != getEmailCode()) {
        setEmailCodeChecked(false);
        showElement("#emailCodeCheckMsg");
    } else {
        clearInterval(getCountdown());

        emailCodeSendBtn.innerHTML = "이메일 인증 완료";

        setEmailCodeChecked(true);
        hideElement("#emailCodeCheckMsg");
        hideElement("#emailCodeTimer");
    }
    if (isEmailCodeChecked() === true) {
        emailCodeInput.disabled = true;
    }
}
// 이메일 재설정 - 이메일 변경하기 버튼 클릭 핸들러
export function onEmailModifySubmitBtnClick (event) {
    event.preventDefault();

    // form data
    const emailInput = document.querySelector("#email");
    const emailCodeInput = document.querySelector("#emailCode");

    // 이메일 입력값 없음
    if (emailInput.value.trim() === "") {
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
    // 이메일 중복 확인
    if (isEmailDuplicatedChecked() === false) {
        emailInput.focus();
        showElement("#emailDuplicatedCheckMsg");
        return ;
    }
    // 이메일 인증 안 함
    if (isEmailCodeChecked() === false) {
        emailCodeInput.focus();
        showElement("#emailCodeCheckMsg");
        return ;
    }

    document.querySelector("#emailModifyForm").submit();
}

// 비밀번호 재설정 버튼 클릭 이벤트 핸들러
export function onPwModifyBtnClick() {
    showElement("#pwModifyModal");
}
// 비밀번호 재설정 모달 닫기 버튼 클릭 이벤트 핸들러
export function onPwModifyModalCloseBtnClick() {
    // 비밀번호 재설정 모달 숨김
    hideElement("#pwModifyModal");

    // 비밀번호 재설정 폼 초기화
    document.querySelector("#pwModifyForm").reset();

    // 현재 비밀번호 확인 버튼 활성화
    enableButton(document.querySelector("#originPwCheckBtn"), "확인");

    // 현재 비밀번호 입력 활성화
    document.querySelector("#originPw").disabled = false;

    // 경고 메시지 숨김
    hideElement("#originPwInputMsg");
    hideElement("#originPwCheckMsg");
    hideElement("#pwInputMsg");
    hideElement("#pwCheckMsg");
    hideElement("#confirmPwInputMsg");
    hideElement("#confirmPwCheckMsg");

    setOriginPwChecked(false);
    setPwChecked(false);
    setConfirmPwChecked(false);
}
// 비밀번호 재설정 - 현재 비밀번호 입력 이벤트 핸들러
export function onOriginPwInput(event) {
    // 현재 비밀번호 input
    const originPwInput = event.target;

    hideElement("#originPwCheckMsg");

    // 현재 비밀번호 입력값 확인 후 입력 메시지 출력
    if (originPwInput.value.trim() == "") {
        showElement("#originPwInputMsg");
    } else {
        hideElement("#originPwInputMsg");
    }
}
// 비밀번호 재설정 - 현재 비밀번호 확인 버튼 클릭 이벤트 핸들러
export function onOriginPwCheckBtnClick(event) {
    event.preventDefault();

    // 현재 비밀번호 확인 버튼
    const originPwCheckBtn = event.target;
    // 현재 비밀번호 input
    const originPwInput = document.querySelector("#originPw");
    // 회원 번호
    const adminNo = document.querySelector("#adminNo");

    // 현재 비밀번호 입력값 확인 후 입력 메시지 출력
    if (originPwInput.value.trim() == "") {
        showElement("#originPwInputMsg");
        return ;
    }

    // 비밀번호 확인
    checkPw(adminNo.value.trim(),
        originPwInput.value.trim())
        .then(data => {
            // 확인 완료
            if (data === true) {
                originPwInput.disabled = true;

                // 현재 비밀번호 확인 버튼 비활성화
                disableButton(originPwCheckBtn, "확인 완료");

                hideElement("#originPwCheckMsg");

                setOriginPwChecked(true);
            }
            // 현재 비밀번호와 다름
            else {
                showElement("#originPwCheckMsg");
                setOriginPwChecked(false);
            }
        }).catch(e => console.log(e));
}
// 비밀번호 재설정 - 비밀번호 입력 및 검증 이벤트 핸들러
export function onPwInput(event) {
    // 비밀번호 input
    const pwInput = event.target;
    // 비밀번호 확인 input
    const confirmPwInput = document.querySelector("#confirmPw");

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
// 비밀번호 재설정 - 비밀번호 확인 입력 및 검증 이벤트 핸들러
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
// 비밀번호 재설정 - 비밀번호 재설정 버튼 클릭 이벤트 핸들러
export function onPwModifySubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const originPwInput = document.querySelector("#originPw");
    const pwInput = document.querySelector("#pw");
    const confirmPwInput = document.querySelector("#confirmPw");

    // 현재 비밀번호 입력값 없음
    if (originPwInput.value.trim() == "") {
        originPwInput.focus();
        showElement("#originPwInputMsg");
        return ;
    }
    // 현재 비밀번호 입력값 검증 확인
    if (isOriginPwChecked() === false) {
        originPwInput.focus();
        showElement("#originPwCheckMsg");
        return ;
    }
    // 새 비밀번호 입력값 없음
    if (pwInput.value.trim() == "") {
        pwInput.focus();
        showElement("#pwInputMsg");
        return ;
    }
    // 새 비밀번호 입력값 검증 확인
    if (isPwChecked() === false) {
        pwInput.focus();
        showElement("#pwCheckMsg");
        return ;
    }
    // 새 비밀번호 확인 입력값 없음
    if (confirmPwInput.value.trim() == "") {
        confirmPwInput.focus();
        showElement("#confirmPwInputMsg");
        return ;
    }
    // 새 비밀번호 확인 검증 확인
    if (isConfirmPwChecked() === false) {
        confirmPwInput.focus();
        showElement("#confirmPwCheckMsg");
        return ;
    }

    document.querySelector("#pwModifyForm").submit();
}

// 계정 탈퇴 버튼 클릭 이벤트 핸들러
export function onWithdrawBtnClick() {
    showElement("#withdrawModal");
}
// 계정 탈퇴 모달 닫기 버튼 클릭 이벤트 핸들러
export function onWithdrawModalCloseBtnClick() {
    // 계정 탈퇴 모달 숨김
    hideElement("#withdrawModal");

    // 경고 메시지 숨김
    hideElement("#pwForWithdrawInputMsg");
    hideElement("#pwForWithdrawCheckMsg");

    // 계정 탈퇴 폼 초기화
    document.querySelector("#withdrawForm").reset();

    setPwForWithdrawChecked(false);

    // 탈퇴 비밀번호 확인 버튼 활성화
    enableButton(document.querySelector("#pwForWithdrawCheckBtn"), "확인");

    // 탈퇴하기 버튼 비활성화
    disableButton(document.querySelector("#withdrawFormSubmitBtn"));
}
// 계정 탈퇴 - 탈퇴 비밀번호 입력 이벤트 핸들러
export function onPwForWithdrawInput(event) {
    // 탈퇴 비밀번호 input
    const pwForWithdrawInput = event.target;

    hideElement("#pwForWithdrawCheckMsg");

    // 탈퇴 비밀번호 입력값 확인 후 입력 메시지 출력
    if (pwForWithdrawInput.value.trim() == "") {
        showElement("#pwForWithdrawInputMsg");
    } else {
        hideElement("#pwForWithdrawInputMsg");
    }
}
// 계정 탈퇴 - 탈퇴 비밀번호 확인 버튼 클릭 이벤트 핸들러
export function onPwForWithdrawCheckBtnClick(event) {
    event.preventDefault();

    // 탈퇴 비밀번호 input
    const pwForWithdrawInput = document.querySelector("#pwForWithdraw");
    // 회원 번호
    const adminNo = document.querySelector("#adminNo");

    // 비밀번호 확인 입력값 확인 후 입력 메시지 출력
    if (pwForWithdrawInput.value.trim() == "") {
        showElement("#pwForWithdrawInputMsg");
        return ;
    } else {
        hideElement("#pwForWithdrawInputMsg");
    }

    // 비밀번호 확인
    checkPw(adminNo.value.trim(),
        pwForWithdrawInput.value.trim()
    ).then(data =>
    {
        // 확인 완료
        if (data === true) {
            hideElement("#pwForWithdrawCheckMsg");

            setPwForWithdrawChecked(true);

            // 탈퇴 비밀번호 확인 버튼 비활성화
            disableButton(document.querySelector("#pwForWithdrawCheckBtn"), "확인 완료");
            // 탈퇴하기 버튼 활성화
            enableButton(document.querySelector("#withdrawFormSubmitBtn"));
        }
        // 현재 비밀번호와 다름
        else {
            showElement("#pwForWithdrawCheckMsg");
            setPwForWithdrawChecked(false);
        }
    }).catch(e => console.log(e));
}
// 계정 탈퇴 - 탈퇴하기 버튼 클릭 이벤트 핸들러
export function onWithdrawFormSubmitBtnClick(event) {
    event.preventDefault();

    document.querySelector("#withdrawForm").submit();
}

// 다음 주소 api 로드
export function loadDaumPostcodeScript(callback) {
    if (window.daum && window.daum.Postcode) {
        callback();
        return;
    }

    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = callback;
    document.body.appendChild(script);
}

// 다음 주소 api 주소 선택
export function openDaumPostcode(event, addressInput, detailAddressInput) {
    event.preventDefault();

    const address       = document.querySelector(addressInput);
    const detailAddress = document.querySelector(detailAddressInput);

    loadDaumPostcodeScript(() => {
        new daum.Postcode({
            oncomplete: function(data) {
                // 사용자가 도로명 주소를 선택했을 경우
                if (data.userSelectedType === 'R')
                    address.value = data.roadAddress;
                // 사용자가 지번 주소를 선택했을 경우(J)
                else
                    address.value = data.jibunAddress;

                detailAddress.focus();
            }
        }).open();
    });
}
