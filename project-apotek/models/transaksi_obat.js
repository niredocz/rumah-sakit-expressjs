const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbTransObat = koneksi.define('tb_transaksi_obat', {
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
    },
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransObat;