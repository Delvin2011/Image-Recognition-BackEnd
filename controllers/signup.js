const saltRounds = 10;
const handleSignup = (req, res, db, bcrypt)  => {//dependences injection
    const {email, name, password} = req.body;

    /*const passwordd = bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(hash);
        });
    });*/
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
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
   };
   
   module.exports = {
       handleSignup:handleSignup
   } ;