const db = require("../config/db");

const getAllDetails = async (req, res) => {
  const query = `SELECT * FROM customer_details ORDER BY id`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
};

const getDetailsById = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM customer_details WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else if (!row) {
      res.status(404).send("Customer not found");
    } else {
      res.json(row);
    }
  });
};
const createDetails = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address1,
    address2,
    country,
    zipCode,
  } = req.body;
  const query = `INSERT INTO customer_details (first_name,last_name,email,phone_number,address1,address2,country,zip) 
                VALUES ('${firstName}','${lastName}','${email}','${phoneNumber}','${address1}','${address2}','${country}','${zipCode}')`;
  db.run(query, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(201);
      res.send(`customer data created successfully with id:${this.lastID}`);
    }
  });
};

const updateDetails = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address1,
    address2,
    country,
    zipCode,
  } = req.body;
  const query = `UPDATE customer_details
                SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', phone_number = '${phoneNumber}', address1 = '${address1}',address2 = '${address2}', country = '${country}', zip = '${zipCode}'
                WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else if (this.changes === 0) {
      res.status(404).send("Customer not found");
    } else {
      res.send("Customer updated successfully");
      res.status(201);
    }
  });
};

const deleteDetails = async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM customer_details WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else if (this.changes === 0) {
      res.status(404).send("Customer not found");
    } else {
      res.send("Customer deleted successfully");
    }
  });
};

module.exports = {
  getAllDetails,
  getDetailsById,
  createDetails,
  updateDetails,
  deleteDetails,
};
