
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
}


document.addEventListener('DOMContentLoaded', function() {

    const dataCount = 5;
    const data = {
        labels: ['America', 'Africa', 'Asia', 'Europa', 'Oceania'],
        datasets: [{
            label: 'Casos',
            data: [ ' 193.5 ', ' 15 ', ' 310.7 ', ' 229.5 ', ' 39.5 ' ],
            backgroundColor: [ 'red ', 'brown', 'yellow', 'blue', 'green']
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true, 
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Casos registrados de Covid por continente (millones)'
                }
            }
        }
    };

    const ctx = document.getElementById('dummy').getContext('2d');
    // Verifica si ya existe un gráfico y destrúyelo
    if (window.dummyChart) {
        window.dummyChart.destroy();
    }
    // Crea el gráfico y almacénalo globalmente
    window.dummyChart = new Chart(ctx, config);
});

// Función para generar datos aleatorios
function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

// Función para generar colores aleatorios
function generateRandomColors(count) {
    return Array.from({ length: count }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
}
