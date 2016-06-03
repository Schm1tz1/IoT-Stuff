#!/usr/bin/node

// if modules are not found in a stardard path, add it here. example:
// module.paths.push('/usr/lib/node_modules/');

var mqtt = require('mqtt');
var mysql  = require('mysql');
var conf = require('./config.js');

var client = mqtt.connect( {host: conf.mqtthost, port: conf.mqttport, username: conf.mqttuser, password: conf.mqttpass} );

var dbconn = mysql.createConnection({
  host     : conf.sqlhost,
  user     : conf.sqluser,
  password : conf.sqlpass,
  database : conf.dbname
});

client.on('connect', function() {
    client.subscribe(conf.topic, function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
	    var sub = topic.split("/")[1];

	    if( topic.match("/identification") == null) {
              var query = dbconn.query('INSERT INTO office (topic,value) values (?, ?)', [sub, message], function(err) {
  	      if (err) { 
	        console.log('Error in '+query.sql + err);}
	      });
	    }
	    else {
	      console.log("message was skipped !");
            }
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
 
