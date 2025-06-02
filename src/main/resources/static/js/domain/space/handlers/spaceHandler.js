import {
    showElement, hideElement,
    getAllowedImageExtensions,
    showAlertMessage
} from "../../../global/util/utils.js";

import {
    getSpacePageResponseDTO
} from "../api/spaceApi.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";

import {
    getSpaceCurrentPage, setSpaceCurrentPage
} from "../space.js";

import {
    renderPagination
} from "../../../global/handlers/globalHandler.js";

// 모달 닫기 이벤트 핸들러
export function onSpaceWindowClick(event, modal, form) {
   if (event.target === document.querySelector(modal)) {
       hideElement(modal);

       // 폼 초기화
       document.querySelector(form).reset();
   }

   // 공간 등록 모달
   if (event.target === document.querySelector("#spaceRegisterModal")) {
       hideElement("#spaceRegisterFormImageContainer");
       hideElement("#spaceRegisterFormSpaceImageInputMsg");
       hideElement("#spaceRegisterFormSpaceNameInputMsg");
       hideElement("#spaceRegisterFormPeopleCountInputMsg");
       hideElement("#spaceRegisterFormPeopleCountCheckMsg");
       hideElement("#spaceRegisterFormAvailableTimeCheckMsg");
   }

    // 공간 수정하기 모달
    if (event.target === document.querySelector("#spaceModifyModal")) {
       hideElement("#spaceModifyFormSpaceImageInputMsg");
       hideElement("#spaceModifyFormSpaceNameInputMsg");
       hideElement("#spaceModifyFormPeopleCountInputMsg");
       hideElement("#spaceModifyFormPeopleCountCheckMsg");
       hideElement("#spaceModifyFormAvailableTimeCheckMsg");
    }
}

