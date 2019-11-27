const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.sendFile('/public/pages/index.html', {'root': './'});
})

app.post('/setpoints', (req, res) =>{
    console.log(req.body.points);
    res.send(req.body.points);
})

app.post('/submit', (req, res) =>{
    console.log(req.body);
    res.send("Submitted");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))