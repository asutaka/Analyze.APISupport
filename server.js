const tele = require('./teleapi');
const express = require('express')
const app = express();
app.use(express.json());
const port = process.env.PORT || 8000

tele.connect();
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(port)

console.log('RESTful API server started on: ' + port)

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
    return res.message(200).json({ success: true });
})


