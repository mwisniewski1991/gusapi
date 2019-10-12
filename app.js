const express = require('express');
const fetch = require('node-fetch');

const app = express();

//CREATE APP 
app.listen(3000, () => console.log("Listening on PORT 3000"));
app.use(express.static('dist'));
app.use(express.json({limit: '1mb'}));


const dataSource = {
    population: {
        apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/72305?format=json&unit-level=2&page-size=100'
    },
    area: {
        apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/2018?format=json&unit-level=2&page-size=100'
    },
    cars: {
        apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/32561?format=json&unit-level=2&page-size=100'
    },
    highways: {
        apiURL: 'https://bdl.stat.gov.pl/api/v1/data/by-variable/453823?format=json&unit-level=2&page-size=100'
        //P1722
    }
}

//REQUEST GET
app.get('/gusapi/:cat', async (req, res) => {

    //PARAMETER SAY WHICH DATA SHOULD BE DOWNLOAD
    const cat = req.params.cat;
    const url = dataSource[cat].apiURL;

    const response = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'X-ClientId': '1a7ec620-12ad-4092-9b61-08d6b5ef3084'
    }})
    const data = await response.json()

    console.log("SEND DATA")
    //SEND DATA TO FRONT
    res.json(data);
});


//STRUKTURA GUS API
// K > G > P > variable  


// app.get('/test', async (req, res) => {

//     console.log("sending data")

//     const testData = {
//         test: "working"
//     }
    
//     res.json(testData);

// });