const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.collection('Kara2').get()
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
            };
            var updateStuResQuery = {
                Kind_num : 1
            };

            var updateQuery = db.collection('Kara').doc('room_res').update(updateResData);
            var updateRoomState = db.collection('Kara').doc('room').update(updateRoomData);
            var updateStuRes = db.collection('Student').doc([stuId]).update(updateStuResQuery);
            res.send(true);
        }
        return;
    })
    
    //var updataQuery = db.collection('Kara').doc('room_res').update(updateData);
})
module.exports = router;