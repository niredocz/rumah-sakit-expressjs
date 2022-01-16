const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbDiagnosa = require('./diagnosa.js');
const tbDokter = require('./dokter.js');

const tbTransPeriksa = koneksi.define('tb_transaksi_periksa', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_dokter: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: tbDokter,
            key: 'id',
        }
    },
    id_pasien: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_diagnosa: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //     model: tbDiagnosa,
        //     key: 'id'
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

module.exports = tbTransPeriksa;