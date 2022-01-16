const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbPasien = koneksi.define('tb_pasien', {
    // Model attributes are defined here
    no_rm: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_telp: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbPasien;