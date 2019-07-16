var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose()

// var db = require('../database');
var db = new sqlite3.Database('thermometerDb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT temp, sensor FROM temps ORDER BY datetime DESC LIMIT 1';
  // var sql = 'SELECT temp FROM temps';
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.render('index', { title: 'RpiPanel', data: row });
  });
});

module.exports = router;
