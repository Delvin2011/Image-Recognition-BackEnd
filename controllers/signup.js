const saltRounds = 10;
const handleSignup = (req, res, db, bcrypt)  => {//dependences injection
    const {email, name, password} = req.body;

    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password,saltRounds);
    console.log('here1');
    db.transaction(trx => 
        {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('logins')
            .returning('email')
            .then(loginEmail => {
                console.log('here2');
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                    console.log('here3');
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
    console.log('here4');
   };
   
   module.exports = {
       handleSignup:handleSignup
   };