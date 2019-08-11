const express = require('express');
const bodyParse = require('body-parser'); //
const cors = require('cors')
const bcrypt = require('bcrypt');
const knex = require('knex');

const signin = require('./controllers/signin');
const signup = require('./controllers/signup');
const image = require('./controllers/image');
const profile = require('./controllers/profile');


/*const db = knex({
    client: 'pg',//for postgres
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      /*host : 'postgresql-clear-81991', //(Heroku address) for a hosted plartform, we would insert where our data base is hosted
      user : 'postgres',
      password : '1234',
      database : 'smartbrain'
    }
  });*/

  const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

db.connect();


  db.select().table('login').then(data =>{
    //console.log(data);
  });

const app = express();
//app.use(express.static(__dirname + '/public')) //a server that serves simple static assets.
app.use(bodyParse.json());
app.use(cors());
app.options('*', cors()); 

app.get('/',(req, res) => {//how to do a get request in Express (localhost:3000/ - Doind a get request to the root)
    res.send("It is working!"); 
});


app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/signup',(req, res) => {signup.handleSignup(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)})
app.put('/image',(req, res) => {image.handleImage(req, res, db) });
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000);


/*
-/signin --> POST = success/fail
-/signup --> POST = user
-/profile/:userId --> GET = user
-/image --> PUT --> user
*/