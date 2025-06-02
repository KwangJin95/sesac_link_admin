// 오늘 날짜 로드
export function loadToday(element) {
    const target = document.querySelector(element);

    const today  = new Date();
    const yyyy = today.getFullYear();
    const mm     = String(today.getMonth() + 1).padStart(2, '0'); // 01~12
    const dd     = String(today.getDate()).padStart(2, '0'); // 01~31

    target.value = `${yyyy}-${mm}-${dd}`;
}
// 한 시간 더하기
export function addOneHour(timeStr) {
    let [hour, minute] = timeStr.split(":").map(Number);
    hour = (hour + 1) % 24; // 24시간 형식 유지

    // 두 자리 문자열로 변환
    const newHourStr = hour.toString().padStart(2, "0");
    return `${newHourStr}:${minute.toString().padStart(2, "0")}`;
}
// 하루 더하기
export function addOneDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);

    // 날짜를 yyyy-mm-dd 형식으로 다시 포맷
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// 시간대 라벨을 "09 - 10시" 형식으로 생성
export function getTimeSlots(start, end, intervalMinutes = 60) {
    const times = [];

    let [startHour, startMin] = start.split(':').map(Number);
    let [endHour, endMin] = end.split(':').map(Number);

    let startTime = new Date(0, 0, 0, startHour, startMin);
    const endTime = new Date(0, 0, 0, endHour, endMin);

    while (startTime < endTime) {
        const endSlot = new Date(startTime.getTime() + intervalMinutes * 60000);

        const startHourStr = startTime.getHours().toString().padStart(2, '0');
        const endHourStr = endSlot.getHours().toString().padStart(2, '0');

        const slotLabel = `${startHourStr} - ${endHourStr}시`;
        times.push(slotLabel);

        startTime = endSlot;
    }

    return times;
}
// 각 시간대에 상태별 예약 건수를 집계
export function prepareTimeSlotStatusCounts(list, timeSlots, intervalMinutes = 60) {
    const dataMap = {};

    // 초기화
    timeSlots.forEach(time => {
        dataMap[time] = {
            '승인': 0,
            '요청': 0,
            '거절': 0,
            '취소': 0
        };
    });

    list.forEach(item => {
        const start = new Date(0, 0, 0, ...item.startTime.split(':').map(Number));
        const end = new Date(0, 0, 0, ...item.endTime.split(':').map(Number));

        let current = new Date(start);

        while (current < end) {
            const next = new Date(current.getTime() + intervalMinutes * 60000);

            const startHourStr = current.getHours().toString().padStart(2, '0');
            const endHourStr = next.getHours().toString().padStart(2, '0');
            const slotLabel = `${startHourStr} - ${endHourStr}시`;

            if (dataMap[slotLabel]) {
                dataMap[slotLabel][item.statusNameKor]++;
            }

            current = next;
        }
    });

    return dataMap;
}
// 예약 일별 차트 생성
export function renderStackedReservationChartDaily(dataMap, timeSlots) {

    const canvas = document.querySelector("#reservationStatusChart");
    const ctx = canvas.getContext('2d');

    const datasets = [
        {
            label: "승인",
            backgroundColor: "#3b82f6",
            data: timeSlots.map(t => dataMap[t]["승인"])
        },
        {
            label: "요청",
            backgroundColor: "#000",
            data: timeSlots.map(t => dataMap[t]["요청"])
        },
        {
            label: "거절",
            backgroundColor: "#ef4444",
            data: timeSlots.map(t => dataMap[t]["거절"])
        },
        {
            label: "취소",
            backgroundColor: "#9ca3af",
            data: timeSlots.map(t => dataMap[t]["취소"])
        }
    ];

    // 모든 데이터가 0인지 확인
    const hasData = datasets.some(ds => ds.data.some(value => value !== 0));

    if (!hasData) {
        // 차트 숨기기
        canvas.classList.add("hidden");
        if (window.reservationChart) {
            window.reservationChart.destroy();
            window.reservationChart = null;
        }
        return;
    } else {
        canvas.classList.remove("hidden");
    }

    // 차트 생성
    if (window.reservationChart) {
        window.reservationChart.destroy();
    }

    window.reservationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: timeSlots,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 이 옵션으로 반응형 비율을 조정
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "시간대별 예약 상태"
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    stacked: false,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}
// 예약 기간별 차트 생성
export function renderStackedReservationChartPeriod(dataMap, timeSlots) {
    const canvas = document.getElementById('reservationStatusChart');
    const container = document.getElementById('reservationChartContainer');
    const ctx = canvas.getContext('2d');

    // 날짜별로 데이터셋을 그룹화
    const datasets = [
        {
            label: "승인",
            backgroundColor: "#3b82f6",
            data: timeSlots.map(t => {
                return dataMap[t] && dataMap[t]["승인"] ? dataMap[t]["승인"] : 0;
            })
        },
        {
            label: "요청",
            backgroundColor: "#000",
            data: timeSlots.map(t => {
                return dataMap[t] && dataMap[t]["요청"] ? dataMap[t]["요청"] : 0;
            })
        },
        {
            label: "거절",
            backgroundColor: "#ef4444",
            data: timeSlots.map(t => {
                return dataMap[t] && dataMap[t]["거절"] ? dataMap[t]["거절"] : 0;
            })
        },
        {
            label: "취소",
            backgroundColor: "#9ca3af",
            data: timeSlots.map(t => {
                return dataMap[t] && dataMap[t]["취소"] ? dataMap[t]["취소"] : 0;
            })
        }
    ];

    // 모든 데이터가 0인지 확인
    const hasData = datasets.some(ds => ds.data.some(value => value !== 0));

    if (!hasData) {
        // 차트 숨기기
        canvas.classList.add("hidden");
        container.classList.add("hidden");
        if (window.reservationChart) {
            window.reservationChart.destroy();
            window.reservationChart = null;
        }
        return;
    } else {
        canvas.classList.remove("hidden");
        container.classList.remove("hidden");
    }

    // 차트 생성
    if (window.reservationChart) {
        window.reservationChart.destroy();
    }

    // 날짜 리스트를 생성 (labels)
    const labels = Object.keys(dataMap).sort();  // 날짜 기준으로 정렬

    // 차트 생성
    window.reservationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,  // 날짜별로 그룹화된 레이블
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 이 옵션으로 반응형 비율을 조정
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "시간대별 예약 상태"
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true,
                    stacked: false,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}
