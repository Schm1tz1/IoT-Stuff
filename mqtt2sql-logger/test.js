#!/usr/bin/node

// if modules are not found in a stardard path, add it here. example:
// module.paths.push('/usr/lib/node_modules/');

var mqtt = require('mqtt');

var client = mqtt.connect( {host: 'localhost', port: '8883', username: 'xxx', password: 'xxx'} );

client.on('connect', function() {
    client.subscribe('office/#', function() {
        client.on('message', function(topic, message, packet) {
            console.log(topic + ": " + message);
        }); 
    }); 
});

