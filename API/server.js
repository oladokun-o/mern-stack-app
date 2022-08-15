const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
console.log('environment    ', process.env.ENVIRONMENT)
console.log('PORT    ', process.env.PORT)
console.log('MONGO_CONNECTION_STRING    ', process.env.MONGO_CONNECTION_STRING)
if(process.env.ENVIRONMENT !== 'production') {
    require('dotenv').config()
}


const userController = require('./controller/user-control')



const app = express();
app.use(cors())
const port = process.env.PORT || 3080;

app.use(express.static(path.join(__dirname, './ui/build')));
app.use(bodyParser.json());
app.get('/', (req, res) => { res.send('Hello from Heroku!')});
app.get('/api/users', (req, res) => {
    userController.getUsers().then(data => res.json(data));
});

app.post('/api/user', (req, res) => {
    userController.createUser(req.body.user).then(data => res.json(data));
});

app.post('/api/send-data', (req, res) => {
    userController.sendData(req, res).then(data => 
        //res.json(data)
        console.log(data)
    );
});

app.put('/api/user', (req, res) => {
    userController.updateUser(req.body.user).then(data => res.json(data));
});

app.delete('/api/user/:id', (req, res) => {
    userController.deleteUser(req.params.id).then(data => res.json(data));
});

app.delete('/api/users/:id', (req, res) => {
    userController.deleteAllSelectedUser(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './ui/build/index.html'));
});



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
});