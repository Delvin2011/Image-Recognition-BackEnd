const express = require('express');
const bodyParse = require('body-parser');// in oreder to use body-parser

/*const app  = express();

app.use(bodyParse.urlencoded({extended:false})) /*x-www-form-urlencoded, for building a server that has a form to be submited.*/
//app.use(bodyParse.json()); /*Can also use a raw, that submits a JSON option*/

/*app.get('/:id',(req, res) => {//how to do a get request in Express
    //properties of request
    //console.log(req.query) //localhost:3000/?name=Tkay&age=27
    //req.body
    //req.header
    //req.header
    console.log(req.params) //localhost:3000/1234 => { id: '1234' }. Can have as much parameters and nest them.
   res.status(404).send("Not found"); 
});*/
//A built server that serves a simple static asset. (public_index.html)
const app = express();
app.use(express.static(__dirname + '/public'))
app.listen(3000);
