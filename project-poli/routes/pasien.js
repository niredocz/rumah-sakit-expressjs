var express = require('express');
var router = express.Router();
var pasienModel = require('../models/pasien');

router.get('/options', function (req, res, next) {
    pasienModel.findAll().then(data => {
            var options = data.map(item => {
            return {
                id: item.no_rm,
                value: item.nama
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