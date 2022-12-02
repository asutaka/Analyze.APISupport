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
			var arr = [];
			var strSuccess = "";
			var strError = "";
			let sql = 'SELECT * FROM Telegram WHERE status = 0 order by id asc limit 5'
			db.query(sql, async (err, response) => {
				if (err)
				{
					console.log("CronJob|ERROR(Get List Telegram)| %o", err)
					return;
				} 
				
				response.forEach(async (element) => {
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
						
						//Push
						strSuccess = strSuccess + element.id + ',';
						console.log(strSuccess);
					}
					catch(error)
					{
						console.log("CronJob|ERROR(SendMessage)|",element, error);
						//Push
						strError = strError + element.id + ',';
					}
				})
			})
			arr = [];
			// console.log(strSuccess);
			// //success
			// var successLength = strSuccess.length;
			// if(successLength > 0){
				// try
				// {
					// //delete record
					// let sqlDelete = "DELETE FROM Telegram WHERE id IN (" + strSuccess.substring(0, strSuccess.length - 1) + ")"
					
					// db.query(sqlDelete, (err,[], response) => {
						// if (err)
						// {
							// console.log("CronJob|ERROR(response Delete)|", err);
						// } 
						// console.log(element, response);
					// })
				// }
				// catch(error)
				// {
					// console.log("CronJob|ERROR(Delete Record)|",element, error);
				// }
			// }
			// strSuccess = "";
			// //error
			// var errorLength = strError.length;
			// if(strError > 0){
				// try
				// {
					// //update record
					// let sqlUpdate = "UPDATE Telegram SET status = 2 WHERE id IN (" + strError.substring(0, strError.length - 1) + ")"
					
					// db.query(sqlUpdate, (err,[], response) => {
						// if (err)
						// {
							// console.log("CronJob|ERROR(response Delete)|", err);
						// } 
						// console.log(element, response);
					// })
				// }
				// catch(error)
				// {
					// console.log("CronJob|ERROR(Delete Record)|",element, error);
				// }
			// }
			// strError = "";
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

