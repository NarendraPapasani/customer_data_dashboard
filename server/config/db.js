const sqlite3 = require("sqlite3").verbose();
const dbName = "customerData.db";

const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the " + dbName + " database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS customer_details (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT,last_name TEXT, email TEXT, phone_number TEXT, address1 TEXT,address2 TEXT, country TEXT,zip TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table created or already exists.");
        }
      }
    );
  }
});

module.exports = db;
