const mysql = require('mysql')
const db = require('./api/db')
const cron = require('cron');
const tele = require('./teleapi')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	telegram: async () => {
		await tele.connect();
		console.log('Before job instantiation');
		const job = new cron.CronJob('*/5 * * * * *', function(){
			storeGet(async (callback) => {
				if(callback == null)
					return;
				
				var arr = [];
				var strSuccess = "";
				var strError = "";
				for(const element of callback){   				
				   try
					{
						var phone = arr.find(x => x == element.phone)
						if(phone == null)
						{
							arr.push(element.phone)
						}
						else
						{
							await sleep(500);
						}
						await tele.sendMessage(element.phone, element.message);
						strSuccess = strSuccess + "'" + element.id + "',";
					}
					catch(error)
					{
						console.log("CronJob|ERROR(SendMessage)|",element, error);
						//Push
						strError = strError + element.id + ',';
					}
				}
				//success
				if(strSuccess.length > 0){
					try
					{
						//delete record
						let sqlDelete = "DELETE FROM Telegram WHERE id IN (" + strSuccess.substring(0, strSuccess.length - 1) + ")"
						db.query(sqlDelete, (err, response) => {
							if (err)
							{
								console.log('here');
								console.log("CronJob|ERROR(response Delete)|", err.stack);
							} 
						})
					}
					catch(error)
					{
						console.log("CronJob|ERROR(Delete Record)|",element, error.stack);
					}
				}
				
				//error
				if(strError.length > 0){
					try
					{
						//update record
						let sqlUpdate = "UPDATE Telegram SET status = 2 WHERE id IN (" + strError.substring(0, strError.length - 1) + ")"
						
						db.query(sqlUpdate, (err, response) => {
							if (err)
							{
								console.log("CronJob|ERROR(response Delete)|", err);
							} 
						})
					}
					catch(error)
					{
						console.log("CronJob|ERROR(Delete Record)|",element, error);
					}
				}
			});
		});

		// const job2 = cron.CronJob('*/8 * * * * *', function() {
			// const d = new Date();
			// console.log('Second:', d);
		// });
		console.log('After job instantiation');
		job.start();
		// job2.start();
	}
}

function storeGet(callback)
{
	let sql = 'SELECT * FROM Telegram WHERE status = 0 order by id asc limit 5'
	db.query(sql, async (err, response) => {
		if (err)
		{
			console.log("CronJob|ERROR(Get List Telegram)| %o", err)
			return callback(null);
		} 
		
		if(response.length > 0){
			return callback(response);
		}
		
		return callback(null);
	})
}