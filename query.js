const db = require("./server"); // Assuming server.js is in the same directory

const express = require("express");
const router = express.Router();

const mysql = require("mysql2/promise");

// MySQL database connection configuration
const pool = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "sql6686277",
  password: "XgDDJ78TjR",
  database: "sql6686277",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [data] = await connection.execute("SELECT * FROM nurses");
    connection.release();

    if (data.length > 0) {
      res.json({ status: 1, data });
    } else {
      res.json({ status: 0, message: "No nurse found" });
    }
  } catch (error) {
    console.error("Error fetching nurses:", error);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const nurseId = req.params.id;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "DELETE FROM nurses WHERE id = ?",
      [nurseId]
    );
    connection.release();

    if (result.affectedRows > 0) {
      res.json({ status: 1, message: "Nurse deleted successfully" });
    } else {
      res.status(404).json({ status: 0, message: "Nurse not found" });
    }
  } catch (error) {
    console.error("Error deleting nurse:", error);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
});

router.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...updatedFields } = req.body; // Extract ID and updated fields from the request body

  try {
    const fieldUpdates = Object.keys(updatedFields)
      .map((field) => `${field} = ?`)
      .join(", "); // Generate SET clause
    const fieldValues = Object.values(updatedFields); // Extract field values

    // Update the nurse data in the database
    const connection = await pool.getConnection();
    await connection.execute(
      `UPDATE nurses SET ${fieldUpdates} WHERE Id = ?`,
      [...fieldValues, id] // Concatenate field values with ID
    );
    connection.release();

    res.json({ status: 1, message: "Nurse data updated successfully" });
  } catch (error) {
    console.error("Error updating nurse data:", error);
    res.status(500).json({ status: 0, message: "Failed to update nurse data" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, licenseNumber, dob, age } = req.body; // Extract nurse data from the request body

    // Execute SQL query to insert the new nurse into the database
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "INSERT INTO nurses (name, licenseNumber, dob, age) VALUES (?, ?, ?, ?)",
      [name, licenseNumber, dob, age]
    );
    connection.release();

    if (result.affectedRows > 0) {
      res.json({ status: 1, message: "Nurse added successfully" });
    } else {
      res.status(500).json({ status: 0, message: "Failed to add nurse" });
    }
  } catch (error) {
    console.error("Error adding nurse:", error);
    res.status(500).json({ status: 0, message: "Internal server error" });
  }
});

module.exports = router;
