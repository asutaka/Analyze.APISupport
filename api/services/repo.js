'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
	//////////////////////////////////////////////////////////////////////////////////
	//Telegram
	telegramGet: function() {
		let sql = 'SELECT * FROM Telegram order by id desc limit 10'
		db.query(sql, (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return response;
		})
	},
	
	telegramDetail: (phone) => {
        let sql = 'SELECT * FROM Telegram WHERE phone = ? order by id desc limit 10'
        db.query(sql, [phone], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return response;
        })
    },
	
    telegramUpdate: (status, id) => {
        let sql = 'UPDATE Telegram SET status = ? WHERE id = ?'
        db.query(sql, [status, id], (err, response) => {
            if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
    telegramStore: (id, phone, message, status, createdtime) => {
        let sql = 'INSERT INTO Telegram VALUES (?, ?, ?, ?,?)'
        db.query(sql, [id, phone, message, status, createdtime], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
	telegramDelete: function(id) {
		let sql = 'DELETE FROM Telegram WHERE id = ?'
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return { success: true };
		})
	},
	//////////////////////////////////////////////////////////////////////////////////
	//User
	userGet: function() {
		let sql = 'SELECT * FROM User'
		db.query(sql, (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return response;
		})
	},
	
	userDetail: (id) => {
        let sql = 'SELECT * FROM User WHERE id = ?'
        db.query(sql, [id], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return response[0];
        })
    },
	
    userUpdate: (session, phone, signature, createdtime, isactive, id) => {
        let sql = 'UPDATE User SET session = ?, phone = ?, signature = ?, createdtime = ?, isactive = ? WHERE id = ?'
        db.query(sql, [session, phone, signature, createdtime, isactive, id], (err, response) => {
            if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
    userStore: (session, phone, signature, createdtime, isactive, id) => {
        let sql = 'INSERT INTO User VALUES (?, ?, ?, ?, ?, ?)'
        db.query(sql, [id, session, phone, signature, createdtime, isactive], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
	userDelete: function(id) {
		let sql = 'DELETE FROM User WHERE id = ?'
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return { success: true };
		})
	},
	//////////////////////////////////////////////////////////////////////////////////
	//Log
	logGet: function() {
		let sql = 'SELECT * FROM Log order by id desc limit 10'
		db.query(sql, (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return response;
		})
	},
	
	logDetail: (phone) => {
        let sql = 'SELECT * FROM Log WHERE phone = ? order by id desc limit 10'
        db.query(sql, [phone], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return response;
        })
    },
	
    logStore: (id, phone, type, ip, time) => {
        let sql = 'INSERT INTO Log VALUES (?, ?, ?, ?, ?)'
        db.query(sql, [id, phone, type, ip, time], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
	logDelete: function(id) {
		let sql = 'DELETE FROM Log WHERE id = ?'
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return { success: true };
		})
	},
	//////////////////////////////////////////////////////////////////////////////////
	//Product
	productGet: function() {
		let sql = 'SELECT * FROM products'
		db.query(sql, (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return response;
		})
	},
	
	productDetail: (id) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [id], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return response;
        })
    },
	
    productUpdate: (status, id) => {
        let sql = 'UPDATE products SET name = ?, color = ?, price = ? WHERE id = ?'
        db.query(sql, [name, color, price, id], (err, response) => {
            if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
    productStore: (id, name, color, price) => {
        let sql = 'INSERT INTO products VALUES (?, ?, ?, ?)'
        db.query(sql, [id, name, color, price], (err, response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
            return { success: true };
        })
    },
	
	productDelete: function(id) {
		let sql = 'DELETE FROM products WHERE id = ?'
		db.query(sql, (err,[id], response) => {
			if (err)
			{
				return { success: false, detail: err };
			} 
			return { success: true };
		})
	},
	//////////////////////////////////////////////////////////////////////////////////
}
