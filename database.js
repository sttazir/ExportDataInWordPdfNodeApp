var sql = require('mssql');
var conf = require('./config/config.json').DEV;

var pool = new sql.ConnectionPool({
    user: conf.DB.User,
    password: conf.DB.Password,
    server: conf.DB.Server,
    database: conf.DB.Database
});

module.exports.pool = pool;