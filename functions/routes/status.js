const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.collection('Student').doc('201301484').get()
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


router.post('/', function(req,res,next){

    var inStuId = req.query.stdId.toString();
    var inRoomTime = req.query.roomTime.toString();

    var deleteStuQuery = {
        Kind_num : 0,
        resTime : 0
    }

    var deleteResQuery = {
        reserved :1,
        stuId : ""
    }
    console.log(inStuId);
    console.log(inRoomTime);

    
    db.collection('Student').doc(inStuId).update(deleteStuQuery);
    db.collection('Kara2').doc(inRoomTime).update(deleteResQuery);

})

module.exports = router;