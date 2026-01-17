const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://studentUser:studentUser@cluster0.ampwnnh.mongodb.net/tri_wave?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const dbName = "tri_wave"; // ime tvoje baze
const collectionName = "messages";

app.post("/messages", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).send({ error: "text missing" });

        const doc = { text, createdAt: new Date() };
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne(doc);

        res.send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await client.connect();
    console.log("Mini-backend listening on port ${port}");
});
