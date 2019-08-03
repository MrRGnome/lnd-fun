﻿'use strict';
var express = require('express');
var router = express.Router();
var lightningService = require('../services/lightningService');

var alreadyPaid = {};

router.get('/', async function (req, res) {
    var viewdata = {};
    res.render('pay', { viewdata: viewdata });
});

router.post('/decode_request', async function (req, res) {
    var result = await lightningService.decodePayReq(req.body.payment_request, res.locals.user);
    res.status(200).json(result);
});

router.post('/', async function (req, res) {
    if (alreadyPaid[req.body.payment_request])
        res.status(200).json({ status: "fail", data: {error_message: "Already paid invoice this session"}});
    var result = await lightningService.sendPaymentSync(req.body.payment_request, res.locals.user);
    if (result.status == "success")
        alreadyPaid[req.body.payment_request] = true;
    res.status(200).json(result);
});

router.post('/btc', async function (req, res) {
    if (!req.body.transaction || !req.body.transaction.address || !req.body.transaction.amount)
        res.status(200).json({ status: "fail", data: { error_message: "No transaction data" } });
    console.log(transaction);
    try {
        var result = await lightningService.sendCoins(req.body.transaction, res.locals.user);
        res.status(200).json(result);
    }
    catch(err) {
        res.status(200).json({ status: "fail", data: { error_message: JSON.stringify(err) } });
    }
});

module.exports = router;
