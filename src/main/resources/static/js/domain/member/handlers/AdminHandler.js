import {
    showElement, hideElement,
    enableButton, disableButton, showAlertMessage
} from "../../../global/util/utils.js";

import {
    checkId,
    checkEmail,
    getPreAdminPageResponseDTO, getAdminPageResponseDTO, getPreUserPageResponseDTO, getUserPageResponseDTO
} from "../api/memberApi.js";

import {
    getPhonePattern,
    getEmailPattern
} from "../utils/memberUtil.js";

import {
    getCourseByCourseNo,
    getCourseListByCampusNo,
    getCourseListByEmail,
    getCourseListByUserNo
} from "../../course/api/courseApi.js";

import {
    getCampusList
} from "../../campus/api/campusApi.js";

import {
    renderPagination
} from "../../../global/handlers/globalHandler.js";

import {
    getPreAdminCurrentPage,
    setPreAdminCurrentPage
} from "../pre-admin.js";

import {
    sendFormData
} from "../../../global/api/defaultApi.js";
import {
    setIdChecked,
    setEmailDuplicatedChecked,
    isIdChecked,
    isEmailDuplicatedChecked,
    setAdminCurrentPage,
    getAdminCurrentPage
} from "../admin.js";

import {setPreUserCurrentPage} from "../pre-user.js";
import {setUserCurrentPage} from "../user.js";

// PRE_ADMIN 목록 load
export async function loadPreAdminList(page) {

    const statusType = document.querySelector("#preAdminStatusType").selectedOptions[0].value;
    const searchType = document.querySelector("#preAdminSearchType").selectedOptions[0].value;
    const keyword           = document.querySelector("#preAdminKeyword").value;

    // PRE_ADMIN 목록 pageResponseDTO
    let pageResponseDTO = await getPreAdminPageResponseDTO(page, statusType, searchType, keyword);

    // PRE_ADMIN 목록 list
    let preAdminList = pageResponseDTO.dtoList;

    // PRE_ADMIN 목록 랜더링
    renderPreAdminTable(preAdminList);
    // 페이지네이션 랜더링
    renderPagination(pageResponseDTO, "#preAdminPaginationContainer", setPreAdminCurrentPage);
}

// PRE_USER 목록 load
export async function loadPreUserList(page) {

    const statusType = document.querySelector("#preUserStatusType").selectedOptions[0].value;
    const searchType = document.querySelector("#preUserSearchType").selectedOptions[0].value;
    const keyword           = document.querySelector("#preUserKeyword").value;

    // PRE_USER 목록 pageResponseDTO
    let pageResponseDTO = await getPreUserPageResponseDTO(page, statusType, searchType, keyword);

    // PRE_USER 목록 list
    let preUserList = pageResponseDTO.dtoList;

    // PRE_USER 목록 랜더링
    renderPreUserTable(preUserList);
    // 페이지네이션 랜더링
    renderPagination(pageResponseDTO, "#preUserPaginationContainer", setPreUserCurrentPage);
}

// PRE_ADMIN 목록 랜더링
export function renderPreAdminTable(preAdminList) {
    let str = "";

    const authName = document.querySelector("#preAdminTbody").dataset.authName;

    if (preAdminList.length === 0) {
        str += `<tr><td colspan="6" class="py-4 px-4 text-center text-gray-500">회원 정보가 없습니다.</td></tr>`;
    } else {
        preAdminList.forEach(preAdmin => {
            str += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="py-1 px-1 text-center border border-gray-300">${preAdmin.id}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preAdmin.name}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preAdmin.email}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preAdmin.regDate}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preAdmin.memberStatusNameKor}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">
                        <div class="flex justify-center">
                            <button class="adminGetBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    data-admin-no="${preAdmin.adminNo}"
                                    data-name="${preAdmin.name}"
                                    data-email="${preAdmin.email}">
                                가져오기
                            </button>
                        </div>
                    </td>
            `;
            str += `</tr>`;
        });
    }
    document.querySelector("#preAdminTbody").innerHTML = str;
}

// PRE_USER 목록 랜더링
export function renderPreUserTable(preUserList) {
    let str = "";

    const authName = document.querySelector("#preUserTbody").dataset.authName;

    if (preUserList.length === 0) {
        str += `<tr><td colspan="6" class="py-4 px-4 text-center text-gray-500">회원 정보가 없습니다.</td></tr>`;
    } else {
        preUserList.forEach(preUser => {
            str += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="py-1 px-1 text-center border border-gray-300">${preUser.id}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preUser.name}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preUser.email}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preUser.regDate}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${preUser.memberStatusNameKor}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">
                        <div class="flex justify-center">
                            <button class="userGetBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    data-user-no="${preUser.userNo}"
                                    data-name="${preUser.name}"
                                    data-email="${preUser.email}">
                                가져오기
                            </button>
                        </div>
                    </td>
            `;
            str += `</tr>`;
        });
    }
    document.querySelector("#preUserTbody").innerHTML = str;
}

