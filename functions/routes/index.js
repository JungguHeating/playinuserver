const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var serviceAccount = require('../important/playground-dac96ced6142.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://playground-e61bc.firebaseio.com"
});

var db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('test_set').doc('main').get()
  .then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        res.setHeader('Content-type', 'application/json');
        res.send(doc.data());
      }
      return console.log('end');
  })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
});

module.exports = router;