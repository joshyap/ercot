const feed = document.querySelector('.feed');

fetch('http://localhost:8000/results')
    .then(response => {return response.json()})
    .then(data => {
        console.log(`demand is ${data.demand}`);
        console.log(`capacity is ${data.capcity}`);
    })
    .catch(err => console.log(err))