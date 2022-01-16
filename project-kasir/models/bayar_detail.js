const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbBayar = require('./bayar.js');

const tbTransBayarDetail = koneksi.define('tb_transaksi_bayar_detail', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi_bayar: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: tbBayar,
            key: 'id',
        }
    },
    jumlah_bayar: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    }
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransBayarDetail;