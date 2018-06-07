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
    var inRoomTime;
    var inKindNum = req.query.kindNum;
    var deleteStuQuery = {
        Kind_num : 0,
        resTime : "",
        roomTime : ""
    }

    var deleteResQuery = {
        reserved : 1,
        stuId : ""
    }
    
    db.collection('Student').doc(inStuId).get()
    .then(doc => {
        if(!doc.exists) {
            res.send(false);
        } else {
            inRoomTime = doc.data().roomTime;
            if(inKindNum == 1) {
                db.collection('Student').doc(inStuId).update(deleteStuQuery);
                db.collection('Kara2').doc(inRoomTime).update(deleteResQuery);
                var unsub = db.collection('Kara').onSnapshot(()=>{});
                unsub();
                console.log("sing work");
            }else if(inKindNum == 2) {
                db.collection('Student').doc(inStuId).update(deleteStuQuery);
                db.collection('Ps4').doc(inRoomTime).update(deleteResQuery);
                var unsub2 = db.collection('Ps4').onSnapshot(()=>{});
                unsub2();
                console.log("ps4 work");
            }else return false;
        }
        return ;
    })
    .catch((err) => {
        console.log('Error getting documents' , err);
    });

/*
    console.log(inRoomTime);
    if(inKindNum == 1) {
        db.collection('Student').doc(inStuId).update(deleteStuQuery);
        db.collection('Kara2').doc(inRoomTime).update(deleteResQuery);
        console.log("sing work");
    }else if(inKindNum == 2) {
        db.collection('Student').doc(inStuId).update(deleteStuQuery);
        db.collection('Ps4').doc(inRoomTime).update(deleteResQuery);
        console.log("ps4 work");
    }else return false;
*/
})

module.exports = router;