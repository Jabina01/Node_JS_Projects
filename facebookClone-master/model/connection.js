var mysql = require("mysql")
var con=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"Papa@123"
});

con.connect(function(err){
    if (err) throw err
        console.log("connected")
    con.query("create database facebook", function(err){
    if (err){
        console.log("databases already created")
    }
    else{
        console.log("database created")
    }
    });
});

