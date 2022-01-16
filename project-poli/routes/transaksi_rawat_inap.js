var express = require('express');
var router = express.Router();
var transRawatInapModel = require('../models/transaksi_rawat_inap');
const axios = require('axios')

/* GET users listing. */
router.get('/', function (req, res, next) {
  transRawatInapModel.findAll().then(data => {
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
  transRawatInapModel.create(req.body).then(data => {
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
  transRawatInapModel.update(req.body, {
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
  transRawatInapModel.destroy({
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

router.get('/pasien', function(req, res, next) {
    axios.get('http://localhost:3000/pasien/options').then(function (response) {
        res.json(response.data);
    }).catch( err => {
        res.json ({
            status: false,
            pesan: "Gagal tampil: " + err.message,
            data: []
        })
    })
})

module.exports = router;
