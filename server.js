const express = require('express');
const bodyParser = require('body-parser');

function insertMissingDays(dataList) {
    const existingDates = new Set(dataList.map(item => item.day));
    const startDate = new Date(dataList[0].day);
    const endDate = new Date(dataList[dataList.length - 1].day);
    const result = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toISOString().slice(0, 10);
        if (existingDates.has(formattedDate)) {
            result.push(dataList.find(item => item.day === formattedDate));
        } else {
            const newItem = { day: formattedDate, group: 'high', price: 99999999 };
            result.push(newItem);
        }
    }

    return result;
}

async function getDays(FROM, TO) {
    const headers = {
        "authority": "www.skyscanner.com",
        "path": "/g/search-intent/v1/pricecalendar",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Origin": "https://www.skyscanner.com",
        "Referer": "https://www.skyscanner.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    };
    const url = "https://www.skyscanner.com/g/search-intent/v1/pricecalendar";
    const payload = {
        "headers": {
            "xSkyscannerClient": "banana",
            "xSkyscannerCurrency": "ILS",
            "xSkyscannerLocale": "en-US",
            "xSkyscannerMarket": "IL"
        },
        "originRelevantFlightSkyId": FROM,
        "destinationRelevantFlightSkyId": TO
    };
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });
    const days = await response.json().then(data => data.flights.days);
    return days
}


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/get-dates', async (req, res) => {
    const requestData = req.body;
    const FROM = requestData.from;
    const TO = requestData.to;
    let days = await getDays(FROM, TO);
    days = insertMissingDays(days)
    const tripDuration = parseInt(requestData.duration);
    let minPrice = 999999999;
    let dateToTravel = "";
    let dateToBack = "";
    let toPay = 0;

    for (let i = 0; i < days.length - tripDuration; i++) {
        const price = days[i].price + days[i + tripDuration].price;
        if (price < minPrice) {
            minPrice = price;
            dateToTravel = days[i].day;
            dateToBack = days[i + tripDuration].day;
            toPay = price;
        }
    }

    res.json({"res" : `You have to travel in ${dateToTravel} and to back in ${dateToBack} you may pay ${toPay} ₪`});
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});