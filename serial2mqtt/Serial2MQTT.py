#!/usr/bin/python

import time
import serial
import paho.mqtt.client as paho
 
mqtt_host = ""
mqtt_port = 8883
mqtt_user = ""
mqtt_pass = ""

def on_connect(client, userdata, flags, rc):
    print("CONNACK received with code %d." % (rc))

def on_publish(client, userdata, mid):
    print("mid: "+str(mid))

def cleanup():
    print "Ending and cleaning up"
    #ser.close()
    mqttc.disconnect()

client = paho.Client()
# callbacks
client.on_connect = on_connect
client.on_publish = on_publish

# connect serial
ser = serial.Serial("/dev/ttyACM0", 115200)
ser.flushInput()

# connection
client.username_pw_set(mqtt_user, mqtt_pass)
client.connect(mqtt_host, mqtt_port)

client.loop_start()

while True:
	line = ser.readline()
	meas = line.split(",")
	print line
	print meas[0]
	print meas[1]
	print meas[2]
	print meas[3]
	print meas[4]
	print meas[5]
	(rc, mid) = client.publish("office/DHT_TMP", meas[0].rstrip() , qos=1)
	(rc, mid) = client.publish("office/DHT_HUM", meas[1].rstrip() , qos=1)
	(rc, mid) = client.publish("office/MS_TMP", meas[2].rstrip() , qos=1)
	(rc, mid) = client.publish("office/MS_PRS", meas[3].rstrip() , qos=1)
	(rc, mid) = client.publish("office/AVG_TMP", meas[4].rstrip() , qos=1)
	(rc, mid) = client.publish("office/MSL_PRS", meas[5].rstrip() , qos=1)
	time.sleep(1)

