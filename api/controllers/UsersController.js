'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

//User
module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM User'
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
        let sql = 'SELECT * FROM User WHERE id = ?'
        db.query(sql, [req.params.id], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
        let sql = 'UPDATE User SET session = ?, phone = ?, signature = ?, createdtime = ?, isactive = ? WHERE id = ?'
        db.query(sql, [data.session, data.phone, data.signature, data.createdtime, data.isactive, id], (err, response) => {
            if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO User VALUES (?, ?, ?, ?, ?, ?)'
        db.query(sql, [data.id, data.session, data.phone, data.signature, data.createdtime, data.isactive], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM User WHERE id = ?'
        db.query(sql, [req.params.id], (err, response) => {
            if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true })
        })
    }
}