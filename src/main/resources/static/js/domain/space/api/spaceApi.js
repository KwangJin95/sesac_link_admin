// 공간 목록(페이징)
export async function getSpacePageResponseDTO(page) {
    const result = await axios.get(`/api/space`, {
        params: {
            page: page,
        }
    });
    return result.data;
}


