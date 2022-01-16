var express = require('express');
var router = express.Router();
var transaksi_periksa = require('../models/transaksi_periksa');

router.get('/options', function (req, res, next) {
    transaksi_periksa.findAll().then(data => {
            var options = data.map(item => {
            return {
                id: item.id,
                value: item.id
            }
        });
        res.json({
            status: true,
            pesan: "Berhasil Tampil Options",
            data: options
        });
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal tampil: " + err.message,
            data: []
        });
    });
});

module.exports = router;