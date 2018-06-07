const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var serviceAccount = require('../important/playground-dac96ced6142.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
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
        res.end();
      }
      return ;
  })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    return ;
});

router.post('/',function(req,res,next) {
    var data = {
        name : '홍길동'
    };
    var setDoc = db.collection('test_set').doc('main').set(data)
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    res.send("work");
});

module.exports = router;