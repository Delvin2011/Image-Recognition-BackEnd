const express = require('express');
const bodyParse = require('body-parser');// in oreder to use body-parser

const app  = express();

app.use(bodyParse.urlencoded({extended:false})) /*x-www-form-urlencoded, for building a server that has a form to be submited.*/
app.use(bodyParse.json()); /*Can also use a raw, that submits a JSON option*/

app.get('/',(req, res) => {//how to do a get request in Express
    res.send("Getting root"); 
});


app.get('/profile',(req, res) => {
    res.send("getting profile"); 
});

app.post('/profile',(req, res) => {
    console.log(req.body)
    const user = {
        name: 'Tkay',
        surname: 'Mular'
    }
    res.send('Success Mr Mular'); 
});

app.listen(3000);


//we can have the delete, put, post methods
/*app.get('/:id',(req, res) => {//how to do a get request in Express
    //console.log(req.query) //what we get when we get a GET query: http://localhost:3000/?name=Takudzwa&age=27 => { name: 'Takudzwa', age: '27' }
   //req.body
   //console.log(req.header) //reads the parameters, localhost:3000/1235
   console.log(req.params)
    res.send("getting root"); 
 });
 
/*app.use((req, res, next) => { //as the request comes thru, will pass thru here before it trickles down
    console.log('<h1>Mr Mulaaar</h1>')
    next(); //for the middleware to keep passing data down use next
    //receives the request and modifies them before passing to the roots (get, post, delete, put)
});*/


/*app.get('/',(req, res) => {//how to do a get request in Express
    const user = {
        name: 'Tkay',
        surname: 'Mular'
    }
    //res.send("Hello Mr Mula"); 
    res.send(user); 

});*/
