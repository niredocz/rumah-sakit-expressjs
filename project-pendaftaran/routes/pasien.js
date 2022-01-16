var express = require('express');
var router = express.Router();
var PasienModel = require('../models/pasien');

/* GET users listing. */
router.get('/', function (req, res, next) {
    PasienModel.findAll().then(data => {
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
    PasienModel.create(req.body).then(data => {
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
    PasienModel.update(req.body, {
        where: {
            no_rm: req.body.no_rm
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
    PasienModel.destroy({
        where: {
            no_rm: req.body.no_rm
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
    PasienModel.findAll().then( async data => {
        
        var options = [];
        await data.forEach( async (item) => {
            var newItem = {
                id: item.no_rm,
                value: item.no_rm + " - " + item.nama
            };
            await options.push(newItem);
        })

        res.json({
            status: true,
            pesan: "Berhasil Tampil",
            data: options
        })        
    }).catch(err => {
        res.json({
            status: false,
            pesan: "Gagal Tampil : " + err.message,
            data: []
        })
    })
});

router.get('/tampil/:no_rm',function(req,res,next){
	var no_rm = req.params.no_rm;
	PasienModel.findByPk(no_rm).then( data=>{

		res.json({
			status:true,
			pesan:"Berhasil Tampil",
			data: datathis
		});

	}).catch( err=>{
		res.json({
			status: false,
			pesan: "Gagal tampil: " + err.message,
			data:[]
		});
	});
});

module.exports = router;