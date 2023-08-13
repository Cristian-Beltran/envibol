import app from "./app.js";
import { sequelize } from "./db.js";
/*import './models/User.js'
import './models/Card.js'
import './models/Entrie.js'
import './models/Role.js'
import './models/Visit.js'
import './models/Turnstile.js' 
*/
async function main() {
  try {
    await sequelize.sync();
    console.log("Connection established");
    app.listen(app.get("port"));
    console.log("Server listening on port " + app.get("port"));
  } catch (error) {
    console.log("Error: " + error);
  }
}

main();
