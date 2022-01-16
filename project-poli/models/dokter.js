const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbPoli = require('./poli.js');

const tbDokter = koneksi.define('tb_dokter', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_poli: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //     model: tbPoli,
        //     key: 'id',
        // }
    },
    nama: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    biaya: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbDokter;


