const cron = require("cron");
const tele = require('./teleapi');
const axios = require("axios");

let MAINURL = "";

module.exports = {
    URL: MAINURL,
    SetMainURL: (url) => {
        MAINURL = url;
    },
    JobCheck: async () => {
        new cron.CronJob('0/10 * * * * *', async () => {
            console.log("START", MAINURL);
            if(MAINURL == null || MAINURL == "")
            {
                //send telegram
                try
                {
                    console.log("[ERROR] MainURL is null");
                    // tele.sendMessage('+84582208920', "[ERROR] MainURL is null");
                }
                catch(error)
                {
                    console.log("TelegramController|ERROR(SendMessage)|",data.phone, data.message, error);
                }
                return;
            }
        
            try
            {
                await axios.get(MAINURL + '/');
            }
            catch(e)
            {
                console.log("[ERROR] host MainURL not working");
                // tele.sendMessage('+84582208920', "[ERROR] host MainURL not working");
                return;
            }

            try
            {
                var res = await axios.get(MAINURL + '/domain');
                res.data.forEach(element => {
                    try{
                        axios.get(element.name + '/');
                    }
                    catch(ex)
                    {
                        console.log("[ERROR] host " + element.name + " not working");
                        // tele.sendMessage('+84582208920', ""[ERROR] host " + element.name + " not working"");
                    }
                });
            }
            catch(e)
            {
                console.log("[ERROR] host /domain not working");
                // tele.sendMessage('+84582208920', "[ERROR] host /domain not working");
                return;
            }
        }).start();
    }
}
