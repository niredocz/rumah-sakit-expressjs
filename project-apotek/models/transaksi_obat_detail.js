const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbObat = require('./obat.js');
const tbTransObat = require('./transaksi_obat.js');

const tbTransObatDetail = koneksi.define('tb_transaksi_obat_detail', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi_obat: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: tbTransObat,
            key: 'id',
        }
    },
    id_obat: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: tbObat,
            key: 'id',
        }
    },
    jumlah: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    harga: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransObatDetail;