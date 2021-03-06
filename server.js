if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const bodyParse = require('body-parser'); //
const cors = require('cors')
const bcrypt = require('bcrypt');
const knex = require('knex');

const signin = require('./controllers/signin');
const signup = require('./controllers/signup');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://pulyermbqtzrqj:ae1538417f09af1da0c524d0e2e07a2d74981b19507820e9fb71becfe6883a0f@ec2-174-129-227-80.compute-1.amazonaws.com:5432/dboa1p6v4uei6t',
        ssl: true
    }
  });
  db.select().table('login').then(data =>{
  });

const app = express();
app.use(bodyParse.json());
app.use(cors());
app.options('*', cors()); 

app.get('/',(req, res) => {
    res.send(process.env.PORT);
});


app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/signup',(req, res) => {signup.handleSignup(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)})
app.put('/image',(req, res) => {image.handleImage(req, res, db) });
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res) });


app.listen( process.env.PORT || 3000);
