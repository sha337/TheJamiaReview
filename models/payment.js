const mongoose = require("mongoose");

let paymentSchema = new mongoose.Schema({
    txnid: String,
    amount: String,
    firstname: String,
    lastname: String,
    productinfo: String,
    dateTime: String,
    address: String,
    email: String,
    phone: String,
    cardnum: String,
    payuMoneyId: String
});

module.exports = mongoose.model("payments", paymentSchema);