// 검색 초기화 버튼 클릭 이벤트 핸들러
export function onSearchResetBtnClick(event, form, loadList) {
    event.preventDefault();

    // 폼 초기화
    document.querySelector(form).reset();

    // 목록 생성
    loadList();
}

// 예비 운영진 가져오기 버튼 click 이벤트 핸들러
export async function onPreAdminTbodyClick(event) {
    // 예비 운영진 가져오기 버튼 click 이벤트
    if (event.target.classList.contains("adminGetBtn")) {
        const adminGetBtn = event.target;

        const adminNo = adminGetBtn.dataset.adminNo;
        const name    = adminGetBtn.dataset.name;
        const email   = adminGetBtn.dataset.email;

        const adminGetForm = document.querySelector("#adminGetForm");

        adminGetForm.adminNo.value = adminNo;
        adminGetForm.name.value = name;
        adminGetForm.email.value = email;

        showElement("#adminGetModal");
    }
}

// 예비 학생 가져오기 버튼 click 이벤트 핸들러
export async function onPreUserTbodyClick(event) {
    // 예비 학생 가져오기 버튼 click 이벤트
    if (event.target.classList.contains("userGetBtn")) {
        const userGetBtn = event.target;

        const userNo = userGetBtn.dataset.userNo;
        const name = userGetBtn.dataset.name;
        const email = userGetBtn.dataset.email;

        const userGetForm = document.querySelector("#userGetForm");

        userGetForm.userNo.value = userNo;
        userGetForm.name.value = name;
        userGetForm.email.value = email;

        showElement("#userGetModal");
    }
}

// 예비 운영진 가져오기 폼 - 가져오기 버튼 click 이벤트 핸들러
export async function onAdminGetFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const adminGetForm = document.querySelector("#adminGetForm");

    // 예비 운영진 가져오기
    const result = await sendFormData("/api/member/pre-admin",
        "PUT",
        adminGetForm);
    const message = await result.text();

    // 예비 운영진 가져오기 모달 닫기
    hideElement("#adminGetModal");

    // 폼 초기화
    adminGetForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // 예비 운영진 목록
    await loadPreAdminList();
}

// 예비 학생 가져오기 폼 - 가져오기 버튼 click 이벤트 핸들러
export async function onUserGetFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const userGetForm = document.querySelector("#userGetForm");

    // 예비 운영진 가져오기
    const result = await sendFormData("/api/member/pre-user",
        "PUT",
        userGetForm);
    const message = await result.text();

    // 예비 학생 가져오기 모달 닫기
    hideElement("#userGetModal");

    // 폼 초기화
    userGetForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // 예비 학생 목록
    await loadPreUserList();
}

// ADMIN, JOB_COORDINATOR 수정하기 버튼 click 이벤트 핸들러
export async function onAdminTbodyClick(event) {
    // 수정하기 버튼 click 이벤트
    if (event.target.classList.contains("adminModifyBtn")) {
        const adminModifyBtn = event.target;

        const adminNo           = adminModifyBtn.dataset.adminNo;
        const id                = adminModifyBtn.dataset.id;
        const email             = adminModifyBtn.dataset.email;
        const profileThumbnail  = adminModifyBtn.dataset.profileThumbnail;
        const name              = adminModifyBtn.dataset.name;
        const phone             = adminModifyBtn.dataset.phone;
        const adminAuthNo       = adminModifyBtn.dataset.adminAuthNo;

        const adminModifyForm = document.querySelector("#adminModifyForm");

        adminModifyForm.adminNo.value        = adminNo;
        adminModifyForm.elements["id"].value = id;
        adminModifyForm.email.value          = email;
        adminModifyForm.name.value           = name;
        adminModifyForm.phone.value          = phone;
        adminModifyForm.adminAuthNo.value    = adminAuthNo;

        const adminModifyFormImageContainer
            = document.querySelector("#adminModifyFormImageContainer");
        adminModifyFormImageContainer.innerHTML
            = '<img src="/api/member/view/' + profileThumbnail + '" class="w-full h-full rounded-full object-cover" />';

        showElement("#adminModifyModal");
    }

    // 강제 탈퇴 버튼 click 이벤트
    if (event.target.classList.contains("adminDeleteBtn")) {
        const adminDeleteBtn = event.target;

        const adminNo = adminDeleteBtn.dataset.adminNo;
        const authNameKor = adminDeleteBtn.dataset.authNameKor;
        const name = adminDeleteBtn.dataset.name;

        const adminDeleteForm = document.querySelector("#adminDeleteForm");

        adminDeleteForm.adminNo.value = adminNo;

        document.querySelector("#adminDeleteAuthNameKor").innerHTML = authNameKor;
        document.querySelector("#adminDeleteName").innerHTML = name;

        showElement("#adminDeleteModal");
    }
}

