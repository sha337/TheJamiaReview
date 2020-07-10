const express = require("express");
const router  = express.Router();
const jsSHA = require("jssha");
const request = require('request');
const uniqid = require('uniqid');
const Payment    = require("../models/payment");

router.get("/payment", (req, res) => {
    res.render("payments/payment");
});


router.post('/payment_gateway/payumoney', (req, res) => {
    //Here save all the details in pay object 
    const pay = req.body;
    pay.txnid = uniqid.process();
    const hashString = process.env.key //store in in different file
     + '|' + pay.txnid
     + '|' + pay.amount 
     + '|' + pay.productinfo 
     + '|' + pay.firstname
     + '|' + pay.email
     + '|' + pay.udf1   //lastname
     + '|' + pay.udf2   //phoneno.
     + '|' + pay.udf3   //address
     + '|' + '|||||||' 
     + process.env.salt //store in in different file
    const sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString);
    //Getting hashed value from sha module
    const hash = sha.getHash("HEX");
     
     //We have to additionally pass merchant key to API
    //  so remember to include it.
    pay.key = process.env.key //store in in different file;
    pay.surl = 'https://evening-spire-86727.herokuapp.com/payment/success';
    pay.furl = 'https://evening-spire-86727.herokuapp.com/payment/fail';
    pay.hash = hash;
    //Making an HTTP/HTTPS call with request
    request.post({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
        url: 'https://sandboxsecure.payu.in/_payment', //Testing url
        form: pay
    }, function (error, httpRes, body) {
    if (error) 
        res.send(
        {status: false, 
        message:error.toString()
        });
    if (httpRes.statusCode === 200) {
        res.send(body);
        } else if (httpRes.statusCode >= 300 && 
        httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
        }
    })
});


router.post('/payment/success', (req, res) => {
    //Payumoney will send Success Transaction data to req body. 
    //  Based on the response Implement UI as per you want
    var user = {};
    user.txnid = req.body.txnid;
    user.amount = req.body.amount,
    user.firstname = req.body.firstname,
    user.lastname = req.body.udf1;
    user.productinfo = req.body.productinfo;
    user.dateTime = req.body.addedon;
    user.address = req.body.udf3;
    user.email = req.body.email;
    user.phone = req.body.udf2;
    user.cardnum = req.body.cardnum;
    user.payuMoneyId = req.body.payuMoneyId;
    
    Payment.create(user, (err, newUserPayment) => {
        if(err){
            console.log(err);
        }else{
            res.render('payments/success', {txn: newUserPayment});
        }
    });
});

router.post('/payment/fail', (req, res) => {
    //Payumoney will send Fail Transaction data to req body. 
    //Based on the response Implement UI as per you want
    console.log("fail");
    res.redirect("/");
});



module.exports = router;