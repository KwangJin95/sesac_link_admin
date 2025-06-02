// 비밀번호 정규식 반환
export function getPasswordPattern() {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
}

// 이메일 정규식 반환
export function getEmailPattern() {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
}

// 핸드폰 번호 정규식 반환
export function getPhonePattern() {
    // 010~019-0000-0000
    return /^01[0-9]-\d{4}-\d{4}$/;
}

// 시간을 "MM:SS" 형식으로 변환하여 표시
export function updateTimerDisplay(time, element) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    element.innerHTML = `남은 시간: 0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}