const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbDaftarRawatJalan = koneksi.define('tb_daftar_rawat_jalan', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    no_rm: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_poli: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    }
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbDaftarRawatJalan;