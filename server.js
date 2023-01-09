const tele = require('./teleapi');
const express = require('express');
const { JobCheck, URL, SetMainURL } = require('./cronjob.js');

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000

// tele.connect();
JobCheck();
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
    return  res.status(200).json({data: URL });
});

app.get('/domain/sub', async () => {
    try{
        if(URL == null || URL == "")
        {
            return res.status(200).json({msg: "URL main is Empty", data: null });
        }
        let res = await axios.get(URL + '/domain');
        return res.status(200).json({msg: "success", data: res });
    }
    catch(e)
    {
        return res.status(200).json({msg: "error", data: null });
    }
});

app.post('/fixData', async (req, res)  => {
    let data = req.body;
    try
    {
       //take here
    }
    catch(error)
    {
        console.log("/fixData|ERROR|", error);
    }
    return res.message(200).json({ success: true });
});

