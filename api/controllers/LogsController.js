'use strict'
'use strict'
var repo = require('./../repo');
const mysql = require('mysql')
const db = require('./../db')
//Log
module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM Log order by id desc limit 10'
		db.query(sql, (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json(response);
		})
    },
    detail: (req, res) => {
		let sql = 'SELECT * FROM Log WHERE phone = ? order by id desc limit 10'
		let phone = req.params.phone;
        db.query(sql, [phone], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json(response);
        })
    },
    store: (req, res) => {
        let data = req.body;
		let sql = 'INSERT INTO Log VALUES (?, ?, ?, ?, ?)'
        db.query(sql, [data.id, data.phone, data.type, data.ip, data.time], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true });
        })
    },
    delete: (req, res) => {
		let sql = 'DELETE FROM Log WHERE id = ?'
		let id = req.params.id;
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json({ success: true });
		})
    }
}