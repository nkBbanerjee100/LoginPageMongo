const express = require("express")
const path = require("path")
const app = express()
require("./db/conn")
const hbs = require("hbs")
const UserCollection = require("./models/model")
const bcrypt = require("bcryptjs")

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
        const pass = req.body.userpass
        const conPass = req.body.userconpass
        if (pass === conPass) {
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
            res.status(201).render("login");
        }
        else {
            res.send("passwords are not matching")
        }
    } catch (error) {
        res.status(404).send(error)
    }

})
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async (req, res) => {
    try {
        const Email = req.body.usermail;
        const userPassword = req.body.userpass;
        const userMail = await UserCollection.findOne({ Email: Email })
        // first field in database Schema and 2nd field is req.body.usermail theke j mail ta pelam

        // userMail.Password = database password userPassword = password which was provided by user
        if (userMail.Password == userPassword) {
            res.status(201).send("login successfull")
        }
        else {
            res.status(404).send("invalid login details")
        }
    } catch (error) {
        console.log(error);
    }
})
app.listen(port, () => {
    console.log("express connected");
})
// const securePassword = async (password) => {
//     try {
//         const bcryptedPassword = await bcrypt.hash(password, 10);
//         console.log(bcryptedPassword);
//     } catch (error) {
//         console.log(error);
//     }
// }

// securePassword("nkba1234");