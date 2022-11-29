'use strict'
var repo = require('./../repo');
const mysql = require('mysql')
const db = require('./../db')

//Product
module.exports = {
    get: (req, res) => {
		let sql = 'SELECT * FROM products'
		db.query(sql, (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json(response);
		});
    },
	
    detail: (req, res) => {
		let sql = 'SELECT * FROM products WHERE id = ?'
		let id = req.params.id;
        db.query(sql, [id], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json(response[0]);
         })
    },
	
    update: (req, res) => {
        let data = req.body;
        let id = req.params.id;
		let sql = 'UPDATE products SET name = ?, color = ?, price = ? WHERE id = ?'
        db.query(sql, [data.name, data.color, data.price, id], (err, response) => {
            if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true });
        })
    },
	
    store: (req, res) => {
        let data = req.body;
		let sql = 'INSERT INTO products VALUES (?, ?, ?, ?)'
        db.query(sql, [data.id, data.name, data.color, data.price], (err, response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
            return res.json({ success: true });
        })
    },
	
    delete: (req, res) => {
		let sql = 'DELETE FROM products WHERE id = ?'
		let id = req.params.id;
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return res.json({ success: false, detail: err });
			} 
			return res.json({ success: true });
		});
    }
}