const handleProfile= (req, res, db)  => {//dependences injection
 
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
    
   };
   
   module.exports = {
       handleProfile:handleProfile
   } ;