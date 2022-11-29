var repo = require('./api/services/repo');
const cron = require('cron');
console.log('Before job instantiation');
const job = new cron.CronJob('*/5 * * * * *', function() {
	const telegramList = repo.telegramGet();
});

// const job2 = cron.CronJob('*/8 * * * * *', function() {
	// const d = new Date();
	// console.log('Second:', d);
// });
console.log('After job instantiation');
job.start();
// job2.start();