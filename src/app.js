const feed = document.querySelector('.feed');

fetch('http://localhost:8000/results')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(scrapedData => {
            // const demand = `<h3>Demand is ${scrapedData.demand}</h3>`;
            // const capacity = `<h3>Capacity is ${scrapedData.capacity}</h3>`;
            const output = `<h3>${scrapedData}</h3>`;
            feed.insertAdjacentHTML("beforeend", scrapedData);
        })
    })
    .catch(err => console.log(err))