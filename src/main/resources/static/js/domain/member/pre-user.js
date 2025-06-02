import {
    onSearchResetBtnClick,
    onWindowClick,
    onModalCloseBtnClick,
    loadPreUserList,
    onPreUserTbodyClick,
    onUserGetFormSubmitBtnClick
} from "./handlers/AdminHandler.js";

import {
    onPaginationContainerClick
} from "../../global/handlers/globalHandler.js";

document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (preUserPaginationContainer != null) {
        // PRE_USER 목록 load
        await loadPreUserList();
        // 페이징
        preUserPaginationContainer.addEventListener("click", (event) => {
            onPaginationContainerClick(event, loadPreUserList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 상태 select change 이벤트
    if (preUserStatusType != null) {
        preUserStatusType.addEventListener("change", () => {
            loadPreUserList();
        });
    }
    // 검색 select change 이벤트
    if (preUserSearchType != null) {
        preUserSearchType.addEventListener("change", () => {
            loadPreUserList();
        });
    }
    // 검색 버튼 click 이벤트
    if (preUserSearchSubmitBtn !=   null) {
        preUserSearchSubmitBtn.addEventListener("click", () => {
            loadPreUserList();
        });
    }
    // 검색 form submit 이벤트
    if (preUserSearchForm != null) {
        preUserSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            loadPreUserList();
        });
    }
    // 검색 초기화 버튼 클릭 이벤트
    if (preUserSearchResetBtn != null) {
        preUserSearchResetBtn.addEventListener("click", (event) => {
            const form = "#preUserSearchForm";
            onSearchResetBtnClick(event, form, loadPreUserList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // PRE_USER 가져오기
    // PRE_USER 가져오기 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#userGetModal";
        const form = "#userGetForm";
        onWindowClick(event, modal, form);
    });
    // PRE_USER 가져오기 모달 닫기 이벤트
    if (userGetModalCloseBtn != null) {
        userGetModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#userGetModal";
            const form = "#userGetForm";
            onModalCloseBtnClick(event, modal, form);
        });
    }
    // PRE_USER 목록 - 가져오기 버튼 click 이벤트
    if (preUserTbody != null) {
        preUserTbody.addEventListener("click", onPreUserTbodyClick);
    }
    // PRE_USER 가져오기 폼 - 가져오기 버튼 click 이벤트
    if (userGetFormSubmitBtn != null) {
        userGetFormSubmitBtn.addEventListener("click", onUserGetFormSubmitBtnClick);
    }

});

// ------------------------------------------------------------------------------------------------
// 검색 form
const preUserSearchForm = document.querySelector("#preUserSearchForm");
// 검색 조건 select
const preUserSearchType = document.querySelector("#preUserSearchType");
// 상태 select
const preUserStatusType = document.querySelector("#preUserStatusType");
// 검색 버튼
const preUserSearchSubmitBtn = document.querySelector("#preUserSearchSubmitBtn");
// 검색 초기화 버튼
const preUserSearchResetBtn = document.querySelector("#preUserSearchResetBtn");
// ------------------------------------------------------------------------------------------------
// 페이징
const preUserPaginationContainer = document.querySelector("#preUserPaginationContainer");
// PRE_USER 목록 tbody
const preUserTbody = document.querySelector("#preUserTbody");
// ------------------------------------------------------------------------------------------------
// 가져오기
// 가져오기 모달 닫기 버튼
const userGetModalCloseBtn = document.querySelector("#userGetModalCloseBtn");
// 예비 운영진 가져오기 - 가져오기 버튼
const userGetFormSubmitBtn = document.querySelector("#userGetFormSubmitBtn");
// ------------------------------------------------------------------------------------------------
// 현재 페이지
let preUserCurrentPage;
// getter
// 현재 페이지 get
export function getPreUserCurrentPage() {
    return preUserCurrentPage;
}
// setter
// 현재 페이지 set
export function setPreUserCurrentPage(page) {
    preUserCurrentPage = page;
}