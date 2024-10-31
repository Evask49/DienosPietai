const mongoose = require("mongoose");
const { type } = require("os");
const dishSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    shop: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
})


const Dish = mongoose.model("Repairman", dishSchema);
module.exports = Dish;