const express = require("express")
const path = require("path")
const app = express()
require("./db/conn")
const hbs = require("hbs")
const UserCollection = require("./models/model")

const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../templates/views")
const templatesPartials = path.join(__dirname, "../templates/partials")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticPath))
app.set("view engine", "hbs")
app.set("views", templatesPath)// i have to tell that which was previously views now that have been chnaged to templates/views
hbs.registerPartials(templatesPartials)
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", async (req, res) => {
    try {
        const Registration = new UserCollection({
            Username: req.body.user,
            Password: req.body.userpass,
            Confirm_Password: req.body.userconpass,
            Phone_Number: req.body.userphone,
            Email: req.body.usermail,
            About_Yourself: req.body.userabout,
            Gender: req.body.genders
        })
        const registrationSaveToDatabase = await Registration.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(404).send(error)
    }

})
app.listen(port, () => {
    console.log("express connected");
}) 