const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.collection('Kara').doc("room").get()
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

router.post('/',function(req,res,next) {
    var stuId = req.query.Stu_id;
    var roomNum = req.query.room_num;

    var updateResData = {
        [roomNum] : stuId
    }

    var checkQuery = db.collection('Kara').doc('room').get()
    .then(doc => {
        console.log(roomNum)

        console.log(doc.data()[roomNum]);
        var checkAnswer = doc.data()[roomNum]

        if (checkAnswer !== 1) {
            res.send(false);

        }
        else {
            var updateRoomData = {
                [roomNum] : 0
            }
            var updateQuery = db.collection('Kara').doc('room_res').update(updateResData);
            var updateRoomState = db.collection('Kara').doc('room').update(updateRoomData);
            res.send(true);
        }
        return;
    })
    
    //var updataQuery = db.collection('Kara').doc('room_res').update(updateData);
})
module.exports = router;