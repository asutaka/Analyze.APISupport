'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

//Product
module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM Telegram order by id desc limit 10'
        db.query(sql, (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json(response)
        })
    },
    detail: (req, res) => {
		 let data = req.body;
        let sql = 'SELECT * FROM Telegram WHERE phone = ? order by id desc limit 10'
        db.query(sql, [req.params.phone], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json(response)
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
            return res.json({ success: true })
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
            return res.json({ success: true })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM Telegram WHERE id = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true })
        })
    }
}