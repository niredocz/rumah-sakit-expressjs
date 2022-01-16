var express = require('express');
var router = express.Router();
var transPeriksaModel = require('../models/transaksi_periksa');
var dokterModel = require('../models/dokter');
var diagnosaModel = require('../models/diagnosa');
const axios = require('axios')

/* GET users listing. */
router.get('/', function (req, res, next) {
  transPeriksaModel.findAll().then(data => {
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
  transPeriksaModel.create(req.body).then(data => {
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
  transPeriksaModel.update(req.body, {
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
  transPeriksaModel.destroy({
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

router.get('/options', function (req, res, next) {
    dokterModel.findAll().then(async data => {
        var options = [];
        await data.forEach(async (item) => {
            var itemBaru = {
                id: item.id,
                value: item.id + " - " + item.nama
            };
            await options.push(itemBaru);
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

router.get('/options1', function (req, res, next) {
    diagnosaModel.findAll().then(async data => {
        var options1 = [];
        await data.forEach(async (item) => {
            var itemBaru = {
                id: item.id,
                value: item.id + " - " + item.nama
            };
            await options1.push(itemBaru);
        });
        res.json({
            status: true,
            pesan: "Berhasil Tampil Options",
            data: options1
        });
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal tampil: " + err.message,
            data: []
        });
    });
});

// router.get('/options', function (req, res, next) {
//     transPeriksaModel.findAll().then( async data => {
//         var options = [];
//         await data.forEach( async (item) => {
//             var newItem = {
//                 id: item.id,
//                 value: "ID Transaksi : " + item.id + ", Biaya Transaksi : " + item.biaya
//             };
//             await options.push(newItem);
//         })

//         res.json({
//             status: true,
//             pesan: "Berhasil Tampil",
//             data: options
//         })
//     }).catch(err => {
//         res.json({
//             status: false,
//             pesan: "Gagal Tampil : " + err.message,
//             data: []
//         })
//     })
// });

// router.get('/pasien', function(req, res, next) {
//     axios.get('http://localhost:3000/pasien/options').then(function (response) {
//         res.json(response.data);
//     }).catch( err => {
//         res.json ({
//             status: false,
//             pesan: "Gagal tampil: " + err.message,
//             data: []
//         })
//     })
// })

module.exports = router;