const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// require("../app")
const newUser = new mongoose.Schema({
    Username: {
        type: String,
        reuqired: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Confirm_Password: {
        type: String,
        required: true
    },
    Phone_Number: {
        type: Number,
        minlength: 10,
        maxlength: 13,
        required: true,
        unique: [true, "already number in use"]
    },
    Email: {
        type: String,
        unique: [true, "mail id already in use"],
        required: true
    },
    About_Yourself: {
        type: String
    },
    Gender: {
        type: String
    }
})
newUser.pre("save", async function (next) {
    try {
        if (this.isModified("Password")) {
            this.Password = await bcrypt.hash(this.Password, 10);
        }
        if (this.isModified("Confirm_Password")) {
            this.Confirm_Password = await bcrypt.hash(this.Confirm_Password, 10);
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
})

const LoginCollection = new mongoose.model("LoginCollection", newUser);
module.exports = LoginCollection

