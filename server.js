const tele = require('./teleapi');
const express = require('express');
const axios = require("axios");
const { JobCheck, URLM, SUBM, FixData, SetMainURL } = require('./cronjob.js');

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000

// tele.connect();
JobCheck();
FixData();
app.listen(port)
console.log('RESTful API server started on: ' + port)

app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world" });
});

app.post('/telegram', async (req, res)  => {
    let data = req.body;
    try
    {
        tele.sendMessage(data.phone, data.message);
    }
    catch(error)
    {
        console.log("TelegramController|ERROR(SendMessage)|",data.phone, data.message, error);
    }
    return res.status(200).json({ success: true });
});

app.post('/domain/main', async (req, res)  => {
    let data = req.body;
    try
    {
        SetMainURL(data.url);
    }
    catch(error)
    {
        console.log("/domain/mainURL|",data.url, error);
    }
    return res.status(200).json({ success: true });
});

app.get('/domain/main', function(req, res) {
    URLM((dat) => {
        return  res.status(200).json({ data : dat });
    });
});

app.get('/domain/sub', async (req, res) => {
    SUBM((data) => {
        return  res.status(200).json({ data });
    });
});


