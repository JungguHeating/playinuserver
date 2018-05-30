const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/timestamp', (request,response) => {
    response.send(`${Date.now()}`);
})

app.get('/timestamp-cached', (request,response) => {
    response.set('Cached-Control','public,max-age=300,s-max-age=600')
    response.send(`${Date.now()}`);
})

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.app = functions.https.onRequest(app);
