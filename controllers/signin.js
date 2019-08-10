const handleSignin = (req, res, db, bcrypt)  => {//dependences injection
 //signin route
const {email, password} = req.body;
 if(!email || !password){
    return res.status(400).json('incorrect form sumission');
}
    db.select('email', 'hash').from('login')
        .where('email','=',req.body.email)
        .then(data => 
            { const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
                console.log(isValid);
                if (isValid) {
                    return db.select().table('users')
                        .where('email', '=', req.body.email)
                        .then(user => {
                            res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
                    } else {
                        res.status(400).json('Wrong Credentials');
                    }
                   
            })
            .catch(err => res.status(400).json('Wrong Credentials'))



    /*if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
        { res.json(database.users[0]); 
            console.log(database.users[0])}
    else
        { res.status(400).json('error loggin in'); }*/
};

module.exports = {
    handleSignin:handleSignin
} ;