const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();
/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('Dvd').doc('room').get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            res.setHeader('Content-type', 'application/json');
            res.send(doc.data());
            res.end();
          }
          return console.log('end');
      })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
});

module.exports = router;