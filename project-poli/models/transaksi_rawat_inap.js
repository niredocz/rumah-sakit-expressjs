const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbTransRawatInap = koneksi.define('tb_transaksi_rawat_inap', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pasien: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    kamar: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    checkout: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransRawatInap;