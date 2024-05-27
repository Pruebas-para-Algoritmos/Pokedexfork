const express = require('express')
const db = require("./config/database.js")
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

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

app.get("/pokemon/id/:id", async (req, res, next) => {
    let query = `SELECT * FROM POKEMON WHERE POK_ID = '${req.params.id}'`
    try {
        const rows = await db.query(query)
        if (rows.length === 1) {
            res.json(rows)
        } else res.json(`No existe el pokemon`)
    } catch (error) {
        console.log(error);
        res.json(`Algo salio mal! ${error}`)
    }
})

app.get("/pokemon/name/:name", async (req, res, next) => {
    let query = `SELECT * FROM POKEMON WHERE POK_NAME = '${req.params.name}'`
    try {
        const rows = await db.query(query)
        if (rows.length === 1) {
            res.json(rows)
        } else res.json(`No existe el pokemon`)
    } catch (error) {
        console.log(error);
        res.json(`Algo salio mal! ${error}`)
    }
})

app.get("/pokemon/random", async (req, res, next) => {
    const id = Math.floor(Math.random() * (722 - 1 + 1)) + 1;
    let query = `SELECT * FROM POKEMON WHERE POK_ID = '${id}'`
    try {
        const rows = await db.query(query)
        if (rows.length === 1) {
            res.json(rows)
        } else res.json(`No existe el pokemon`)
    } catch (error) {
        console.log(error);
        res.json(`Algo salio mal! ${error}`)
    }
})

app.get("/user", async (req, res, next) => {
    const users = await db.query("SELECT id, name, last_name, mail, phone_number FROM USERS;")
    res.json(users);
});

app.get("/user/id/:id", async (req, res, next) => {
    let query = `SELECT * FROM USERS WHERE ID = '${req.params.id}'`
    try {
        const rows = await db.query(query)
        if (rows.length === 1) {
            res.json(rows)
        } else res.json(`No existe el usuario`)
    } catch (error) {
        console.log(error);
        res.json(`Algo salio mal! ${error}`)
    }
})

app.put("/user", async (req, res, next) => {
    const {id, name, last_name, mail, phone_number, password} = req.body
    let query = `UPDATE USERS SET NAME = '${name}', LAST_NAME = '${last_name}', MAIL = '${mail}', PHONE_NUMBER = '${phone_number}', PASSWORD = '${password}' WHERE ID = '${id}'`
    try {
        const rows = await db.query(query)
        res.json("El usuario ha sido modificado")
    } catch (error) {
        console.log(error);
        res.json(`Algo salio mal! ${error}`)
    }
})

app.post("/user", async (req, res) => {
    const {
        name,
        last_name,
        mail,
        phone_number,
        password
    } = req.body;

    let query = "INSERT INTO USERS (name, last_name, mail, phone_number, password)"
    query += ` VALUES ('${name}','${last_name}','${mail}','${phone_number}','${password}')`

    try {
        const rows = await db.query(query)
        console.log(rows);
        res.json(rows)
    } catch (error) {
        console.log(`Algo ha salido mal :( ${error}`);
        res.json(`Algo ha salido mal :( ${error}`)
    }


})


app.post("/login", async (req, res) => {
    try {

        const {
            mail,
            password
        } = req.body;

        let query = `SELECT * FROM USERS WHERE MAIL = '${mail}' AND PASSWORD = '${password}'`
        const rows = await db.query(query)
        console.log(rows);
        //const user = rows.find(user => user.mail === mail && user.password === password)
        if (rows.length === 1) {
            console.log("Login");
            res.json("login")
        } else {
            console.log(`El mail o la contraseña no son correctas`);
            res.json("El mail o la contraseña no son correctas")
        }
    } catch (error) {
        console.log(error);
        res.json(`Algo ha salido mal :) ${error}`)
    }

})


app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})