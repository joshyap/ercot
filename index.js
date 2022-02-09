// https://www.ercot.com/content/cdr/html/real_time_system_conditions.html
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const app = express();
const url = 'https://www.ercot.com/content/cdr/html/real_time_system_conditions.html';
app.use(cors());
app.use(express.static("src"))

// const path = require('path');


// app.METHOD(PATH, HANDLER)
app.get('/', function(req, res) {
    // res.json('This is my webscraper');
    res.sendFile('index.html', { root: '.' })
});

app.get('/results', (req, res) => {
    axios(url)
    .then(response => {
        const html = response.data;        
        const $ = cheerio.load(html);

        const demand = $('.tdLeft').filter(function() {
            return $(this).text().trim() === 'Actual System Demand';
        }).next().text();        

        const capacity = $('.tdLeft').filter(function() {
            return $(this).text().trim() === 'Total System Capacity (not including Ancillary Services)';
        }).next().text();

        
        const scrapedData = [];
        scrapedData.push({
            demand,
            capacity
        })

        res.json(scrapedData);
    }).catch(err => console.log(err));
});


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));