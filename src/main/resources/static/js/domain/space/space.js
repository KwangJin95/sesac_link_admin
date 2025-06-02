import {
    onSpaceWindowClick,
    onSpaceNameInput,
    onPeopleCountInput,
    onSpaceAvailableTimeChange,
    onSpaceRegisterModalCloseBtnClick,
    onSpaceRegisterBtnClick,
    onSpaceRegisterFormImageCancelBtnClick,
    onSpaceRegisterFormResetBtnClick,
    onSpaceRegisterFormSubmitBtnClick,

    onSpaceModifyModalCloseBtnClick,
    onSpaceModifyFormSubmitBtnClick,
    onSpaceModifyFormResetBtnClick,
    onSpaceModifyFormSpaceImageCancelBtnClick,
    onSpaceTbodyClick,
    onSpaceDeleteModalCloseBtnClick,

    loadSpaceList, onSpacePaginationContainerClick,
} from "./handlers/spaceHandler.js";

import {
    showUploadImage
} from "../../global/util/utils.js";

// ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async function () {

    // 공간 목록 load
    await loadSpaceList();
    // 페이징
    if (spacePaginationContainer != null) {
        spacePaginationContainer.addEventListener("click", onSpacePaginationContainerClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 공간 등록
    // 공간 등록 버튼 클릭 이벤트
    if (spaceRegisterBtn != null) {
        spaceRegisterBtn.addEventListener("click", onSpaceRegisterBtnClick);
    }
    // 공간 등록 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceRegisterModal";
        const form  = "#spaceRegisterForm";
        onSpaceWindowClick(event, modal, form);
    });
    // 공간 등록 모달 닫기 이벤트
    if (spaceRegisterModalCloseBtn != null) {
        spaceRegisterModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceRegisterModal";
            const form  = "#spaceRegisterForm";
            onSpaceRegisterModalCloseBtnClick(event, modal, form);
        });
    }
    // 공간 등록 폼 - 공간 이미지 change 이벤트
    if (spaceRegisterFormSpaceImage != null) {
        spaceRegisterFormSpaceImage.addEventListener("change", (event) => {
            const container = "#spaceRegisterFormImageContainer";
            showUploadImage(event, container);
        });
    }
    // 공간 등록 폼 - 공간 이미지 업로드 취소 버튼 클릭 이벤트
    if (spaceRegisterFormSpaceImageCancelBtn != null) {
        spaceRegisterFormSpaceImageCancelBtn.addEventListener("click", (event) => {
            const form = "#spaceRegisterForm";
            onSpaceRegisterFormImageCancelBtnClick(event, form);
        });
    }
    // 공간 등록 폼 - 공간 이름 입력 이벤트
    if (spaceRegisterFormSpaceName != null) {
        spaceRegisterFormSpaceName.addEventListener("input", (event) => {
            const inputMsg = "#spaceRegisterFormSpaceNameInputMsg";
            onSpaceNameInput(event, inputMsg);
        });
    }
    // 공간 등록 폼 - 인원수 입력 이벤트
    if (spaceRegisterFormPeopleCount != null) {
        spaceRegisterFormPeopleCount.addEventListener("input", (event) => {
            const inputMsg = "#spaceRegisterFormPeopleCountInputMsg";
            const checkMsg = "#spaceRegisterFormPeopleCountCheckMsg";
            onPeopleCountInput(event, inputMsg, checkMsg);
        });
    }
    // 공간 등록 폼 - 공간 시작 시간 변화 이벤트
    if (spaceRegisterFormSpaceAvailableStartTime != null) {
        spaceRegisterFormSpaceAvailableStartTime.addEventListener("change", (event) => {
            const startTime = "#spaceRegisterFormSpaceAvailableStartTime";
            const endTime = "#spaceRegisterFormSpaceAvailableEndTime";
            const checkMsg = "#spaceRegisterFormAvailableTimeCheckMsg";
            onSpaceAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 공간 등록 폼 - 공간 종료 시간 변화 이벤트
    if (spaceRegisterFormSpaceAvailableEndTime != null) {
        spaceRegisterFormSpaceAvailableEndTime.addEventListener("change", (event) => {
            const startTime = "#spaceRegisterFormSpaceAvailableStartTime";
            const endTime = "#spaceRegisterFormSpaceAvailableEndTime";
            const checkMsg = "#spaceRegisterFormAvailableTimeCheckMsg";
            onSpaceAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 공간 등록 폼 - 초기화 버튼 클릭 이벤트
    if (spaceRegisterFormResetBtn != null) {
        spaceRegisterFormResetBtn.addEventListener("click", onSpaceRegisterFormResetBtnClick);
    }
    // 공간 등록 폼 - 등록하기 버튼 클릭 이벤트
    if (spaceRegisterFormSubmitBtn != null) {
        spaceRegisterFormSubmitBtn.addEventListener("click", onSpaceRegisterFormSubmitBtnClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 공간 수정
    // 공간 수정 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceModifyModal";
        const form  = "#spaceModifyForm";
        onSpaceWindowClick(event, modal, form);
    });
    // 공간 수정 모달 닫기 이벤트
    if (spaceModifyModalCloseBtn != null) {
        spaceModifyModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceModifyModal";
            const form  = "#spaceModifyForm";
            onSpaceModifyModalCloseBtnClick(event, modal, form);
        });
    }
    // 공간 수정 폼 - 공간 이미지 change 이벤트
    if (spaceModifyFormSpaceImage != null) {
        spaceModifyFormSpaceImage.addEventListener("change", (event) => {
            const container = "#spaceModifyFormImageContainer";
            showUploadImage(event, container);
        });
    }
    // 공간 수정 폼 - 공간 이미지 업로드 취소 버튼 클릭 이벤트
    if (spaceModifyFormSpaceImageCancelBtn != null) {
        spaceModifyFormSpaceImageCancelBtn.addEventListener("click", onSpaceModifyFormSpaceImageCancelBtnClick);
    }
    // 공간 수정 폼 - 공간 이름 입력 이벤트
    if (spaceModifyFormSpaceName != null) {
        spaceModifyFormSpaceName.addEventListener("input", (event) => {
            const inputMsg = "#spaceModifyFormSpaceNameInputMsg";
            onSpaceNameInput(event, inputMsg);
        });
    }
    // 공간 수정 폼 - 인원수 입력 이벤트
    if (spaceModifyFormPeopleCount != null) {
        spaceModifyFormPeopleCount.addEventListener("input", (event) => {
            const inputMsg = "#spaceModifyFormPeopleCountInputMsg";
            const checkMsg = "#spaceModifyFormPeopleCountCheckMsg";
            onPeopleCountInput(event, inputMsg, checkMsg);
        });
    }
    // 공간 수정 폼 - 공간 시작 시간 변화 이벤트
    if (spaceModifyFormSpaceAvailableStartTime != null) {
        spaceModifyFormSpaceAvailableStartTime.addEventListener("change", (event) => {
            const startTime = "#spaceModifyFormSpaceAvailableStartTime";
            const endTime = "#spaceModifyFormSpaceAvailableEndTime";
            const checkMsg = "#spaceModifyFormAvailableTimeCheckMsg";
            onSpaceAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 공간 수정 폼 - 공간 종료 시간 변화 이벤트
    if (spaceModifyFormSpaceAvailableEndTime != null) {
        spaceModifyFormSpaceAvailableEndTime.addEventListener("change", (event) => {
            const startTime = "#spaceModifyFormSpaceAvailableStartTime";
            const endTime = "#spaceModifyFormSpaceAvailableEndTime";
            const checkMsg = "#spaceModifyFormAvailableTimeCheckMsg";
            onSpaceAvailableTimeChange(startTime, endTime, checkMsg);
        });
    }
    // 공간 수정 폼 - 초기화 버튼 클릭 이벤트
    if (spaceModifyFormResetBtn != null) {
        spaceModifyFormResetBtn.addEventListener("click", onSpaceModifyFormResetBtnClick);
    }
    // 공간 수정 폼 - 수정하기 버튼 클릭 이벤트
    if (spaceModifyFormSubmitBtn != null) {
        spaceModifyFormSubmitBtn.addEventListener("click", onSpaceModifyFormSubmitBtnClick);
    }
    // 공간 수정 및 삭제 버튼 클릭 이벤트
    if (spaceTbody != null) {
        spaceTbody.addEventListener("click", onSpaceTbodyClick);
    }

    // ------------------------------------------------------------------------------------------------
    // 공간 삭제
    // 공간 삭제 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#spaceDeleteModal";
        const form  = "#spaceDeleteForm";
        onSpaceWindowClick(event, modal, form);
    });
    // 공간 삭제 모달 닫기 이벤트
    if (spaceDeleteModalCloseBtn != null) {
        spaceDeleteModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#spaceDeleteModal";
            const form  = "#spaceDeleteForm";
            onSpaceDeleteModalCloseBtnClick(event, modal, form);
        });
    }


});

// ------------------------------------------------------------------------------------------------
// 공간 등록 버튼
const spaceRegisterBtn = document.querySelector("#spaceRegisterBtn");
// 공간 등록 모달 닫기 버튼
const spaceRegisterModalCloseBtn = document.querySelector("#spaceRegisterModalCloseBtn");
// 공간 등록 폼 - 이미지 초기화 버튼
const spaceRegisterFormSpaceImageCancelBtn = document.querySelector("#spaceRegisterFormSpaceImageCancelBtn");
// 공간 등록 폼 - 이미지 input
const spaceRegisterFormSpaceImage = document.querySelector("#spaceRegisterFormSpaceImage");
// 공간 등록 폼 - 공간 이름 input
const spaceRegisterFormSpaceName = document.querySelector("#spaceRegisterFormSpaceName");
// 공간 등록 폼 - 인원수 input
const spaceRegisterFormPeopleCount = document.querySelector("#spaceRegisterFormPeopleCount");
// 공간 등록 폼 - 시작 시간 input
const spaceRegisterFormSpaceAvailableStartTime = document.querySelector("#spaceRegisterFormSpaceAvailableStartTime");
// 공간 등록 폼 - 종료 시간 input
const spaceRegisterFormSpaceAvailableEndTime = document.querySelector("#spaceRegisterFormSpaceAvailableEndTime");
// 공간 등록 폼 - 초기화 버튼
const spaceRegisterFormResetBtn = document.querySelector("#spaceRegisterFormResetBtn");
// 공간 등록 폼 - 등록 버튼
const spaceRegisterFormSubmitBtn = document.querySelector("#spaceRegisterFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 공간 수정 모달 닫기 버튼
const spaceModifyModalCloseBtn = document.querySelector("#spaceModifyModalCloseBtn");
// 공간 수정 폼 - 업로드 취소 버튼
const spaceModifyFormSpaceImageCancelBtn = document.querySelector("#spaceModifyFormSpaceImageCancelBtn");
// 공간 수정 폼 - 이미지 업로드 input
const spaceModifyFormSpaceImage = document.querySelector("#spaceModifyFormSpaceImage");
// 공간 수정 폼 - 공간 이름 input
const spaceModifyFormSpaceName = document.querySelector("#spaceModifyFormSpaceName");
// 공간 수정 폼 - 인원수 input
const spaceModifyFormPeopleCount = document.querySelector("#spaceModifyFormPeopleCount");
// 공간 수정 폼 - 시작 시간 input
const spaceModifyFormSpaceAvailableStartTime = document.querySelector("#spaceModifyFormSpaceAvailableStartTime");
// 공간 수정 폼 - 종료 시간 input
const spaceModifyFormSpaceAvailableEndTime = document.querySelector("#spaceModifyFormSpaceAvailableEndTime");
// 공간 수정 폼 - 초기화 버튼
const spaceModifyFormResetBtn = document.querySelector("#spaceModifyFormResetBtn");
// 공간 수정 폼 - 수정 버튼
const spaceModifyFormSubmitBtn = document.querySelector("#spaceModifyFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 공간 삭제 모달 닫기 버튼
const spaceDeleteModalCloseBtn = document.querySelector("#spaceDeleteModalCloseBtn");

// ------------------------------------------------------------------------------------------------
// 공간 목록 tbody
const spaceTbody = document.querySelector("#spaceTbody");
// 공간 목록 페이징
const spacePaginationContainer = document.querySelector("#spacePaginationContainer");
// 현재 페이지
let spaceCurrentPage;

// ------------------------------------------------------------------------------------------------
// getter
// 현재 페이지 get
export function getSpaceCurrentPage() {
    return spaceCurrentPage;
}
// setter
// 현재 페이지 set
export function setSpaceCurrentPage(page) {
    spaceCurrentPage = page;
}
