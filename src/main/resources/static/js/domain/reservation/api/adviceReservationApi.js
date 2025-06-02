// 상담 예약 목록(일별)
export async function getAdviceReservationListDaily(jobAdminNo, resDate, statusName) {
    const result = await axios.get(`/api/reservation/advice/daily`, {
        params: {
            jobAdminNo: jobAdminNo,
            resDate: resDate,
            statusName: statusName
        }
    });
    return result.data;
}

// 상담 예약 목록(기간별)
export async function getAdviceReservationListPeriod(jobAdminNo, startDate, endDate, statusName) {
    const result = await axios.get(`/api/reservation/advice/period`, {
        params: {
            jobAdminNo: jobAdminNo,
            startDate: startDate,
            endDate: endDate,
            statusName: statusName
        }
    });
    return result.data;
}