// 공간 이름 입력 이벤트 핸들러
export function onSpaceNameInput(event, inputMsg) {
    const spaceName = event.target;

    // 공간 이름 입력값 확인 후 입력 메시지 출력
    if (spaceName.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 공간 인원수 입력 이벤트 핸들러
export function onPeopleCountInput(event, inputMsg, checkMsg) {
    const peopleCount = event.target;

    // 인원수 입력 확인 후 입력 메시지 출력
    if (peopleCount.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 인원수 입력값 검증 후 검증 메시지 출력
    if (isNaN(peopleCount.value.trim()) ||
        parseInt(peopleCount.value.trim()) < 1) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}
// 공간 운영 시간 변경 이벤트 핸들러
export function onSpaceAvailableTimeChange(startTime, endTime, checkMsg) {

    const availableStartTime = document.querySelector(startTime).value;
    const availableEndTime = document.querySelector(endTime).value;

    const today = new Date().toISOString().split("T")[0]

    const startDate = new Date(`${today}T${availableStartTime}`);
    const endDate = new Date(`${today}T${availableEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}
// ------------------------------------------------------------------------------------------------
// 공간 등록 모달 닫기 버튼 클릭 이벤트 핸들러
export function onSpaceRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#spaceRegisterFormImageContainer");
    hideElement("#spaceRegisterFormSpaceImageInputMsg");
    hideElement("#spaceRegisterFormSpaceNameInputMsg");
    hideElement("#spaceRegisterFormPeopleCountInputMsg");
    hideElement("#spaceRegisterFormPeopleCountCheckMsg");
    hideElement("#spaceRegisterFormAvailableTimeCheckMsg");
}
// 공간 등록 버튼 클릭 이벤트 핸들러
export function onSpaceRegisterBtnClick(event) {
    event.preventDefault();

    showElement("#spaceRegisterModal");
}
// 공간 등록 폼 초기화 버튼 클릭 이벤트 핸들러
export function onSpaceRegisterFormResetBtnClick(event) {
    hideElement("#spaceRegisterFormImageContainer");
    hideElement("#spaceRegisterFormSpaceImageInputMsg");
    hideElement("#spaceRegisterFormSpaceNameInputMsg");
    hideElement("#spaceRegisterFormPeopleCountInputMsg");
    hideElement("#spaceRegisterFormPeopleCountCheckMsg");
    hideElement("#spaceRegisterFormAvailableTimeCheckMsg");
}
// 공간 등록 폼 - 이미지 업로드 취소 버튼 클릭 이벤트 핸들러
export function onSpaceRegisterFormImageCancelBtnClick(event, form) {
    event.preventDefault();

    // 공간 이미지 input
    document.querySelector(form)["spaceImageFile"].value = null;

    hideElement("#spaceRegisterFormImageContainer");
}
// 공간 등록 폼 - 등록하기 버튼 클릭 이벤트 핸들러
export function onSpaceRegisterFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const spaceRegisterForm = document.querySelector("#spaceRegisterForm");

    const spaceRegisterFormSpaceImage = document.querySelector("#spaceRegisterFormSpaceImage");
    const file = spaceRegisterFormSpaceImage.files[0];
    const allowedExtensions = getAllowedImageExtensions();

    const spaceRegisterFormSpaceName = document.querySelector("#spaceRegisterFormSpaceName");
    const spaceRegisterFormPeopleCount = document.querySelector("#spaceRegisterFormPeopleCount");
    const spaceRegisterFormSpaceAvailableStartTime = document.querySelector("#spaceRegisterFormSpaceAvailableStartTime").value;
    const spaceRegisterFormSpaceAvailableEndTime = document.querySelector("#spaceRegisterFormSpaceAvailableEndTime").value;

    // 공간 이미지 확장자 체크
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if(!allowedExtensions.includes(fileExtension)) {
            showElement("#spaceRegisterFormSpaceImageInputMsg");
            spaceRegisterFormSpaceImage.value = "";
            return ;
        }
    }
    // 공간 이름 입력값 없음
    if (spaceRegisterFormSpaceName.value.trim() == "") {
        spaceRegisterFormSpaceName.focus();
        showElement("#spaceRegisterFormSpaceNameInputMsg");
        return ;
    }
    // 인원수 입력값 없음
    if (spaceRegisterFormPeopleCount.value.trim() == "") {
        spaceRegisterFormPeopleCount.focus();
        showElement("#spaceRegisterFormPeopleCountInputMsg");
        return ;
    }
    // 인원수 입력값 검증
    if (isNaN(spaceRegisterFormPeopleCount.value.trim()) ||
        parseInt(spaceRegisterFormPeopleCount.value.trim()) < 1) {
        spaceRegisterFormPeopleCount.focus();
        showElement("#spaceRegisterFormPeopleCountCheckMsg");
        return ;
    }

    const today     = new Date().toISOString().split("T")[0]
    const startDate = new Date(`${today}T${spaceRegisterFormSpaceAvailableStartTime}`);
    const endDate   = new Date(`${today}T${spaceRegisterFormSpaceAvailableEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement("#spaceRegisterFormAvailableTimeCheckMsg");
        return ;
    }
    spaceRegisterForm.submit();
}

// ------------------------------------------------------------------------------------------------
// 공간 수정 모달 닫기 버튼 클릭 이벤트 핸들러
export function onSpaceModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#spaceModifyFormSpaceImageInputMsg");
    hideElement("#spaceModifyFormSpaceNameInputMsg");
    hideElement("#spaceModifyFormPeopleCountInputMsg");
    hideElement("#spaceModifyFormPeopleCountCheckMsg");
    hideElement("#spaceModifyFormAvailableTimeCheckMsg");
}
// 공간 수정 폼 - 이미지 업로드 취소 버튼 click
export async function onSpaceModifyFormSpaceImageCancelBtnClick(event) {
    // 공간 수정 폼 - 초기화 버튼
    const spaceModifyFormResetBtn = document.querySelector("#spaceModifyFormResetBtn");

    // 공간 이미지 input
    const spaceModifyFormSpaceImage = document.querySelector("#spaceModifyFormSpaceImage");

    spaceModifyFormSpaceImage.value = "";

    const spaceImage = spaceModifyFormResetBtn.dataset.spaceImage;

    const spaceModifyFormImageContainer
        = document.querySelector("#spaceModifyFormImageContainer");
    spaceModifyFormImageContainer.innerHTML
        = '<img src="/api/space/view/' + spaceImage + '" class="w-full h-64" />';
}
// 공간 수정 폼 - 초기화 버튼 click
export async function onSpaceModifyFormResetBtnClick(event) {
    event.preventDefault();

    const spaceModifyFormResetBtn = event.target;

    // 공간 수정 폼
    const spaceModifyForm = document.querySelector("#spaceModifyForm");

    spaceModifyForm.reset();

    const spaceNo = spaceModifyFormResetBtn.dataset.spaceNo;
    const spaceName = spaceModifyFormResetBtn.dataset.spaceName;
    const whiteBoard = spaceModifyFormResetBtn.dataset.whiteBoard;
    const beamProjector = spaceModifyFormResetBtn.dataset.beamProjector;
    const spaceImage = spaceModifyFormResetBtn.dataset.spaceImage;
    const peopleCount = spaceModifyFormResetBtn.dataset.peopleCount;
    const adminName = spaceModifyFormResetBtn.dataset.adminName;
    const regDate = spaceModifyFormResetBtn.dataset.regDate;
    const modDate = spaceModifyFormResetBtn.dataset.modDate;
    const spaceAvailableStartTime = spaceModifyFormResetBtn.dataset.spaceAvailableStartTime;
    const spaceAvailableEndTime = spaceModifyFormResetBtn.dataset.spaceAvailableEndTime;

    spaceModifyForm.spaceNo.value = spaceNo;
    spaceModifyForm.spaceName.value = spaceName;
    spaceModifyForm.peopleCount.value = peopleCount;
    spaceModifyForm.adminName.value = adminName;
    spaceModifyForm.regDate.value = regDate != null ? regDate.substring(0, 10) : '';
    spaceModifyForm.modDate.value = modDate != null ? modDate.substring(0, 10) : '';
    spaceModifyForm.spaceAvailableStartTime.value = spaceAvailableStartTime;
    spaceModifyForm.spaceAvailableEndTime.value = spaceAvailableEndTime;

    document.querySelector("#spaceModifyFormWhiteBoard").checked = whiteBoard === "true";
    document.querySelector("#spaceModifyFormBeamProjector").checked = beamProjector === "true";

    const spaceModifyFormImageContainer
        = document.querySelector("#spaceModifyFormImageContainer");
    spaceModifyFormImageContainer.innerHTML
        = '<img src="/api/space/view/' + spaceImage + '" class="w-full h-64" />';

}
// 공간 수정 폼 - 수정하기 버튼 클릭 이벤트 핸들러
export async function onSpaceModifyFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const spaceModifyForm = document.querySelector("#spaceModifyForm");

    const spaceModifyFormSpaceImage = document.querySelector("#spaceModifyFormSpaceImage");
    const file = spaceModifyFormSpaceImage.files[0];
    const allowedExtensions = getAllowedImageExtensions();

    const spaceModifyFormSpaceName = document.querySelector("#spaceModifyFormSpaceName");
    const spaceModifyFormPeopleCount = document.querySelector("#spaceModifyFormPeopleCount");
    const spaceModifyFormSpaceAvailableStartTime = document.querySelector("#spaceModifyFormSpaceAvailableStartTime").value;
    const spaceModifyFormSpaceAvailableEndTime = document.querySelector("#spaceModifyFormSpaceAvailableEndTime").value;

    // 공간 이미지 확장자 체크
    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if(!allowedExtensions.includes(fileExtension)) {
            showElement("#spaceModifyFormSpaceImageInputMsg");
            spaceModifyFormSpaceImage.value = "";
            return ;
        }
    }
    // 공간 이름 입력값 없음
    if (spaceModifyFormSpaceName.value.trim() == "") {
        spaceModifyFormSpaceName.focus();
        showElement("#spaceModifyFormSpaceNameInputMsg");
        return ;
    }
    // 인원수 입력값 없음
    if (spaceModifyFormPeopleCount.value.trim() == "") {
        spaceModifyFormPeopleCount.focus();
        showElement("#spaceModifyFormPeopleCountInputMsg");
        return ;
    }

    // 인원수 입력값 검증
    if (isNaN(spaceModifyFormPeopleCount.value.trim()) ||
        parseInt(spaceModifyFormPeopleCount.value.trim()) < 1) {

        spaceModifyFormPeopleCount.focus();
        showElement("#spaceModifyFormPeopleCountCheckMsg");
        return ;
    }

    const today     = new Date().toISOString().split("T")[0]
    const startDate = new Date(`${today}T${spaceModifyFormSpaceAvailableStartTime}`);
    const endDate   = new Date(`${today}T${spaceModifyFormSpaceAvailableEndTime}`);

    // 시작 시간 > 종료 시간
    if (startDate >= endDate) {
        showElement("#spaceModifyFormAvailableTimeCheckMsg");
        return ;
    }

    // 공간 수정
    const result = await sendFormData("/api/space",
                                            "PUT",
                                                    spaceModifyForm);
    const message = await result.text();

    // 공간 수정 모달 닫기
    hideElement("#spaceModifyModal");

    // 폼 초기화
    spaceModifyForm.reset();
    
    // 알림 메시지
    showAlertMessage(message);

    // 공간 예약 목록
    await loadSpaceList(getSpaceCurrentPage());
}
// 페이징 버튼 click
export async function onSpacePaginationContainerClick(event) {
    event.preventDefault();

    if (event.target.classList.contains("page-link")) {
        await loadSpaceList(event.target.getAttribute("data-page"));
    }
}
// 공간 목록 - 수정하기 및 삭제하기 버튼 클릭 이벤트 핸들러
export async function onSpaceTbodyClick(event) {
    // 예약 상태 변경 버튼 클릭 이벤트
    if (event.target.classList.contains("spaceModifyBtn")) {
        const spaceModifyBtn = event.target;

        // 공간 수정 폼
        const spaceModifyForm = document.querySelector("#spaceModifyForm");
        // 초기화 버튼
        const spaceModifyFormResetBtn = document.querySelector("#spaceModifyFormResetBtn");

        const spaceNo = spaceModifyBtn.dataset.spaceNo;
        const spaceName = spaceModifyBtn.dataset.spaceName;
        const whiteBoard = spaceModifyBtn.dataset.whiteBoard;
        const beamProjector = spaceModifyBtn.dataset.beamProjector;
        const spaceImage = spaceModifyBtn.dataset.spaceImage;
        const peopleCount = spaceModifyBtn.dataset.peopleCount;
        const adminName = spaceModifyBtn.dataset.adminName;
        const regDate = spaceModifyBtn.dataset.regDate;
        const modDate = spaceModifyBtn.dataset.modDate;
        const spaceAvailableStartTime = spaceModifyBtn.dataset.spaceAvailableStartTime;
        const spaceAvailableEndTime = spaceModifyBtn.dataset.spaceAvailableEndTime;

        spaceModifyForm.spaceNo.value = spaceNo;
        spaceModifyForm.spaceName.value = spaceName;
        spaceModifyForm.peopleCount.value = peopleCount;
        spaceModifyForm.adminName.value = adminName;
        spaceModifyForm.regDate.value = regDate != null ? regDate.substring(0, 10) : '';
        spaceModifyForm.modDate.value = modDate != null ? modDate.substring(0, 10) : '';
        spaceModifyForm.spaceAvailableStartTime.value = spaceAvailableStartTime;
        spaceModifyForm.spaceAvailableEndTime.value = spaceAvailableEndTime;

        document.querySelector("#spaceModifyFormWhiteBoard").checked = whiteBoard === "true";
        document.querySelector("#spaceModifyFormBeamProjector").checked = beamProjector === "true";

        const spaceModifyFormImageContainer
            = document.querySelector("#spaceModifyFormImageContainer");
        spaceModifyFormImageContainer.innerHTML
            = '<img src="/api/space/view/' + spaceImage + '" class="w-full h-64" />';

        spaceModifyFormResetBtn.dataset.spaceNo = spaceNo;
        spaceModifyFormResetBtn.dataset.spaceName = spaceName;
        spaceModifyFormResetBtn.dataset.whiteBoard = whiteBoard;
        spaceModifyFormResetBtn.dataset.beamProjector = beamProjector;
        spaceModifyFormResetBtn.dataset.spaceImage = spaceImage;
        spaceModifyFormResetBtn.dataset.peopleCount = peopleCount;
        spaceModifyFormResetBtn.dataset.adminName = adminName;
        spaceModifyFormResetBtn.dataset.regDate = regDate != null ? regDate.substring(0, 10) : '';
        spaceModifyFormResetBtn.dataset.modDate = modDate != null ? modDate.substring(0, 10) : '';
        spaceModifyFormResetBtn.dataset.spaceAvailableStartTime = spaceAvailableStartTime;
        spaceModifyFormResetBtn.dataset.spaceAvailableEndTime = spaceAvailableEndTime;

        showElement("#spaceModifyModal");
    }

    if (event.target.classList.contains("spaceDeleteBtn")) {
        const spaceDeleteBtn = event.target;

        const spaceNo = spaceDeleteBtn.dataset.spaceNo;
        const spaceName = spaceDeleteBtn.dataset.spaceName;

        const spaceDeleteForm = document.querySelector("#spaceDeleteForm");

        spaceDeleteForm.spaceNo.value = spaceNo;

        document.querySelector("#spaceDeleteName").innerHTML = spaceName;

        showElement("#spaceDeleteModal");
    }
}
// ------------------------------------------------------------------------------------------------
// 공간 삭제 모달 닫기 버튼 클릭 이벤트 핸들러
export function onSpaceDeleteModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
}

