#!/usr/bin/node

var mqtt = require('mqtt');
var mysql  = require('mysql');

var client = mqtt.createClient(8883, "localhost", {username: "xxx", password: "xxx"});

var dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'iot',
  password : 'l2sql#4#iot',
  database : 'iotdata'
});

client.on('connect', function() {
    client.subscribe('office/#', function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
	
            var query = dbconn.query('INSERT INTO office (topic,value) values (?, ?)', [topic, message], function(err) {
		if (err) { 
			console.log('Error in '+query.sql + err);}
		});
        }); 
    }); 
});

dbconn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

console.log('connected as id ' + dbconn.threadId);
});
 
