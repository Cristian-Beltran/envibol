import mqtt from "mqtt";
import { getTurnstilesMQTT } from "./controllers/turnstile.controllers.js";
import { createEntrieMQTT } from "./controllers/entrie.controllers.js";

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "mqtt://164.92.78.151:5050";
    this.username = "user"; // mqtt credentials if these are needed to connect
    this.password = "holamundo";

    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });
    this.connect();
  }
  connect() {
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
      subscribe();
    });
    const subscribe = async () => {
      const res = await getTurnstilesMQTT();
      res.forEach((turnstile) => {
        const name = turnstile.dataValues.name; // Accedemos al nombre dentro de 'dataValues'
        this.mqttClient.subscribe(name, { qos: 0 });
      });
    };
    this.mqttClient.on("message", async function (topic, message) {
      console.log("Topic" + topic);
      console.log(message.toString());

      const messageVector = message.toString().split(",");
      const rfid = messageVector[0].trim(); // Eliminamos espacios en blanco antes y después
      const type = messageVector[1].trim(); // Eliminamos espacios en blanco antes y después

      const res = await createEntrieMQTT(rfid, topic, type);
      const publish = topic + "Set";
      this.publish(publish, res);
    });
    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }
}

export default MqttHandler;
