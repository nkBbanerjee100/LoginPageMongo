const express = require("express")
const app = express()
const mongoose = require("mongoose")
const newUser = new mongoose.Schema({
    Username: {
        type: String,
        reuqired: true,
        unique: true
    },
    Password: {
        type: [String, Number],
        required: true
    },
    Confirm_Password: {
        type: [String, Number],
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
const LoginCollection = new mongoose.model("LoginCollection",newUser);
module.exports = LoginCollection