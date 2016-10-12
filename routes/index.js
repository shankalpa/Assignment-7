var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://localhost:27017/lab1';
const decipher = crypto.createDecipher('aes256', 'asaadsaad');

MongoClient.connect(mongoUrl, function (err, db) {
	console.log("Connected correctly to server");
	findDocuments(db, function () {
		db.close();
	});
});

var encrypted = '';


var findDocuments = function (db, callback) {
	// Get the documents collection 
	var collection = db.collection('data');
	// Find some documents 
	collection.find({}).toArray(function (err, docs) {
		console.log("Found the following records");
		console.log(docs[0].message);
		encrypted = docs[0].message;
		callback(docs);
	});
}

/* GET home page. */
router.get('/', function (req, res) {
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	console.log(decrypted);
    res.render('index.html', { title: 'Express', data: decrypted });
});

module.exports = router;