const express = require('express')
const bodyParser = require('body-parser')
var admin = require("firebase-admin");
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://xyarduino.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");

app.get('/', (req, res) =>{
    res.sendFile('/public/pages/index.html', {'root': './'});
})

app.post('/setpoints', (req, res) =>{
    console.log(req.body.points);
    res.send(req.body.points);
    var usersRef = ref.child("number");
    usersRef.set(parseInt(req.body.points));
})

app.post('/submit', (req, res) =>{
    console.log(req.body);
    res.send("Submitted");
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
    });
    var usersRef = ref.child("points");
    usersRef.set(req.body);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))