// USER 목록 - 회원수정, 강좌수정, 강제탈퇴 버튼 click 이벤트 핸들러
export async function onUserTbodyClick(event) {
    // 회원하기 버튼 click 이벤트
    if (event.target.classList.contains("userModifyBtn")) {

        const userModifyBtn = event.target;

        const userNo = userModifyBtn.dataset.userNo;
        const id = userModifyBtn.dataset.id;
        const email = userModifyBtn.dataset.email;
        const name = userModifyBtn.dataset.name;
        const phone = userModifyBtn.dataset.phone;
        const address = userModifyBtn.dataset.address;
        const detailAddress = userModifyBtn.dataset.detailAddress;
        const profileThumbnail = userModifyBtn.dataset.profileThumbnail;
        const adminNo = userModifyBtn.dataset.adminNo;

        const userModifyForm = document.querySelector("#userModifyForm");

        userModifyForm.userNo.value = userNo;
        userModifyForm.elements["id"].value = id;
        userModifyForm.email.value = email;
        userModifyForm.name.value = name;
        userModifyForm.phone.value = phone;
        userModifyForm.address.value = address;
        userModifyForm.detailAddress.value = detailAddress;
        userModifyForm.adminNo.value = adminNo;

        const userModifyFormImageContainer
            = document.querySelector("#userModifyFormImageContainer");
        userModifyFormImageContainer.innerHTML
            = '<img src="/api/member/view/' + profileThumbnail + '" class="w-full h-full rounded-full object-cover" />';

        showElement("#userModifyModal");
    }
    // 강좌수정 버튼 click 이벤트
    if (event.target.classList.contains("courseModifyBtn")) {
        const courseModifyBtn = event.target;

        const userNo = courseModifyBtn.dataset.userNo;
        const name = courseModifyBtn.dataset.name;
        const email = courseModifyBtn.dataset.email;

        const courseModifyForm = document.querySelector("#courseModifyForm");

        courseModifyForm.userNo.value = userNo;
        courseModifyForm.name.value = name;

        // SeSAC에 등록된 강좌 목록
        let registeredSesacCourseList;

        try {
            registeredSesacCourseList = await getCourseListByEmail(email);
        } catch (e) {
            console.log(e);
        }

        let sesacCourseListTbody = "";

        if (registeredSesacCourseList == null || registeredSesacCourseList == "") {
            sesacCourseListTbody += '<tr class="hover:bg-gray-50">';
            sesacCourseListTbody += '<td colSpan="2" class="py-4 px-4 text-center text-gray-500">강좌 정보가 없습니다.</td>';
            sesacCourseListTbody += '</tr>';
        } else {
            registeredSesacCourseList.forEach(course => {
                sesacCourseListTbody += '<tr class="hover:bg-gray-50 border-b">';

                sesacCourseListTbody += '<td class="py-1 px-1 text-center border border-gray-300">';
                sesacCourseListTbody += course.teacher;
                sesacCourseListTbody += '</td>';

                sesacCourseListTbody += '<td class="py-1 px-1 text-center border border-gray-300">';
                sesacCourseListTbody += course.courseName;
                sesacCourseListTbody += '</td>';

                sesacCourseListTbody += '</tr>';
            });
        }

        // 등록된 강좌 목록
        let registeredCourseList;

        try {
            registeredCourseList = await getCourseListByUserNo(userNo);
        } catch (e) {
            console.log(e);
        }

        let courseListTbody = "";

        if (registeredCourseList == null || registeredCourseList == "") {
            courseListTbody += '<tr class="hover:bg-gray-50">';
            courseListTbody += '<td colSpan="3" class="py-4 px-4 text-center text-gray-500">강좌 정보가 없습니다.</td>';
            courseListTbody += '</tr>';
        } else {
            registeredCourseList.forEach(course => {
                courseListTbody += '<tr class="hover:bg-gray-50 border-b">';

                courseListTbody += '<td class="py-1 px-1 text-center border border-gray-300 ">';
                courseListTbody += '<input type="checkbox" value="' + course.courseNo + '" name="courseNoToBeDeleted">';
                courseListTbody += '</td>';

                courseListTbody += '<td class="py-1 px-1 text-center border border-gray-300">';
                courseListTbody += course.teacher;
                courseListTbody += '</td>';

                courseListTbody += '<td class="py-1 px-1 text-center border border-gray-300">';
                courseListTbody += course.courseName;
                courseListTbody += '</td>';

                courseListTbody += '</tr>';
            });
        }
        document.querySelector("#courseModifyModalRegisteredSesacCourseList").innerHTML = sesacCourseListTbody;

        document.querySelector("#courseModifyModalRegisteredCourseList").innerHTML = courseListTbody;

        document.querySelector("#courseModifyFormNewCourseList").innerHTML = "";

        await onCampusSelectChange("#courseModifyFormCampusSelect", "#courseModifyFormCourseSelect");

        showElement("#courseModifyModal");
    }

    // 강제 탈퇴 버튼 클릭 이벤트 핸들러
    if (event.target.classList.contains("userDeleteBtn")) {
        event.preventDefault();

        const userDeleteBtn = event.target;

        const userNo = userDeleteBtn.dataset.userNo;
        const name = userDeleteBtn.dataset.name;

        const userDeleteForm = document.querySelector("#userDeleteForm");

        userDeleteForm.userNo.value = userNo;

        document.querySelector("#userDeleteName").innerHTML = name;

        showElement("#userDeleteModal");
    }


}
// ADMIN, JOB_COORDINATOR 목록 load
export async function loadAdminList(page) {

    const authType   = document.querySelector("#adminAuthType").selectedOptions[0].value;
    const searchType = document.querySelector("#adminSearchType").selectedOptions[0].value;
    const keyword           = document.querySelector("#adminKeyword").value;

    // ADMIN, JOB_COORDINATOR 목록 pageResponseDTO
    let pageResponseDTO = await getAdminPageResponseDTO(page, authType, searchType, keyword);

    // ADMIN, JOB_COORDINATOR 목록 list
    let adminList = pageResponseDTO.dtoList;

    // ADMIN, JOB_COORDINATOR 목록 랜더링
    renderAdminTable(adminList);
    // 페이지네이션 랜더링
    renderPagination(pageResponseDTO, "#adminPaginationContainer", setAdminCurrentPage);
}

