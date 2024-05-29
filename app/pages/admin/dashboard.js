fetch('/dashboarddata')
    .then(response => response.json())
    .then(data =>{
        const h3Element = document.getElementById('dataDisplay');
        console.log(data.total_investment);
        h3Element.innerText = data.total_investment;
    })
    .catch(error => console.error(error));