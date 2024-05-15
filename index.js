const express = require('express')
const db = require("./config/database.js")
const app = express()

const port = 3000

app.use(express.json())
app.use(express.json(express.urlencoded({
    extended: true
})))

app.set('view engine', 'ejs')

app.get("/", (req, res, next) => {
    res.render('index')
})

app.get("/pokemon", async (req, res, next) => {
    const pokemon = await db.query("SELECT * FROM POKEMON;")
    res.json(pokemon);
});

app.post("/pokemon", (req, res, next) => {
    console.log(req.body);
    res.send("Informacion guardada! (de a mentis)")
})

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})