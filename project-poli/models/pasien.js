var koneksi = require('../koneksi_pendaftaran');
const Sequelize = require('sequelize');
const tbPasien = koneksi.define('tb_pasien', {
    no_rm: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    nama: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    no_telp: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
});
module.exports = tbPasien