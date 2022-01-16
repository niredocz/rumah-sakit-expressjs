var koneksi = require('../koneksi_poli');
const Sequelize = require('sequelize');
const transPeriksa = koneksi.define('tb_transaksi_periksa', {
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_dokter: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    id_pasien: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    id_diagnosa: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    biaya: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    },
}, {
    timestamps: true,
    freezeTableName: true
});
module.exports = transPeriksa