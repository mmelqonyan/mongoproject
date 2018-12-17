var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var app = express();
var ObjectID = require('mongodb').ObjectID
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db;
app.get('/', (req, res) => {//skzbnakan ejum grum e "hello"
    res.send('Hello');
})
app.get('/artists', (req, res) => {//"/artist" ejum grum e artArr json@
    db.collection('artists').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);

        }
        res.send(docs)
    })
})
app.get('/artists/:id', (req, res) => {//"artists/id" hmp id ov grum e hmp ejum
    db.collection('artists').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc.name)
    })
})
app.post('/artists', (req, res) => {//req bodyn vercnum e sarqum object u grum /artistsum
    var artist = {
        name: req.body.name
    };

    console.log(req.body);
    db.collection('artists').insert(artist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
})

app.put('/artists/:id', (req, res) => { //poxum e hmp id i tak exac name mer req ov
    db.collection('artists').updateOne(
        { _id: ObjectID(req.params.id) },
        { $set: { name: req.body.name } },
        (err, result) => {
            if (err) {
                console.log("123")
                console.log(err);
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )
})
app.delete('/artists/:id', (req, res) => {
    db.collection('artists').deleteOne(
        { _id: ObjectID(req.params.id) }, (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})
MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database.db('mybase');
    app.listen(5001, () => {
        console.log("Api app started sucsesfully")
    })
})
