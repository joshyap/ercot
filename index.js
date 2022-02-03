// https://www.ercot.com/content/cdr/html/real_time_system_conditions.html
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const PORT = 8000;

const app = express();
const url = 'https://www.ercot.com/content/cdr/html/real_time_system_conditions.html';
app.use(cors());



// app.METHOD(PATH, HANDLER)
app.get('/', function(req, res) {
    res.json('This is my webscraper');
});

app.get('/results', (req, res) => {
    axios(url)
    .then(response => {
        const html = response.data;        
        const $ = cheerio.load(html);


        const demand = $('.tdLeft').filter(function() {
            return $(this).text().trim() === 'Actual System Demand';
        }).next().text();
        // console.log(`demand is ${demand}`);

        const capacity = $('.tdLeft').filter(function() {
            return $(this).text().trim() === 'Total System Capacity (not including Ancillary Services)';
        }).next().text();
        // console.log(`capacity is ${capcity}`);

        // const scrapedData = {
        //     demand: demand,
        //     capcity: capacity
        // }

        const scrapedData = [];
        scrapedData.push(demand);
        scrapedData.push(capacity);

        res.json(scrapedData);
        // res.json(capacity);
    });
});

// axios(url)
//     .then(response => {
//         const html = response.data;        
//         const $ = cheerio.load(html);


//         const demand = $('.tdLeft').filter(function() {
//             return $(this).text().trim() === 'Actual System Demand';
//         }).next().text();
//         console.log(`demand is ${demand}`);

//         const capcity = $('.tdLeft').filter(function() {
//             return $(this).text().trim() === 'Total System Capacity (not including Ancillary Services)';
//         }).next().text();
//         console.log(`capacity is ${capcity}`);
//     });


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));