const express = require("express");
const app = express()

const { Pool } = require("pg");

const pool = new Pool({
    user: "phitran",
    host: "localhost",
    database: "phitran",
    port: "5432"
})
const PORT = process.env.PORT || 8080

app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server" })
})


//get data from db
app.get("/api/getCars", (req, res) => {
    pool.query("SELECT * FROM car_inventory", (error, result) => {
        if (error) {
            console.log("Error executing query", error)
            res.status(500).json({ error: "Internal Server Error" })
            return
        }
        res.json(result.rows)
    })
})

//post data to db
app.post("/api/addCars", (req, res) => {
    const { brand, model, year, color, fuel, cost } = req.body
    console.log("req", req.body)
    //SQL code to post data
    pool.query("INSERT INTO car_inventory (brand, model, year, color, fuel, cost) VALUES ($1, $2, $3, $4, $5, $6)", [brand, model, year, color, fuel, cost], (error, result) => {
        if (error) {
            console.log("Error executing query", error)
            res.status(500).json({ error: "Internal Server Error" })
            return
        }
        res.json({ message: "Data Inserted Successfully" })
    })
})

app.delete("/api/deleteCar/:id", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from car_inventory WHERE id=$1", [id], (error, result) => {
        if (error) {
            console.log("Error executing query", error)
            res.status(500).json({ error: "Internal Server Error" })
            return
        }
        res.json({ message: "Data deleted successfully" })
    })
})

app.listen(PORT, () => {
    console.log("Server listening on", PORT)
})

