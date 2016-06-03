#!/usr/bin/node

var mqtt = require('mqtt');
var mysql  = require('mysql');

var client = mqtt.connect( {host: 'localhost', port: '8883', username: 'xxx', password: 'xxx'} );

var dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'xxx',
  password : 'xxx',
  database : 'xxx'
});

client.on('connect', function() {
    client.subscribe('office/#', function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
	    var sub = topic.split("/")[1];		
            var query = dbconn.query('INSERT INTO office (topic,value) values (?, ?)', [sub, message], function(err) {
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
 
