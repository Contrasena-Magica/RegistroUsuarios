document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndRenderChart();
});

function fetchDataAndRenderChart() {
    fetch('http://localhost:4000/data')
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
                label: 'Casos',
                data: dataCases,
                backgroundColor: [ 'red ', 'brown', 'yellow', 'blue', 'green' ],
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
                    text: 'Casos registrados de Covid por continente (millones)'
                }
            }
        }
    });

    // Verifica si ya existe un gráfico y destrúyelo
    if (window.myChart) {
        window.myChart.destroy();
    }
    // Crea el gráfico y almacénalo globalmente
    window.myChart = new Chart(ctx, config);
};