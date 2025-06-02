// 공간 예약 목록(일별)
export async function getSpaceReservationListDaily(spaceNo, resDate, statusName) {
    const result = await axios.get(`/api/reservation/space/daily`, {
        params: {
            spaceNo: spaceNo,
            resDate: resDate,
            statusName: statusName
        }
    });
    return result.data;
}

// 공간 예약 목록(기간별)
export async function getSpaceReservationListPeriod(spaceNo, startDate, endDate, statusName) {
    const result = await axios.get(`/api/reservation/space/period`, {
        params: {
            spaceNo: spaceNo,
            startDate: startDate,
            endDate: endDate,
            statusName: statusName
        }
    });
    return result.data;
}