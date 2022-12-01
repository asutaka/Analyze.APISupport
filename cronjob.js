const mysql = require('mysql')
const db = require('./api/db')
const cron = require('cron');
const tele = require('./teleapi')

module.exports = {
	telegram: function(){
		console.log('Before job instantiation');
		const job = new cron.CronJob('*/5 * * * * *', function() {
			let sql = 'SELECT * FROM Telegram WHERE status = 0 order by id asc limit 5'
			db.query(sql, (err, response) => {
				if (err)
				{
					console.log("|ERROR(Get List Telegram)| %o", err)
					return;
				} 
				var arr = [];
				response.forEach(element => {
					try
					{
						var phone = arr.find(x => x == element.phone)
						if(phone == null)
						{
							arr.push(element.phone)
						}
						else
						{
							console.log('exists');
						}
						console.log(element.message);
						//tele.sendMessage(element.phone, element.message);
					}
					catch(error)
					{
						console.log(element, error);
					}
				})
				arr = [];
			})
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

