const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/transaction', function(req, res){

    let data = {
        "token": (req.body.token),
        "amount": (req.body.amount)
    };

    let config = {
        headers: {'Authorization': 'Key test_secret_key_33bc15357251406ab8f488cc44844d35'}
    };

    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {

            var verify_idx = response.data['idx'];//get the transaction_id after verification success response

        //  update firebase db of transaction
        })
        .catch(error => {
            console.log(error);
        });

        res.json({
            'message': "transaction completed"
        });

});

module.exports = router;
