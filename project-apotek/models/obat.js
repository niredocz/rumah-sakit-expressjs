const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbObat = koneksi.define('tb_obat', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING(100),
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

module.exports = tbObat;


