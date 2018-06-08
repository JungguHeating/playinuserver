const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var db = admin.firestore();

var labCalendarRef = db.collection('inuLab').doc('calendar').collection('labCalendar');
var schCalendarRef = db.collection('inuLab').doc('calendar').collection('schCalendar');
/* GET home page. */
router.get('/labCalendar', function(req, res, next) {
    var inLabName = req.query.labName;
    var sendJsonQuery = [];
    console.log(inLabName);

    labCalendarRef.where('labName','==',inLabName)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            sendJsonQuery.push(doc.data());
        })
        console.log(sendJsonQuery);
        res.setHeader('Content-type', 'application/json');
        res.send(sendJsonQuery);
        res.end();
        return ;
        
    });
    /*
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
    }) */
});
router.get('/schCalendar', function(req, res, next) {
    schCalendarRef.get()
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

router.post('/labCalendar', function(req,res,next){
    var inLabName = req.query.labName;
    var inEventName = req.query.eventName;
    var inDate = req.query.date;
    var inStartTime = req.query.startTime;
    var inContent = req.query.content;

    var labInserQuery = {
        labName : inLabName,
        eventName : inEventName,
        date : inDate,
        startTime : inStartTime,
        content : inContent
    };

    labCalendarRef.add(labInserQuery);
    res.send(true);
});

router.post('/schCalendar', function(req,res,next){
    var inSchName = req.query.schName;
    var inEventName = req.query.eventName;
    var inDate = req.query.date;
    var inStartTime = req.query.startTime;
    var inContent = req.query.content;

    var schInserQuery = {
        schName : inSchName,
        eventName : inEventName,
        date : inDate,
        startTime : inStartTime,
        content : inContent
    };

    schCalendarRef.add(schInserQuery);
    res.send(true);
});


router.post('/labCalendar/delete', function(req,res,next){
    var inEventName = req.query.eventName;
    var docId;

    labCalendarRef.where('eventName','==',inEventName)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            docId = doc.id
        })
        labCalendarRef.doc(docId).delete();
        res.send(true);
    })
})
module.exports = router;