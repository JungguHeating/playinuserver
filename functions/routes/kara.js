const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.collection('Kara2').orderBy('orderNum').get()
    .then(
        snapshot => {
        var arr = [];

        snapshot.forEach(doc => {
            arr.push(doc.data());
          
        })
        console.log(arr);
        res.setHeader('Content-type', 'application/json');
        res.send(arr);
        res.end();
        return ;
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

      //밑에는 문서의 정보를 가져오는 함수이고 위에는 컬렉션에서 모든 문서값들을 가져오는 코드이다
        /*doc => {
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
        });*/
});

router.post('/',function(req,res,next) {
    var inStuId = req.query.stdId.toString();
    var inRoomNum = req.query.roomNum;
    var inRoomTime = req.query.roomTime.toString();
    var resRoomTime = req.query.resTime.toString();

    var updateResData = {
        stuId : inStuId
    }



    var checkQuery = db.collection('Kara2').doc(inRoomTime).get()
    .then(doc => {
        var checkAnswer = doc.data().reserved

        if (checkAnswer !== 1) {
            res.send(false);

        }
        else {
            var updateRoomData = {
                reserved : 0
            };
            var updateStuResQuery = {
                Kind_num : 1,
                resTime : resRoomTime
            };

            var updateQuery = db.collection('Kara2').doc(inRoomTime).update(updateResData);
            var updateRoomState = db.collection('Kara2').doc(inRoomTime).update(updateRoomData);
            var updateStuRes = db.collection('Student').doc(inStuId).update(updateStuResQuery);
            res.send(true);
        }
        return;
    })
    
    //var updataQuery = db.collection('Kara').doc('room_res').update(updateData);
})
module.exports = router;