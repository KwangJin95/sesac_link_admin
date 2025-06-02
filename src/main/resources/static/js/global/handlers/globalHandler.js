// 페이지네이션 랜더링
export function renderPagination(data, container, setCurrentPage) {
    if (!data.pageNumList || data.pageNumList.length === 0) {
        document.querySelector(container).innerHTML = '';
        return;
    }
    let str = `
        <div class="mt-6 flex justify-center text-sm">
            <div class="inline-flex">
    `;
    // 이전 버튼
    if (data.prev) {
        str += `
            <a href="#" data-page="${data.prevPage}"
               class="px-3 py-2 border border-gray-300 rounded-l-md bg-white font-medium text-gray-700 hover:bg-gray-50 page-link">
               &lt;
            </a>
        `;
    }
    // 페이지 번호 버튼
    data.pageNumList.forEach(pageNum => {
        const isActive = pageNum === data.current;
        str += `
            <a href="#" data-page="${pageNum}"
               class="px-3 py-2 border border-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'bg-white font-medium text-gray-700 hover:bg-gray-50'} page-link">
               ${pageNum}
            </a>
        `;
    });
    // 다음 버튼
    if (data.next) {
        str += `
            <a href="#" data-page="${data.nextPage}"
               class="px-3 py-2 border border-gray-300 rounded-r-md bg-white font-medium text-gray-700 hover:bg-gray-50 page-link">
               &gt;
            </a>
        `;
    }
    str += `
            </div>
        </div>
    `;

    setCurrentPage(data.current);

    document.querySelector(container).innerHTML = str;
}

// 페이징 버튼 click
export async function onPaginationContainerClick(event, loadList) {
    event.preventDefault();

    if (event.target.classList.contains("page-link")) {
        await loadList(event.target.getAttribute("data-page"));
    }
}