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
  db.collection('Student').get()
  .then((snapshot) => {
      snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
      });
  })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    res.send(console.log("index"));
});

module.exports = router;