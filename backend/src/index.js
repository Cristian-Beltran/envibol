import app from "./app.js";
import {sequelize} from "./db.js";
import "./models/User.js";
import "./models/Card.js";
import "./models/Entrie.js";
import "./models/Role.js";
import "./models/Visit.js";
import "./models/Turnstile.js";
import mqttHandler from "./mqtt_handler.js";
async function main() {
  try {
    await sequelize.sync({alter: true});
    console.log("Connection established");
    app.listen(app.get("port"));
    var mqttClient = new mqttHandler();
    mqttClient.connect();
    console.log("Server listening on port " + app.get("port"));
  } catch (error) {
    console.log("Error: " + error);
  }
}
main();


