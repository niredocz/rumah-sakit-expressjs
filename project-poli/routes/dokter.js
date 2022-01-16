var express = require('express');
var router = express.Router();
var dokterModel = require('../models/dokter');
var poliModel = require('../models/poli');

/* GET users listing. */
router.get('/', function (req, res, next) {
  dokterModel.findAll().then(data => {
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
  dokterModel.create(req.body).then(data => {
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
  dokterModel.update(req.body, {
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
  dokterModel.destroy({
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
    poliModel.findAll().then(async data => {
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

// router.get('/tampil/:id', function (req, res, next) {
//     var id = req.params.id;
//     Pasien.findByPk(id).then(data => {

//         res.json({
//             status: true,
//             pesan: "Berhasil Tampil",
//             data: data
//         });

//     }).catch(err => {
//         res.json({
//             status: false,
//             pesan: "Gagal tampil: " + err.message,
//             data: []
//         });
//     });
// });

module.exports = router;
