var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }
	else{
        console.log('Connected to the SQlite database.')
		//User
        db.run(`CREATE TABLE User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
			session text,
            phone text, 
            signature text UNIQUE, 
            createdtime integer, 
            isactive integer, 
            CONSTRAINT session_unique UNIQUE (session)
            )`,(err) => {
			if (err) {
				// Table already created
			}
			else{
				// Table just created, creating some rows
				var insert = 'INSERT INTO User (session, phone, signature, createdtime, isactive) VALUES (?,?,?,?,?)'
				db.run(insert, ["123","0976635946","123456",20221123, 1])
				db.run(insert, ["124","0123456789","12345678",20221123, 1])
			}
		}) 
		//Telegram
		db.run(`CREATE TABLE Telegram (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					phone text, 
					message text, 
					status integer, 
					createdtime integer
					)`,(err) => {
					if (err) {
						// Table already created
					}
					else{
						// Table just created, creating some rows
						var insert = 'INSERT INTO Telegram (phone, message, status, createdtime) VALUES (?,?,?,?)'
						db.run(insert, ["0976635946","123456",0, 20221123])
					}
				})	
		//File
		db.run(`CREATE TABLE File (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					type integer,
					name text, 
					createdtime integer
					)`,(err) => {
					if (err) {
						// Table already created
					}
					else{
						// Table just created, creating some rows
						var insert = 'INSERT INTO File (type, name, createdtime) VALUES (?,?,?)'
						db.run(insert, [1, "abc.txt", 20221123])
					}
				})	
		//Log
		db.run(`CREATE TABLE Log (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					phone text,
					type integer,
					ip text, 
					time integer
					)`,(err) => {
					if (err) {
						// Table already created
					}
					else{
						// Table just created, creating some rows
						var insert = 'INSERT INTO Log (phone, type, ip, time) VALUES (?,?,?,?)'
						db.run(insert, ["0976635946", 1, "0.0.0.0", 20221123])
					}
				})						
    }
})


module.exports = db

