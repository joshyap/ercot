const demandLocation = document.querySelector('#demand');
const capacityLocation = document.querySelector('#capacity');
const timeLocation = document.querySelector('#time');
const gifLocation = document.querySelector('#gif');

const bad = '<iframe src="https://giphy.com/embed/NTur7XlVDUdqM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/trump-consequences-NTur7XlVDUdqM">via GIPHY</a></p>';
const good = '<iframe src="https://giphy.com/embed/zjJm5UpTf9jry" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/zjJm5UpTf9jry">via GIPHY</a></p>';


const update = () => {
    const now = new Date();
    timeLocation.innerHTML = `${now.getHours()}:${now.getMinutes()} - ${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`;

    // fetch('http://localhost:8000/results')
    fetch('https://ercot.herokuapp.com/results')
    .then(response => {return response.json()})
    .then(data => {
        // console.log(data);
        data.forEach(result => {
            const demand = `<h2>demand: ${data[0].demand}</h2>`;
            const capacity = `<h2>capacity: ${data[0].capacity}</h2>`;
            demandLocation.innerHTML = demand;
            capacityLocation.innerHTML = capacity;

            if (`${data[0].demand} < ${data[0].capacity}`) {                
                gifLocation.innerHTML = good;
            } else {                
                gifLocation.innerHTML = bad;
            }  
        })
    })
    .catch(err => console.log(err))

  
}


update();
setInterval(update, 1000);