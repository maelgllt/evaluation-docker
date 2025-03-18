const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

console.log("Tentative de connexion à MySQL avec :");
console.log("Host:", process.env.MYSQL_HOST);
console.log("User:", process.env.MYSQL_USER);
console.log("Password:", process.env.MYSQL_PASSWORD);
console.log("Database:", process.env.MYSQL_DATABASE);
console.log("Port:", process.env.MYSQL_PORT);

const db = mysql.createConnection({
    host: 'db',
    user: 'myuser',
    password: 'mypassword',
    database: 'image_favorites',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("erreur de connexion à MySQL:", err);
    } else {
        console.log("connecté à la base de données");
    }
});

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;


app.get('/search', async (req, res) => {
    const { page, query, lang } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Le paramètre 'query' est requis" });
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page || 1}&query=${query}&lang=${lang || 'fr'}&client_id=${UNSPLASH_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des images" });
    }
});

app.post('/favorites', (req, res) => {
    console.log("Données reçues dans /favorites:", req.body);
    const { imageUrl, description } = req.body;
    console.log("imageUrl:", imageUrl);
    console.log("description:", description);

    if (!imageUrl) {
        console.error("L'URL de l'image est requise");
        return res.status(400).json({ error: "L'URL de l'image est requise" });
    }

    const sql = "INSERT INTO favorites (imageUrl, description) VALUES (?, ?)";
    db.query(sql, [imageUrl, description || "Image sans description"], (err, result) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: "erreur lors de l'ajout à la bdd" });
        }
        console.log("Résultat SQL :", result);
        res.json({ message: "image ajoutée aux favoris", id: result.insertId });
    });
});

app.get('/favorites', (req, res) => {
    db.query("SELECT * FROM favorites", (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: "erreur lors de la récup des favoris" });
        }
        console.log("Résultats SQL :", results);
        res.json(results);
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
