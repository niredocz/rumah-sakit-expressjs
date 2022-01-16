const { Sequelize } = require('sequelize');

// Set Connection (database, username, password)
const sequelize = new Sequelize('iak_pendaftaran_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
    sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log('Koneksi berhasil terhubung.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;