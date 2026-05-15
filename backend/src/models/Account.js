const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 0
    },

    active: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Account", AccountSchema);