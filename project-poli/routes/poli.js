var express = require('express');
var router = express.Router();
var poliModel = require('../models/poli');

/* GET users listing. */
router.get('/', function (req, res, next) {
    poliModel.findAll().then(data => {
        res.json({
            status: true,
            pesan: "Berhasil Tampil",
            data: data
        })
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal Tampil : " + err.message,
            data: []
        })
    })
});

router.post('/', function (req, res, next) {
    poliModel.create(req.body).then(data => {
        res.json({
            status: true,
            pesan: "Berhasil Tambah",
            data: data
        });
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal Tambah: " + err.message,
            data: []
        });
    });
});

router.put('/', function (req, res, next) {
    poliModel.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json({
            status: true,
            pesan: "Berhasil Ubah",
            data: []
        });
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal Ubah: " + err.message,
            data: []
        });
    });
});

router.delete('/', function (req, res, next) {
    poliModel.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json({
            status: true,
            pesan: "Berhasil Hapus",
            data: []
        });
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal Hapus: " + err.message,
            data: []
        });
    });
});

module.exports = router;