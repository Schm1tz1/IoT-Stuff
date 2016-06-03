#!/usr/bin/node

// if modules are not found in a stardard path, add it here. example:
module.paths.push('/usr/lib/node_modules/');

var mqtt = require('mqtt');
var conf = require('./config.js');

var client = mqtt.connect( {host: conf.mqtthost, port: conf.mqttport, username: conf.mqttuser, password: conf.mqttpass} );

client.on('connect', function() {
    client.subscribe(conf.topic, function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
        }); 
    }); 
});

