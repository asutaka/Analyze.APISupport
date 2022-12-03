'use strict'
const mysql = require('mysql')
const db = require('./../db')
const tele = require('./../../teleapi')
//Telegram
module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM Telegram order by id desc limit 10'
		db.query(sql, (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json(response);
		})
    },
	
    detail: (req, res) => {
		let phone = req.params.phone;
		let sql = 'SELECT * FROM Telegram WHERE phone = ? order by id desc limit 10'
        db.query(sql, [phone], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json(response);
        })
    },
	
    update: (req, res) => {
		let data = req.body;
        let id = req.params.id;
		let sql = 'UPDATE Telegram SET status = ? WHERE id = ?'
        db.query(sql, [data.status, id], (err, response) => {
            if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true });
        })
    },
	
    store: (req, res) => {
		let data = req.body;
		let sql = 'INSERT INTO Telegram VALUES (?, ?, ?, ?,?)'
        db.query(sql, [data.id, data.phone, data.message, data.status, data.createdtime], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true });
        })
    },
	
    delete: (req, res) => {
        let sql = 'DELETE FROM Telegram WHERE id = ?'
		let id = req.params.id;
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json({ success: true });
		})
    },
	
	send: (req, res) => {
		let data = req.body;
		try
		{
			tele.sendMessage(data.phone, data.message);
		}
		catch(error)
		{
			console.log("TelegramController|ERROR(SendMessage)|",data.phone, data.message, error);
		}
		return res.json({ success: true });
    }
}