// USER 목록 load
export async function loadUserList(page) {

    const courseNo   = document.querySelector("#courseSelect").selectedOptions[0].value;
    const searchType = document.querySelector("#userSearchType").selectedOptions[0].value;
    const keyword           = document.querySelector("#userKeyword").value;

    // USER 목록 pageResponseDTO
    let pageResponseDTO = await getUserPageResponseDTO(page, courseNo, searchType, keyword);

    // USER 목록 list
    let userList = pageResponseDTO.dtoList;

    // USER 목록 랜더링
    renderUserTable(userList);
    // 페이지네이션 랜더링
    renderPagination(pageResponseDTO, "#userPaginationContainer", setUserCurrentPage);
}

// ADMIN, JOB_COORDINATOR 목록 랜더링
export function renderAdminTable(adminList) {
    let str = "";

    const authName = document.querySelector("#adminTbody").dataset.authName;

    if (!adminList || adminList.length === 0) {
        const colspan = (authName === 'SUPER_ADMIN') ? 8 : 5;
        str += `<tr><td colspan="${colspan}" class="py-4 px-4 text-center text-gray-500">회원 정보가 없습니다.</td></tr>`;
    } else {
        adminList.forEach(admin => {
            str += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.authNameKor}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.id}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.name}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.phone}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.email}</td>
            `;
            // SUPER_ADMIN 권한일 때만 수정/삭제 버튼 추가
            if (authName === 'SUPER_ADMIN') {
                str += `
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.regDate}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${admin.modDate}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-2">
                        <button class="adminModifyBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                data-admin-no="${admin.adminNo}"
                                data-profile-thumbnail="${admin.profileThumbnail}"
                                data-id="${admin.id}"
                                data-email="${admin.email}"
                                data-name="${admin.name}"
                                data-phone="${admin.phone}"
                                data-admin-auth-no="${admin.adminAuthNo}"
                        >
                            수정하기
                        </button>
                        <button class="adminDeleteBtn px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                data-admin-no="${admin.adminNo}"
                                data-name="${admin.name}"
                                data-auth-name-kor="${admin.authNameKor}">
                            강제 탈퇴
                        </button>
                    </div>
                    </td> 
                `;
            }
            str += `</tr>`;
        });
    }
    document.querySelector("#adminTbody").innerHTML = str;
}

// USER 목록 랜더링
export function renderUserTable(userList) {
    let str = "";

    const authName = document.querySelector("#userTbody").dataset.authName;

    if (userList.length === 0) {
        const colspan = (authName === 'SUPER_ADMIN') ? 10 : 9;
        str += `<tr><td colspan="${colspan}" class="py-4 px-4 text-center text-gray-500">회원 정보가 없습니다.</td></tr>`;
    } else {
        userList.forEach(user => {
            str += `
                <tr class="hover:bg-gray-50 border-b">
                    <td class="py-1 px-1 text-center border border-gray-300">${user.id}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.name}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.phone}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.email}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.address} ${user.detailAddress}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.courseList != null ? user.courseList[0].courseName : ''}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.jobCoordinatorName != null ? user.jobCoordinatorName : ''}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.regDate}</td>
                    <td class="py-1 px-1 text-center border border-gray-300">${user.modDate}</td>
            `;
            // SUPER_ADMIN 권한일 때만 수정/삭제 버튼 추가
            if (authName === 'SUPER_ADMIN') {
                str += `
                    <td class="py-1 px-1 text-center border border-gray-300">
                    <div class="flex justify-center space-x-2">
                        <button class="userModifyBtn px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            data-user-no="${user.userNo}"
                            data-id="${user.id}"
                            data-email="${user.email}"
                            data-name="${user.name}"
                            data-phone="${user.phone}"
                            data-address="${user.address}"
                            data-detail-address="${user.detailAddress}"
                            data-profile-thumbnail="${user.profileThumbnail}"
                            data-admin-no="${user.adminNo}"
                            data-campus-no="${user.campusNo}"
                            data-user-auth-no="${user.userAuthNo}">
                            회원 수정
                        </button>
                        <button class="courseModifyBtn px-1 py-1 text-xs bg-black text-white rounded hover:bg-black"
                            data-user-no="${user.userNo}"
                            data-email="${user.email}"
                            data-name="${user.name}">
                            강좌 수정
                        </button>
                        <button class="userDeleteBtn px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            data-user-no="${user.userNo}"
                            data-name="${user.name}">
                            강제 탈퇴
                        </button>
                    </div>
                    </td> 
                `;
            }
            str += `</tr>`;
        });
    }
    document.querySelector("#userTbody").innerHTML = str;
}






// 모달 닫기 이벤트 핸들러
export function onWindowClick(event, modal, form) {
   if (event.target === document.querySelector(modal)) {
       hideElement(modal);

       // 폼 초기화
       document.querySelector(form).reset();
   }

   // 운영진 수정하기 모달
   if (event.target === document.querySelector("#adminModifyModal")) {
       hideElement("#adminModifyFormNameInputMsg");
       hideElement("#adminModifyFormPhoneInputMsg");
       hideElement("#adminModifyFormPhoneCheckMsg");
   }

   // 운영진 등록 모달
   if (event.target === document.querySelector("#adminRegisterModal")) {
       hideElement("#adminRegisterFormIdInputMsg");
       hideElement("#adminRegisterFormIdCheckMsg");
       hideElement("#adminRegisterFormPwInputMsg");
       hideElement("#adminRegisterFormNameInputMsg");
       hideElement("#adminRegisterFormPhoneInputMsg");
       hideElement("#adminRegisterFormPhoneCheckMsg");
       hideElement("#adminRegisterFormEmailInputMsg");
       hideElement("#adminRegisterFormEmailCheckMsg");
       hideElement("#adminRegisterFormEmailDuplicatedCheckMsg");

       setIdChecked(false);
       setEmailDuplicatedChecked(false);

       enableButton(document.querySelector("#adminIdDuplicatedCheckBtn"), "중복 확인");
       enableButton(document.querySelector("#adminEmailDuplicatedCheckBtn"), "중복 확인");
   }
   
   // 학생 정보 수정 모달
   if (event.target === document.querySelector("#userModifyModal")) {
       hideElement("#userModifyFormNameInputMsg");
       hideElement("#userModifyFormPhoneInputMsg");
       hideElement("#userModifyFormPhoneCheckMsg");
       hideElement("#userModifyFormDetailAddressInputMsg");
   }
}

// 운영진 수정 모달 닫기 버튼 클릭 이벤트 핸들러
export function onAdminModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#adminModifyFormNameInputMsg");
    hideElement("#adminModifyFormPhoneInputMsg");
    hideElement("#adminModifyFormPhoneCheckMsg");
}

// 운영진 등록 모달 닫기 버튼 클릭 이벤트 핸들러
export function onAdminRegisterModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();
    
    hideElement("#adminRegisterFormIdInputMsg");
    hideElement("#adminRegisterFormIdCheckMsg");
    hideElement("#adminRegisterFormPwInputMsg");
    hideElement("#adminRegisterFormNameInputMsg");
    hideElement("#adminRegisterFormPhoneInputMsg");
    hideElement("#adminRegisterFormPhoneCheckMsg");
    hideElement("#adminRegisterFormEmailInputMsg");
    hideElement("#adminRegisterFormEmailCheckMsg");
    hideElement("#adminRegisterFormEmailDuplicatedCheckMsg");

    setIdChecked(false);
    setEmailDuplicatedChecked(false);

    enableButton(document.querySelector("#adminIdDuplicatedCheckBtn"), "중복 확인");
    enableButton(document.querySelector("#adminEmailDuplicatedCheckBtn"), "중복 확인");
}

// 모달 닫기 버튼 클릭 이벤트 핸들러
export function onModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement(modal);
}

// 학생 정보 수정 모달 닫기 버튼 클릭 이벤트 핸들러
export function onUserModifyModalCloseBtnClick(event, modal, form) {
    event.preventDefault();

    hideElement(modal);

    // 폼 초기화
    document.querySelector(form).reset();

    hideElement("#userModifyFormNameInputMsg");
    hideElement("#userModifyFormPhoneInputMsg");
    hideElement("#userModifyFormPhoneCheckMsg");
    hideElement("#userModifyFormDetailAddressInputMsg");
}


// ADMIN, JOB_COORDINATOR 등록 버튼 클릭 이벤트 핸들러
export function onAdminRegisterBtnClick(event) {
    event.preventDefault();
    event.stopPropagation();

    showElement("#adminRegisterModal");
}
// 아이디 입력 이벤트 핸들러
export function onIdInput (event, inputMsg, checkMsg) {
    // id input
    const idInput = event.target;
    // id 중복 확인 버튼
    const adminIdDuplicatedCheckBtn = document.querySelector("#adminIdDuplicatedCheckBtn");

    // 아이디 중복 확인 메시지 숨김
    hideElement(checkMsg);

    // 아이디 중복 확인 여부
    setIdChecked(false);

    // 아이디 중복 확인 버튼 활성화
    enableButton(adminIdDuplicatedCheckBtn, "중복 확인");

    // 아이디 입력값 확인 후 입력 메시지 출력
    if (idInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 아이디 중복 확인 버튼 클릭 이벤트 핸들러
export function onAdminIdDuplicatedCheckBtnClick (event, inputMsg, checkMsg) {
    event.preventDefault()

    const idInput = document.querySelector("#adminRegisterFormId");

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
// 비밀번호 입력 이벤트 핸들러
export function onPwInput(event, inputMsg) {
    // 비밀번호 input
    const pwInput = event.target;

    // 비밀번호 입력값 확인 후 입력 메시지 출력
    if (pwInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 이름 입력 이벤트 핸들러
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
// 주소 입력 이벤트 핸들러
export function onAddressInput(event, inputMsg) {
    // 주소 input
    const addressInput = event.target;

    // 주소 입력값 확인 후 입력 메시지 출력
    if (addressInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }
}
// 상세 주소 입력 이벤트 핸들러
export function onDetailAddressInput(event, inputMsg) {
    // 상세 주소 input
    const detailAddressInput = event.target;

    // 이름 입력값 확인 후 입력 메시지 출력
    if (detailAddressInput.value.trim() == "") {
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
        showElement(checkMsg)
    } else {
        hideElement(checkMsg)
    }
}
// 이메일 입력 및 정규식 검증 이벤트 핸들러
export function onEmailInput(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    // 이메일 input
    const emailInput = event.target;
    const adminEmailDuplicatedCheckBtn = document.querySelector("#adminEmailDuplicatedCheckBtn");

    // 이메일 입력값 확인 후 입력 메시지 출력
    if (emailInput.value.trim() == "") {
        showElement(inputMsg);
    } else {
        hideElement(inputMsg);
    }

    // 이메일 중복 체크 메시지 숨김
    hideElement(duplicatedCheckMsg);

    // 이메일 중복 확인 여부
    setEmailDuplicatedChecked(false);

    // 중복 확인 버튼 활성화
    enableButton(adminEmailDuplicatedCheckBtn, "중복 확인");

    // 이메일 정규식 검증
    if (!getEmailPattern().test(emailInput.value.trim())) {
        showElement(checkMsg);
    } else {
        hideElement(checkMsg);
    }
}
// 이메일 중복 확인 버튼 클릭 이벤트 핸들러
export function onAdminEmailDuplicatedCheckBtnClick(event, inputMsg, checkMsg, duplicatedCheckMsg) {
    event.preventDefault()
    // 이메일 input
    const emailInput = document.querySelector("#adminRegisterFormEmail");

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
// ADMIN, JOB_COORDINATOR 등록 폼 - 등록하기 버튼 클릭 이벤트 핸들러
export async function onAdminRegisterFormSubmitBtnClick(event) {
    event.preventDefault();
    event.stopPropagation();

    // form data
    const adminRegisterForm = document.querySelector("#adminRegisterForm");
    const idInput = document.querySelector("#adminRegisterFormId");
    const pwInput = document.querySelector("#adminRegisterFormPw");
    const nameInput = document.querySelector("#adminRegisterFormName");
    const phoneInput = document.querySelector("#adminRegisterFormPhone");
    const emailInput = document.querySelector("#adminRegisterFormEmail");

    // 아이디 입력값 없음
    if (idInput.value.trim() == "") {
        idInput.focus();
        showElement("#adminRegisterFormIdInputMsg");
        return false;
    }
    // 아이디 중복 확인 여부
    if (isIdChecked() === false) {
        idInput.focus();
        showElement("#adminRegisterFormIdCheckMsg");
        return;
    }
    // 비밀번호 입력값 없음
    if (pwInput.value.trim() == "") {
        pwInput.focus();
        showElement("#adminRegisterFormPwInputMsg");
        return false;
    }
    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#adminRegisterFormNameInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#adminRegisterFormPhoneInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 검증 확인
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        phoneInput.focus();
        showElement("#adminRegisterFormPhoneCheckMsg");
        return false;
    }
    // 이메일 입력값 없음
    if (emailInput.value.trim() == "") {
        emailInput.focus();
        showElement("#adminRegisterFormEmailInputMsg");
        return;
    }
    // 이메일 입력값 검증 확인
    if (!getEmailPattern().test(emailInput.value.trim())) {
        emailInput.focus();
        showElement("#adminRegisterFormEmailCheckMsg");
        return;
    }
    // 이메일 중복 확인 여부
    if (isEmailDuplicatedChecked() === false) {
        emailInput.focus();
        showElement("#adminRegisterFormEmailDuplicatedCheckMsg");
        return;
    }

    // 등록하기
    const result = await sendFormData("/api/member/admin",
        "POST",
        adminRegisterForm);
    const message = await result.text();

    // 예비 운영진 가져오기 모달 닫기
    hideElement("#adminRegisterModal");

    // 폼 초기화
    adminRegisterForm.reset();
    setIdChecked(false);
    setEmailDuplicatedChecked(false);
    enableButton(document.querySelector("#adminIdDuplicatedCheckBtn"), "중복 확인");
    enableButton(document.querySelector("#adminEmailDuplicatedCheckBtn"), "중복 확인");

    // 알림 메시지
    showAlertMessage(message);

    // 예비 운영진 목록
    await loadAdminList();
}

// ADMIN, JOB_COORDINATOR 수정하기 폼 - 수정하기 버튼 클릭 이벤트 핸들러
export async function onAdminModifyFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const adminModifyForm = document.querySelector("#adminModifyForm");
    const nameInput = document.querySelector("#adminModifyFormName");
    const phoneInput = document.querySelector("#adminModifyFormPhone");

    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#adminModifyFormNameInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#adminModifyFormPhoneInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 검증 확인 여부
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        phoneInput.focus();
        showElement("#adminModifyFormPhoneCheckMsg");
        return false;
    }

    // 수정하기
    const result = await sendFormData("/api/member/admin",
        "PUT",
        adminModifyForm);
    const message = await result.text();

    // 수정하기 모달 닫기
    hideElement("#adminModifyModal");

    // 폼 초기화
    adminModifyForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // 운영진 목록
    await loadAdminList();
}

// ADMIN, JOB_COORDINATOR 강제 탈퇴 폼 - 탈퇴 시키기 버튼 click 이벤트 핸들러
export async function onAdminDeleteFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const adminDeleteForm = document.querySelector("#adminDeleteForm");

    // 탈퇴 시키기
    const result = await sendFormData("/api/member/admin",
        "DELETE",
        adminDeleteForm);
    const message = await result.text();

    // 탈퇴 모달 닫기
    hideElement("#adminDeleteModal");

    // 폼 초기화
    adminDeleteForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // 운영진 목록
    await loadAdminList();
}

// ADMIN, JOB_COORDINATOR 강제 탈퇴 폼 - 탈퇴 시키기 버튼 click 이벤트 핸들러
export async function onUserDeleteFormSubmitBtnClick(event) {
    event.preventDefault();

    // form data
    const userDeleteForm = document.querySelector("#userDeleteForm");

    // 탈퇴 시키기
    const result = await sendFormData("/api/member/user",
        "DELETE",
        userDeleteForm);
    const message = await result.text();

    // 탈퇴 모달 닫기
    hideElement("#userDeleteModal");

    // 폼 초기화
    userDeleteForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // USER 목록
    await loadUserList();
}

// USER 회원수정 폼 - 수정하기 버튼 클릭 이벤트 핸들러
export async function onUserModifyFormSubmitBtnClick(event) {
    event.preventDefault();
    event.stopPropagation();

    // form data
    const userModifyForm = document.querySelector("#userModifyForm");
    const nameInput = document.querySelector("#userModifyFormName");
    const phoneInput = document.querySelector("#userModifyFormPhone");
    const addressInput = document.querySelector("#userModifyFormAddress");
    const detailAddressInput = document.querySelector("#userModifyFormDetailAddress");
    const adminNo = document.querySelector("#userModifyFormAdminNoSelect");

    // 이름 입력값 없음
    if (nameInput.value.trim() == "") {
        nameInput.focus();
        showElement("#userModifyFormNameInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 없음
    if (phoneInput.value.trim() == "") {
        phoneInput.focus();
        showElement("#userModifyFormPhoneInputMsg");
        return false;
    }
    // 핸드폰 번호 입력값 검증 확인 여부
    if (!getPhonePattern().test(phoneInput.value.trim())) {
        phoneInput.focus();
        showElement("#userModifyFormPhoneCheckMsg");
        return false;
    }
    // 상세 주소 입력값 없음
    if (detailAddressInput.value.trim() == "") {
        detailAddressInput.focus();
        showElement("#userModifyFormDetailAddressInputMsg");
        return false;
    }

    // 수정하기
    const result = await sendFormData("/api/member/user",
        "PUT",
        userModifyForm);
    const message = await result.text();

    // 수정하기 모달 닫기
    hideElement("#userModifyModal");

    // 폼 초기화
    userModifyForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // USER 목록
    await loadUserList();
}

// 캠퍼스 목록 set
export async function setCampusList(element) {
    // 캠퍼스 목록
    let campusList;

    try {
        campusList = await getCampusList();
    } catch (e) {
        console.log(e);
    }

    let campusSelectOption = "";

    // 캠퍼스 목록 option 표시
    campusList.forEach((campus) => {
        campusSelectOption +=
            "<option value='" + campus.campusNo + "'>" +
                campus.campusName +
            "</option>";
    });

    document.querySelector(element).innerHTML = campusSelectOption;
}
// 강좌 수정 모달 - 강좌 등록 버튼 이벤트 핸들러
export async function onCourseModifyFormCourseRegisterBtnClick(event) {
    event.preventDefault();

    // 강좌 select
    const courseModifyFormCourseSelect = document.querySelector("#courseModifyFormCourseSelect");
    // 강좌 select 안 된 경우
    if (courseModifyFormCourseSelect.value.trim() == "") {
        return false;
    }

    const courseModifyForm = document.querySelector("#courseModifyForm");

    // 강좌 번호
    let newCourseNo = courseModifyForm.newCourseNo.value;
    // 등록할 강좌
    let newCourse;

    try {
        newCourse = await getCourseByCourseNo(newCourseNo);
    } catch (e) {
        console.log(e);
    }

    // 등록될 강좌 목록
    let courseListToBeRegistered = document.querySelectorAll('input[name="courseNoToBeRegistered"]');

    if (courseListToBeRegistered.length > 0) {
        for (const course of courseListToBeRegistered) {
            if (course.value == newCourse.courseNo) {
                return false; // 중복된 값이 있으면 false 반환
            }
        }
    }

    let tbody = "";

    tbody += '<tr class="hover:bg-gray-50 border-b">';

    tbody += '<td class="py-1 px-1 text-center border border-gray-300">';
    tbody +=    '<input type="checkbox" name="courseNoToBeRegistered" value="' + newCourse.courseNo + '" checked>';
    tbody += '</td>';

    tbody += '<td class="py-1 px-1 text-center border border-gray-300">';
    tbody +=    newCourse.teacher;
    tbody += '</td>';

    tbody += '<td class="py-1 px-1 border border-gray-300">';
    tbody +=    newCourse.courseName;
    tbody += '</td>';

    tbody += '</tr>';

    document.querySelector("#courseModifyFormNewCourseList").insertAdjacentHTML('beforeend', tbody);
}
// 강좌 수정 모달 - 수정하기 click 이벤트
export async function onCourseModifyFormSubmitBtnClick(event) {
    event.preventDefault();

    // 강좌 수정 폼
    const courseModifyForm = document.querySelector("#courseModifyForm");

    // 삭제할 강좌 목록
    let courseListToBeDeleted = document.querySelectorAll('input[name="courseNoToBeDeleted"]');
    
    // 등록할 강좌 목록
    let courseListToBeRegistered = document.querySelectorAll('input[name="courseNoToBeRegistered"]');

    // 삭제 및 등록할 강좌 check 여부
    let checked = false;

    // 삭제 및 등록할 강좌가 하나도 없는 경우
    if ((courseListToBeDeleted == null || courseListToBeDeleted.length < 1) &&
        (courseListToBeRegistered == null || courseListToBeRegistered.length < 1)) {
        return false;
    } else {
        for (const course of courseListToBeDeleted) {
            if (course.checked) {
                checked = true;
            }
        }
        for (const course of courseListToBeRegistered) {
            if (course.checked) {
                checked = true;
            }
        }
    }

    // 삭제 및 등록할 강좌로 check 된게 없는 경우
    if (!checked)
        return false;

    // 수정하기
    const result = await sendFormData("/api/member/user-course",
        "PUT",
        courseModifyForm);
    const message = await result.text();

    // 수정하기 모달 닫기
    hideElement("#courseModifyModal");

    // 폼 초기화
    courseModifyForm.reset();

    // 알림 메시지
    showAlertMessage(message);

    // USER 목록
    await loadUserList();
}
// 강좌 수정 모달 - 캠퍼스 change 이벤트
export async function onCampusSelectChange(target, element) {

    let campusNo = document.querySelector(target).value;

    // 캠퍼스별 강좌 목록
    let courseList;

    try {
        courseList = await getCourseListByCampusNo(campusNo);
    } catch (e) {
        console.log(e);
    }

    let courseSelectOption = "";

    // 캠퍼스 목록 option 표시
    courseList.forEach((course) => {
        courseSelectOption +=
            "<option value='" + course.courseNo + "'>" +
                course.courseName +
            "</option>";
    });
    document.querySelector(element).innerHTML = courseSelectOption;
}



