const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const checkUser = require("./middlewares/checkUser")
app.use(express.json())


app.get("/users", (req, res) => {
    //GET /users va get tout les users    getAll

    res.json({ users : 
        [
            { id : 1, name : "Clémence"},
            { id : 2, name : "Nicolas"}
        ]
    })
})



app.get("/users/:id", (req, res) => {
    //GET /users/1 va get un users       getOne
    res.json({ users : { id : 1, name : "Clémence"} })
})


app.post("/users", checkUser, (req, res) => {
    //POST /users va créer un users        create
    let user = { id : 3, name : req.body.name }
    
    res.json({ users : user})
})

app.put("/users/:id", checkUser, (req, res) => {
    //PUT /users/3 va modifier un users     Update
    let id = req.params.id

    res.json({
        users : {
            id,
            name : "Guillaume"
        }
    })
})

app.delete("/users/:id", checkUser, (req, res) => {
    //DELETE /users/42 va delete un users delete

    let id = req.params.id

    res.json({
        deleted : {
            id
        }
    })
})


app.get("/admin", (req, res, next) => {
    try{
        throw new Error("Tutu error")
    }
    catch(err){
        console.log(err)
        next({message : "404"})
    }
})

app.all("*", (req, res) => {
    res.json({
        error : "404 : ressources not found"
    })
})


app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({"error" : error.message})
})



app.listen(port, console.log(`Le server express est lancé sur le port ${port}`)) 