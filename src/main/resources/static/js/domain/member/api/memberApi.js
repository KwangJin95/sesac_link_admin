// 아이디 중복 확인
export async function checkId(id) {
    const result = await axios.post(`/api/member/check-id`, null, {
        params: {id: id}
    });
    return result.data;
}

// 이메일 중복 확인
export async function checkEmail(email) {
    const result = await axios.post(`/api/member/check-email`, null, {
        params: {email: email}
    });
    return result.data;
}

// 이메일 인증 코드
export async function sendEmailVerifyCode(email) {
    const result = await axios.post(`/api/email/send-code`, null, {
        params: {email: email}
    });
    return result.data;
}

// 아이디, 이메일 매칭 여부 확인
export async function checkIdWithEmail(id, email) {
    const result = await axios.post(`/api/member/check-id-email`, null, {
        params: {
            id: id,
            email: email
        }
    });
    return result.data;
}

// 비밀번호 중복 확인
export async function checkPw(adminNo, pw) {
    const result = await axios.post(`/api/member/check-pw`, null, {
        params: {
            adminNo: adminNo,
            pw: pw
        }
    });
    return result.data;
}

// 운영진 권한 목록 가져오기
export async function getAdminAuthList() {
    const result = await axios.get(`/api/member/admin-auth`);
    return result.data;
}

// 학생 권한 목록 가져오기
export async function getUserAuthList() {
    const result = await axios.get(`/api/member/user-auth`);
    return result.data;
}

// 잡코디 목록 가져오기
export async function getJobCoordinatorListByCampusNo(campusNo) {
    const result = await axios.get(`/api/member/job-coordinator`, {
        params: {
            campusNo: campusNo
        }
    });
    return result.data;
}
// PRE_ADMIN 목록(페이징) 가져오기
export async function getPreAdminPageResponseDTO(page, statusType, searchType, keyword) {
    const result = await axios.get(`/api/member/pre-admin`, {
        params: {
            page: page,
            statusType: statusType,
            searchType: searchType,
            keyword: keyword
        }
    });
    return result.data;
}
// ADMIN 목록(페이징) 가져오기
export async function getAdminPageResponseDTO(page, authType, searchType, keyword) {
    const result = await axios.get(`/api/member/admin`, {
        params: {
            page: page,
            authType: authType,
            searchType: searchType,
            keyword: keyword
        }
    });
    return result.data;
}
// PRE_USER 목록(페이징) 가져오기
export async function getPreUserPageResponseDTO(page, statusType, searchType, keyword) {
    const result = await axios.get(`/api/member/pre-user`, {
        params: {
            page: page,
            statusType: statusType,
            searchType: searchType,
            keyword: keyword
        }
    });
    return result.data;
}
// USER 목록(페이징) 가져오기
export async function getUserPageResponseDTO(page, courseNo, searchType, keyword) {
    const result = await axios.get(`/api/member/user`, {
        params: {
            page: page,
            courseNo: courseNo,
            searchType: searchType,
            keyword: keyword
        }
    });
    return result.data;
}