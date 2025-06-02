// 캠퍼스별 강좌 목록 조회
export async function getCampusList() {
    const result = await axios.get(`/api/campus`);
    return result.data;
}
