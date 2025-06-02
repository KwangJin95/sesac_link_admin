// form 데이터 전송
export async function sendFormData(url, method, form) {
    const formData = new FormData(form);

    return await fetch(url, {
        method: method,
        body: formData
    });
}