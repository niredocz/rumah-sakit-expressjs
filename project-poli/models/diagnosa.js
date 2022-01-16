const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const tbDiagnosa = koneksi.define('tb_diagnosa', {
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
    }
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbDiagnosa;