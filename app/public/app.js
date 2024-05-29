document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndRenderChart();
});

function fetchDataAndRenderChart() {
    fetch('/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => renderChart(data))
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function renderChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = data.map(item => item.continent);
    const dataCases = data.map(item => item.total_cases);

    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'COVID-19 Cases by Continent',
                data: dataCases,
                backgroundColor: [
                    'red', 'blue', 'yellow', 'green', 'purple', 'orange'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'COVID-19 Cases by Continent'
                }
            }
        }
    });
}
