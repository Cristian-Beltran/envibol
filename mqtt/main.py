import paho.mqtt.client as mqtt
import requests
import json

# Configuración del cliente MQTT
mqtt_broker_address = "localhost"  # Cambia esto a la dirección de tu broker MQTT
mqtt_broker_port = 1883  # Cambia esto al puerto de tu broker MQTT
mqtt_username = "user"  # Cambia esto a tu nombre de usuario MQTT
mqtt_password = "holamundo"  # Cambia esto a tu contraseña MQTT

def on_connect(client, userdata, flags, rc):
    print("Conectado al broker MQTT con código de resultado:", rc)
    # Suscríbete a los tópicos de entrada existentes en el servidor Express
    input_topics = get_input_topics()
    for topic in input_topics:
        client.subscribe(topic)
        print("Suscrito al tópico de entrada:", topic)

def on_message(client, userdata, msg):
    print(f"Datos recibido en el tópico {msg.topic}: {msg.payload.decode()}")
    message = msg.payload.decode();
    values = message.split(",")

    response_data={"rfid":values[0],"type":values[1],"turnstile":msg.topic};
    response = requests.post("http://localhost:3000/api/entrie", json=response_data)
    response_json = response.json()
    res_value = response_json.get("res")
    response_topic = msg.topic + "Set"
    client.publish(response_topic, res_value)
    print("Respuesta publicada en el tópico de respuesta:", response_topic,res_value)

def get_input_topics():
    response = requests.get("http://localhost:3000/api/turnstile")  # Cambia la URL según tu servidor Express
    if response.status_code == 200:
        topics_data = response.json()
        return [topic["name"] for topic in topics_data]
    else:
        print("Error al obtener los tópicos de entrada del servidor.")
        return []

client = mqtt.Client()
client.username_pw_set(username=mqtt_username, password=mqtt_password)
client.on_connect = on_connect
client.on_message = on_message

client.connect(mqtt_broker_address, mqtt_broker_port, 60)
client.loop_forever()