// ------------------------------------------------------------------------------------------------
// 공간 목록 load
export async function loadSpaceList(page) {

    // 공간 목록 pageResponseDTO
    let pageResponseDTO = await getSpacePageResponseDTO(page);

    // 공간 목록 list
    let spaceList = pageResponseDTO.dtoList;

    // 공간 목록 랜더링
    renderSpaceTable(spaceList);
    // 페이지네이션 랜더링
    renderPagination(pageResponseDTO, "#spacePaginationContainer", setSpaceCurrentPage);
}
// 공간 목록 랜더링
export function renderSpaceTable(spaceList) {
    let str = "";

    const authName = document.querySelector("#spaceTbody").dataset.authName;

    if (spaceList.length === 0) {
        const colspan = (authName === 'SUPER_ADMIN' || authName === 'ADMIN') ? 8 : 7;
        str += `<tr><td colspan="${colspan}" class="py-4 px-4 text-center text-gray-500">공간 정보가 없습니다.</td></tr>`;
    } else {
        spaceList.forEach(space => {
            const imageUrl = space.spaceImage ? `/api/space/view/${space.spaceImage}` : '/images/defaultImage.jpg';
            str += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="py-1 px-1 text-center border border-gray-300 w-[90px] h-[80px]">
                        ${space.spaceImage ?
                            `<a href="/api/space/view/${space.spaceImage}">
                                <img src="${imageUrl}" class="w-[90px] h-[80px] object-cover" />
                            </a>` :
                            `<img src="${imageUrl}" class="w-[90px] h-[80px] object-cover" />`
                        }
                    </td>
                    <td class="py-1 px-1 text-center border border-gray-300">${space.spaceName}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${space.whiteBoard ? 'O' : 'X'}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${space.beamProjector ? 'O' : 'X'}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${space.peopleCount}명</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${space.adminName}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">
                        ${space.spaceAvailableStartTime} ~ ${space.spaceAvailableEndTime}
                    </td>
            `;

            // SUPER_ADMIN 또는 ADMIN 권한일 때만 수정/삭제 버튼 추가
            if (authName === 'SUPER_ADMIN' || authName === 'ADMIN') {
                str += `
                    <td class="py-1 px-1 text-center border border-gray-300">
                        <div class="flex justify-center space-x-2">
                            <button class="spaceModifyBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    data-space-no="${space.spaceNo}"
                                    data-space-name="${space.spaceName}"
                                    data-space-image="${space.spaceImage}"
                                    data-white-board="${space.whiteBoard}"
                                    data-beam-projector="${space.beamProjector}"
                                    data-people-count="${space.peopleCount}"
                                    data-admin-name="${space.adminName}"
                                    data-reg-date="${space.regDate}"
                                    data-mod-date="${space.modDate}"
                                    data-space-available-start-time="${space.spaceAvailableStartTime}"
                                    data-space-available-end-time="${space.spaceAvailableEndTime}">
                                수정하기
                            </button>
                            <button class="spaceDeleteBtn px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                    data-space-no="${space.spaceNo}"
                                    data-space-name="${space.spaceName}">
                                삭제하기
                            </button>
                        </div>
                    </td>
                `;
            }

            str += `</tr>`;
        });
    }
    document.querySelector("#spaceTbody").innerHTML = str;
}
