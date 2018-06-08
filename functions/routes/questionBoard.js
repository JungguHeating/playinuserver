const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


var db = admin.firestore();

var boardRef = db.collection('inuLab').doc('board').collection('questionBoard')

/* GET home page. */
router.get('/', function(req, res, next) {
   boardRef.orderBy('textNum','desc').get()
   .then(snapshot => {
       var arrBoard = [];
       snapshot.forEach(doc => {
           arrBoard.push(doc.data());
       });
       console.log(arrBoard);
       res.setHeader('Content-type', 'application/json');
        res.send(arrBoard);
        res.end();
        return ;
   }) 
   .catch(err => {
       console.log('Error getting document', err);
   })
});

router.post('/add', function (req,res,next) {

    var inAuthor = req.query.author;
    var inAtag = req.query.atag;
    var inContent = req.query.content;
    var inTextNum = req.query.textNum;
    var inTitle = req.query.title;

    var addQuery = {
        atga : inAtag,
        author : inAuthor,
        content : inContent,
        textNum : inTextNum,
        title : inTitle
    }



    boardRef.add(addQuery);
    res.send(true);

});
/*
router.post('/button', function(req,res,next) {

    var inTitleNum = Number(req.query.titleNum);
    var inNowPeople = Number(req.query.nowPeople);
    var docId;
    var updateNowpeopleQuery;
    console.log(inNowPeople);
    boardRef.where('titleNum','==',inTitleNum)
    .onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            docId=doc.id;
            updateNowPeopleQuery = {
                nowPeople : inNowPeople
            } 
            
        });
        boardRef.doc(docId).update(updateNowPeopleQuery);
        res.send(true);
        return true;
        
    });*/
    /*
    boardRef.where('id','==','20130044').where('name','==',inInputName).where('upLoadDate','==',inUpLoadDate)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            console.log(doc.data()); 
        })
        console.log(querySnapshot);
        
    })
    .catch(err => {
        console.log ('err~',err);
    })
    /*var updateQuery = {
        now
    }*/

    
//})

module.exports = router;