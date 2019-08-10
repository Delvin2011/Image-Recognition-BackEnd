const express = require('express');
const bodyParse = require('body-parser'); //
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');

const signin = require('./controllers/signin');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',//for postgres
    connection: {
      host : '127.0.0.1', //(localhost address) for a hosted plartform, we would insert where our data base is hosted
      user : 'postgres',
      password : '1234',
      database : 'smartbrain'
    }
  });

  db.select().table('login').then(data =>{
    //console.log(data);
  });

const app = express();
//app.use(express.static(__dirname + '/public')) //a server that serves simple static assets.
app.use(bodyParse.json());
app.use(cors());

const database = {
    users: [
        {
            id:'123',
            name:'Takudzwa',
            email:'takutapfu@gmail.com',
            password:'Delvin',
            entries: 0,
            Joined: new Date()
        },
       
        {
            id:'124',
            name:'Rudo',
            email:'rwdzviti@gmail.com',
            password:'Rudo',
            entries: 0,
            Joined: new Date()
        }        
    ],

    login: [
        {
            id: '987',
            hash:'',
            email: ''
        }
    ]
}

app.get('/',(req, res) => {//how to do a get request in Express (localhost:3000/ - Doind a get request to the root)
    res.send(database.users); 
});


app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt) })

app.post('/signup', (req, res) => {
    const {email, name, password} = req.body;

    /*const passwordd = bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash);
        });
    });*/
    if(!email || !name || !password){
        return res.status(400).json('incorrect form sumission');
    }
    const hash = bcrypt.hashSync(password,saltRounds);
    console.log(hash);
    db.transaction(trx => //create a transact when you want to do more than 2 things at once
        {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
            })
        })
        .then(trx.commit)// for the entries to be added into the users tables from login
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
})

app.get('/profile/:id',(req, res) => {
    const {id} = req.params;
    db.select().table('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))      
});

app.put('/image',(req, res) => {image.handleImage(req, res, db) });
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res) });


app.listen(3000);


/*
-/signin --> POST = success/fail
-/register --> POST = user
-/profile/:userId --> GET = user
-/image --> PUT --> user
*/