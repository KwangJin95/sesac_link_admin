// 버튼 활성화
export function enableButton(button, buttonValue) {
    button.classList.remove("bg-gray-400");
    button.classList.add("bg-red-500", "hover:bg-red-600");
    button.disabled = false;
    if (buttonValue)
        button.innerHTML = buttonValue;
}

// 버튼 비활성화
export function disableButton(button, buttonValue) {
    button.classList.remove("bg-red-500", "hover:bg-red-600");
    button.classList.add("bg-gray-400");
    button.disabled = true;
    if (buttonValue)
        button.innerHTML = buttonValue;
}

// 요소 숨김
export function hideElement(selector) {
    document.querySelector(selector).classList.add("hidden");
}

// 요소 보여줌
export function showElement(selector) {
    document.querySelector(selector).classList.remove("hidden");
}

// 이미지 확장자 배열 반환
export function getAllowedImageExtensions() {
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
}

// 알림 메시지 출력
export function showAlertMessage(message) {
    document.querySelector("#alertMsg").innerHTML = message;
    showElement("#alertModal");
}

// 이미지 미리보기
export function showUploadImage(event, container) {
    const file = event.target.files[0];

    const imageContainer = document.querySelector(container);

    let str = "";

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            str = `<img src="${e.target.result}" class="w-full h-64" />`;
            imageContainer.innerHTML = str;
            showElement(container);
        };
        reader.readAsDataURL(file); // 파일 내용을 base64로 읽음
    }
    else {
        str = `<img src="" class="w-full h-64" />`;
        imageContainer.innerHTML = str;
        hideElement(container);
    }
}

