const Clarifai = require('clarifai');
//const Clarifai = process.env.TRAVIS ? require('clarifai') : require('../src');

const app = new Clarifai.App({
    apiKey:'35c44e09a5874ee08cdd4ce1b71cfc8d'
    });

const handleApiCall = (req, res) => {
    app.models
        .predict("e466caa0619f444ab97497640cefc4dc", req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {

    const {id} = req.body;
    db('users').where('id', '=' ,id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'))  
    }

    module.exports = {
        handleImage:handleImage,
        handleApiCall:handleApiCall
    } ;