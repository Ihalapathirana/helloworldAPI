var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser')
var app = express();
var connection = mysql.createPool({
    connectionLimit:50,
    host:'localhost',
    user:'anusha',
    //add password
    password:'',
    database:'hw'
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    connection.getConnection(function(error,tempCon){
        if(error){
            console.log("error");
            tempCon.release();
        }
        else{
            console.log("query");
            tempCon.query("select * from nametable",function(error, row, fields){
                tempCon.release();
                if(error){
                    res.json(error)
                    console.log("bad query");
                }else{
                    res.json(row);
                }
            });
        }
    });
});

app.post('/add', function(req, res){
    connection.getConnection(function(error,tempCon){
        if(error){
            console.log(error);
            tempCon.release();
        }
        else{
            console.log("query");
            console.log(req.body);
            tempCon.query("insert into nametable (id,name) values (?,?)",[req.body.id, req.body.name],function(error, row, fields){
                tempCon.release();
                if(error){
                    res.json(error)
                    console.log("bad query");
                }else{
                    res.json(row);
                }
            });
        }
    })
})
app.listen(3000);