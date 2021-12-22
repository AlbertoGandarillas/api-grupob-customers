const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const {CustomerController} = require('./controllers/customer_controller')
const {DocumentController} = require('./controllers/document_controller')
const {UserController} = require('./controllers/user_controller')
const {AuthController} = require('./controllers/auth_controller')

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/customers', CustomerController.create);
app.get('/customers', CustomerController.findAll);
app.get('/customer/:id', CustomerController.findOne);
app.put('/customer/:id', CustomerController.update);
app.delete('/customer/:id', CustomerController.destroy);

app.post('/documents', DocumentController.create);
app.get('/documents', DocumentController.findAll);
app.get('/document/:id', DocumentController.findOne);
app.put('/document/:id', DocumentController.update);
app.delete('/document/:id', DocumentController.destroy);

app.post('/signup', UserController.create)
app.post('/signup_sync', UserController.createSync)

app.post('/login', AuthController.login)

const port = process.env.PORT || 3000;
app.listen(port)