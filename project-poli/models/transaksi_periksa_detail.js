const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbTindakan = require('./tindakan.js');
const tbTransPeriksa = require('./transaksi_periksa.js');

const tbTransPeriksaDetail = koneksi.define('tb_transaksi_periksa_detail', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi_periksa: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //     model: tbTransPeriksa,
        //     key: 'id',
        // }
    },
    id_tindakan: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //     model: tbTindakan,
        //     key: 'id',
        // }
    },
    biaya: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransPeriksaDetail;