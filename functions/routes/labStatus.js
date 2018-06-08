const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();

var statusRef = db.collection('inuLab').doc('lab').collection('info')

/* GET home page. */
router.get('/', function(req, res, next) {
    var inLabId = req.query.labId;
    var StatusQuery = [];

    statusRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            StatusQuery.push(doc.data());
        });
        res.setHeader('Content-type', 'application/json');
        res.send(StatusQuery);
        res.end();
        return ;
    })
    .catch(err => {
        console.log("Error getting document",err)
    })
});

module.exports = router;