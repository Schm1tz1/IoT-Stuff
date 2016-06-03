#!/usr/bin/node

var mqtt = require('mqtt');

var client = mqtt.connect( {host: 'localhost', port: '8883', username: 'xxx', password: 'xxx'} );

client.on('connect', function() {
    client.subscribe('office/#', function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
        }); 
    }); 
});

