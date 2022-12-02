const { Api, TelegramClient } = require('telegram')
const { StringSession } = require('telegram/sessions')
const input = require('input') // npm i input
const db = require('./api/db')

const apiId = 5052850
const apiHash = '7d860f6c17f883764807b7747b906a75'
const stringSession = new StringSession('1BQANOTEuMTA4LjU2LjE1MAG7aHAHIqJNCqyjjvirWul36YB3V9T7r13UM9an0CS6xtMqsTVgtGjzYzwFJ8EWmZh1Rg/0f9D10ZhcPE4lfCgmU7GjJQi31Wt7vCWz8O7AGBCunICHZLNBREziyfO6nfhZpME0LfM1a4pEfkk5qQ7wCV2YTlrn/xDKd2l25JgtyAmL2IX32gT87OPOecNSrQkvjh+bCzFaBxa3LHCwsjm0r9vNaa0JN021HtSWmMOBXt0oq3BjWZ6Cwhuf2W+ILaXm+9Ee7IQnuvyGKREwju48FqKKTp8//hkTx7L7dj9WtirDjSwoITWEkTZPY3znPoPWyAYkviWMgBQ73RvSZYDQQg==29808'); // fill this later with the value from session.save()
const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

module.exports = {
	connect: async () => {
		await client.connect(); // This assumes you have already authenticated with .start()
	},
	sendMessage: async (_phone, _message) => {
		let sql = 'SELECT * FROM TelegramUser WHERE phone = ?'
		var telId = 0;
        db.query(sql, [_phone], (err, response) => {
			if (err)
			{
				console.log("TeleAPI|ERROR(Get TelegramUser)| %o", err)
				return;
			} 
			if(response.length > 0){
				telId = response[0].id;
			}
        });
		
		if(telId <= 0)
		{
			const result = await client.invoke(
				new Api.contacts.ImportContacts({
				  contacts: [
					new Api.InputPhoneContact({
					  clientId: 12345678,
					  phone: _phone,
					  firstName: "",
					  lastName: "",
					}),
				  ],
				})
			);
			
			if(result.users.length > 0){
				telId = result.users[0].id.value;
			}
		}

		await client.sendMessage(telId, { message: _message });
	}
}

