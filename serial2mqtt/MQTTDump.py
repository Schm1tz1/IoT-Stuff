#!/usr/bin/python

import paho.mqtt.client as paho
import time

mqtt_host = ""
mqtt_port = 8883
mqtt_user = ""
mqtt_pass = ""

def on_connect(client, userdata, flags, rc):
    print("CONNACK received with code %d." % (rc))

def on_message(client, userdata, message):
    print("Received message '" + str(message.payload) + "' on topic '"
        + message.topic + "' with QoS " + str(message.qos))

def on_ms_tmp(client, userdata, message):
    print(str(time.time())+ " MS TMP: " +str(message.payload))
def on_ms_prs(client, userdata, message):
    print(str(time.time())+ " MS PRS: " +str(message.payload))
def on_dht_tmp(client, userdata, message):
    print(str(time.time())+ " DHT TMP: " +str(message.payload))
def on_dht_hum(client, userdata, message):
    print(str(time.time())+ " DHT HUM: " +str(message.payload))
def on_msl_prs(client, userdata, message):
    print(str(time.time())+ " MSL PRS: " +str(message.payload))
def on_avg_tmp(client, userdata, message):
    print(str(time.time())+ " AVG TMP: " +str(message.payload))
    
def cleanup():
    print "Ending and cleaning up"
    #ser.close()
    mqttc.disconnect()

client = paho.Client()
# callbacks
client.on_connect = on_connect
#client.on_message = on_message
client.message_callback_add("office/DHT_TMP", on_dht_tmp)
client.message_callback_add("office/DHT_HUM", on_dht_hum)
client.message_callback_add("office/MS_TMP", on_ms_tmp)
client.message_callback_add("office/MS_PRS", on_ms_prs)
client.message_callback_add("office/MSL_PRS", on_msl_prs)
client.message_callback_add("office/AVG_TMP", on_avg_tmp)

# connection
client.username_pw_set(mqtt_user, mqtt_pass)
client.connect(mqtt_host, mqtt_port)
client.subscribe("office/#", qos=0)

client.loop_start()

while True:
    time.sleep(1)
