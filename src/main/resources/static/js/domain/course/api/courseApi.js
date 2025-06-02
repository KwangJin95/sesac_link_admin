// 캠퍼스별 강좌 목록 조회
export async function getCourseListByCampusNo(campusNo) {
    const result = await axios.get(`/api/course/campus`, {
        params: {
            campusNo: campusNo
        }
    });
    return result.data;
}

// 회원 등록 강좌 목록 조회
export async function getCourseListByUserNo(userNo) {
    const result = await axios.get(`/api/course/user`, {
        params: {
            userNo: userNo
        }
    });
    return result.data;
}

// 새싹 회원 등록 강좌 목록 조회
export async function getCourseListByEmail(email) {
    const result = await axios.get(`/api/course/email`, {
        params: {
            email: email
        }
    });
    return result.data;
}

// 강좌 반환
export async function getCourseByCourseNo(courseNo) {
    const result = await axios.get(`/api/course`, {
        params: {
            courseNo: courseNo
        }
    });
    return result.data;
}
