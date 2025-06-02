import {
    onWindowClick,
    onModalCloseBtnClick,
    onSearchResetBtnClick,
    loadPreAdminList,
    onPreAdminTbodyClick,
    onAdminGetFormSubmitBtnClick
} from "./handlers/AdminHandler.js";

import {
    onPaginationContainerClick
} from "../../global/handlers/globalHandler.js";

document.addEventListener("DOMContentLoaded", async function () {

    // init
    if (preAdminPaginationContainer != null) {
        // 예비 운영진 목록 load
        await loadPreAdminList();
        // 페이징
        preAdminPaginationContainer.addEventListener("click", (event) => {
            onPaginationContainerClick(event, loadPreAdminList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // 검색
    // 상태 select change 이벤트
    if (preAdminStatusType != null) {
        preAdminStatusType.addEventListener("change", () => {
            loadPreAdminList();
        });
    }
    // 검색 select change 이벤트
    if (preAdminSearchType != null) {
        preAdminSearchType.addEventListener("change", () => {
            loadPreAdminList();
        });
    }
    // 검색 버튼 click 이벤트
    if (preAdminSearchSubmitBtn !=   null) {
        preAdminSearchSubmitBtn.addEventListener("click", () => {
            loadPreAdminList();
        });
    }
    // 검색 form submit 이벤트
    if (preAdminSearchForm != null) {
        preAdminSearchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            loadPreAdminList();
        });
    }
    // 검색 초기화 버튼 click 이벤트
    if (preAdminSearchResetBtn != null) {
        preAdminSearchResetBtn.addEventListener("click", (event) => {
            const form = "#preAdminSearchForm";
            onSearchResetBtnClick(event, form, loadPreAdminList);
        });
    }

    // ------------------------------------------------------------------------------------------------
    // PRE_ADMIN 가져오기
    // PRE_ADMIN 가져오기 모달 닫기 이벤트
    window.addEventListener("click", (event) => {
        const modal = "#adminGetModal";
        const form = "#adminGetForm";
        onWindowClick(event, modal, form);
    });
    // PRE_ADMIN 가져오기 모달 닫기 이벤트
    if (adminGetModalCloseBtn != null) {
        adminGetModalCloseBtn.addEventListener("click", (event) => {
            const modal = "#adminGetModal";
            const form = "#adminGetForm";
            onModalCloseBtnClick(event, modal, form);
        });
    }
    // PRE_ADMIN 목록 - 가져오기 버튼 click 이벤트
    if (preAdminTbody != null) {
        preAdminTbody.addEventListener("click", onPreAdminTbodyClick);
    }
    // PRE_ADMIN 가져오기 폼 - 가져오기 버튼 click 이벤트
    if (adminGetFormSubmitBtn != null) {
        adminGetFormSubmitBtn.addEventListener("click", onAdminGetFormSubmitBtnClick);
    }
});

// ------------------------------------------------------------------------------------------------
// PRE_ADMIN 목록 tbody
const preAdminTbody = document.querySelector("#preAdminTbody");

// ------------------------------------------------------------------------------------------------
// 검색 form
const preAdminSearchForm = document.querySelector("#preAdminSearchForm");
// 검색 조건 select
const preAdminSearchType = document.querySelector("#preAdminSearchType");
// 상태 select
const preAdminStatusType = document.querySelector("#preAdminStatusType");
// 검색 버튼
const preAdminSearchSubmitBtn = document.querySelector("#preAdminSearchSubmitBtn");
// 검색 초기화 버튼
const preAdminSearchResetBtn = document.querySelector("#preAdminSearchResetBtn");

// ------------------------------------------------------------------------------------------------
// 가져오기 모달 닫기 버튼
const adminGetModalCloseBtn = document.querySelector("#adminGetModalCloseBtn");
// 예비 운영진 가져오기 - 가져오기 버튼
const adminGetFormSubmitBtn = document.querySelector("#adminGetFormSubmitBtn");

// ------------------------------------------------------------------------------------------------
// 페이징
const preAdminPaginationContainer = document.querySelector("#preAdminPaginationContainer");
// 현재 페이지
let preAdminCurrentPage;
// ------------------------------------------------------------------------------------------------
// getter
// 현재 페이지 get
export function getPreAdminCurrentPage() {
    return preAdminCurrentPage;
}
// setter
// 현재 페이지 set
export function setPreAdminCurrentPage(page) {
    preAdminCurrentPage = page;
}