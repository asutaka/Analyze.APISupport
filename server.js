var mysql = require('mysql');
var express = require('express');
var app = express();
var HTTP_PORT = 8000
app.listen(8000,function(){
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
var con = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6581337",
  password: "cg5PjRqaJI",
  database: "sql6581337"
});

/////////////////////////////////////////////////////////////////////////////////////
//User
app.get("/api/users", (req, res, next) => {
    var sql = "select * from User"
    var params = []
    con.query(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from User where id = ?"
    var params = [req.params.id]
    con.query(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/user/", (req, res, next) => {
    var errors=[]
    if (!req.body.signature){
        errors.push("No signature specified");
    }
    if (!req.body.phone){
        errors.push("No phone specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        session: req.body.session,
        phone: req.body.phone,
        signature: req.body.signature,
		createdtime: req.body.createdtime,
		isactive: req.body.isactive
    }
    var sql ='INSERT INTO User (session, phone, signature, createdtime, isactive) VALUES (?,?,?,?,?)'
    var params =[data.session, data.phone, data.signature, data.createdtime, data.isactive]
    con.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        phone: req.body.phone,
        signature: req.body.signature,
		createdtime: req.body.createdtime,
		isactive: req.body.isactive
    }
    con.run(
        `UPDATE user set 
           isactive = coalesce(?,isactive) 
           WHERE id = ?`,
        [data.isactive, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})

app.delete("/api/user/:id", (req, res, next) => {
    con.run(
        'DELETE FROM User WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})
/////////////////////////////////////////////////////////////////////////////////////
//File 
app.get("/api/file/:type", (req, res, next) => {
    var sql = "select * from File where type = ?"
    var params = [req.params.id]
    con.query(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
/////////////////////////////////////////////////////////////////////////////////////
//Log 
app.get("/api/logs", (req, res, next) => {
    var sql = "select * from Log ORDER BY id DESC LIMIT 200"
    var params = []
    con.query(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/log/", (req, res, next) => {
    var errors=[]
    if (!req.body.phone){
        errors.push("No phone specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        phone: req.body.phone,
		type: req.body.type,
        ip: req.body.ip,
		time: req.body.time
    }
    var sql ='INSERT INTO Log (phone, type, ip, time) VALUES (?,?,?,?)'
    var params =[data.phone, data.type, data.ip, data.time]
    con.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
/////////////////////////////////////////////////////////////////////////////////////
//Telegram
app.get("/api/telegrams", (req, res, next) => {
    var sql = "select * from Telegram ORDER BY id DESC LIMIT 100"
    var params = []
    con.query(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/telegram/:id", (req, res, next) => {
    var sql = "select * from Telegram where id = ?"
    var params = [req.params.id]
    con.query(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/telegram/", (req, res, next) => {
    var errors=[]
    if (!req.body.phone){
        errors.push("No phone specified");
    }
    if (!req.body.message){
        errors.push("No message specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        phone: req.body.phone,
        message: req.body.message,
		createdtime: req.body.createdtime
    }
    var sql ='INSERT INTO Telegram (phone, message, createdtime, status) VALUES (?,?,?,?)'
    var params =[data.phone, data.message, data.createdtime, 0]
    con.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/telegram/:id", (req, res, next) => {
    var data = {
		status: req.body.status
    }
    con.run(
        `UPDATE user set 
           status = coalesce(?,status) 
           WHERE id = ?`,
        [data.status, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})

app.delete("/api/telegram/:id", (req, res, next) => {
    con.run(
        'DELETE FROM Telegram WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})
/////////////////////////////////////////////////////////////////////////////////////
// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});



