const mysql = require('mysql')
const db = require('./api/db')
const cron = require('cron');

module.exports = {
	telegram: function(){
		console.log('Before job instantiation');
		const job = new cron.CronJob('*/5 * * * * *', function() {
			let sql = 'SELECT * FROM products order by id desc limit 5'
			db.query(sql, (err, response) => {
				if (err)
				{
					console.log(err)
					return;
				} 
				response.forEach(element => {
					console.log(element.name);
				})
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

