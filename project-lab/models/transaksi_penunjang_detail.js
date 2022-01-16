const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const tbJenisPenunjang = require('./jenis_penunjang.js');
const tbTransPenunjang = require('./transaksi_penunjang.js');

const tbTransPenunjangDetail = koneksi.define('tb_transaksi_penunjang_detail', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi_penunjang: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references : {
            model: tbTransPenunjang,
            key: 'id'
        }
    },
    id_jenis_penunjang: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references : {
            model: tbJenisPenunjang,
            key: 'id'
        }
    },
    hasil: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    biaya: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    }
}, {
    // Other model options go here
    freezeTableName: true
});

module.exports = tbTransPenunjangDetail;