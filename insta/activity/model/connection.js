var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@nuj@321',
  database: 'insta'
})

connection.connect();
console.log("working");
module.exports = connection;