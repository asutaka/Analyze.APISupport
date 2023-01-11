const cron = require("cron");
const tele = require('./teleapi');
const axios = require("axios");
const { response } = require("express");

let MAINURL = "";
let strInterval = "15m";

module.exports = {
    URLM: (callback) =>{
        return callback(MAINURL);
    },
    SUBM: async (callback) => {
        try{
            if(MAINURL == null || MAINURL == "")
            {
                return callback({msg: "URL main is Empty", data: null });
            }
            let result = await axios.get(MAINURL + '/domain');
            return callback({msg: "success", data: result.data.data });
        }
        catch(e)
        {
            return callback({msg: "error", data: null });
        }
    },
    SetMainURL: (url) => {
        MAINURL = url;
    },
    JobCheck: async () => {
        // new cron.CronJob('0/20 * * * * *', async () => {
        //     if(MAINURL == null || MAINURL == "")
        //     {
        //         //send telegram
        //         try
        //         {
        //             console.log("[ERROR] MainURL is null");
        //             // tele.sendMessage('+84582208920', "[ERROR] MainURL is null");
        //         }
        //         catch(error)
        //         {
        //             console.log("TelegramController|ERROR(SendMessage)|",data.phone, data.message, error);
        //         }
        //         return;
        //     }
        
        //     try
        //     {
        //         await axios.get(MAINURL + '/');
        //     }
        //     catch(e)
        //     {
        //         console.log("[ERROR] host MainURL not working");
        //         // tele.sendMessage('+84582208920', "[ERROR] host MainURL not working");
        //         return;
        //     }

        //     try
        //     {
        //         var res = await axios.get(MAINURL + '/domain');
        //         res.data.data.forEach(async element => {
        //             try{
        //                 await axios.get(element.name + '/');
        //             }
        //             catch(ex)
        //             {
        //                 console.log("[ERROR] host " + element.name + " not working");
        //                 // tele.sendMessage('+84582208920', ""[ERROR] host " + element.name + " not working"");
        //             }
        //         });
        //     }
        //     catch(e)
        //     {
        //         console.log("[ERROR] host /domain not working");
        //         // tele.sendMessage('+84582208920', "[ERROR] host /domain not working");
        //         return;
        //     }
        // }).start();
    },
    FixData: async () => {
        new cron.CronJob('20 5 0/3 * * *', async () => {
            if(MAINURL == null || MAINURL == "")
            {
                console.log("[ERROR] NOT FIXDATA MainURL is null");
                return;
            }
        
            try
            {
                await axios.get(MAINURL + '/');
            }
            catch(e)
            {
                console.log("[ERROR] NOT FIXDATA host MainURL not working");
                // tele.sendMessage('+84582208920', "[ERROR] host MainURL not working");
                return;
            }

            try
            {
                var resFlag = await axios.get(MAINURL + '/flag');
                if(resFlag.data.data == false)
                    return;

                var resCollection = await axios.get(MAINURL + '/collection');
                let arr = resCollection.data.data.filter(element => element.name.includes(strInterval)).map(e => e.name);
                var resTime = await axios.get(MAINURL + '/time/1h');
                var time = resTime.data.data;
                const sleep = ms =>
                new Promise(res => {
                    setTimeout(res, ms)
                })

                const myPromise = num =>
                sleep(10000).then(async () => {
                    axios.get(MAINURL + '/last/' + num).then(async (res) => {
                        if(res.data.data.length > 0){
                            var lastTime = res.data.data[0].T;
                            if(time > lastTime)
                            {
                                //bổ sung bản ghi call từ Binance
                                try{
                                    let arrInsert = [];
                                    var symbol = num.replace("_" + strInterval,"").toUpperCase();
                                    var updateTime = (new Date()).getTime();
                                    axios.get("https://api3.binance.com/api/v3/klines?symbol=" + symbol + "&interval=1h&limit=50").then(async (response) => {
                                        response.data.forEach((item) => {
                                            if(item[0] > lastTime){
                                                //
                                                arrInsert.push({T: item[0], C: item[4], O: item[1], H: item[2], L: item[3], V: item[5], Q: item[7], UT: updateTime, State: true});
                                            }
                                        }); 
                                        if(arrInsert.length == 0)
                                            return;
                                        var model = { table: num, arr:  arrInsert}
                                        var resInsert = await axios.post(MAINURL + "/addMultiRecord", model);
                                        console.log("resInsert", resInsert.data);
                                    });
                                }
                                catch(ex)
                                {
                                    console.log("[ERROR] NOT FIXDATA symbol " + num + " not working");
                                    // tele.sendMessage('+84582208920', ""[ERROR] host " + element.name + " not working"");
                                }
                            }
                        }
                    });
                })

                const forEachSeries = async (iterable, action) => {
                    for (const x of iterable) {
                        await action(x)
                    }
                }

                forEachSeries(arr, myPromise)
                .then(() => {
                    console.log('all done!')
                })
            }
            catch(e)
            {
                console.log("[ERROR] NOT FIXDATA host /domain not working");
                // tele.sendMessage('+84582208920', "[ERROR] host /domain not working");
                return;
            }
        }).start();
    }
}
