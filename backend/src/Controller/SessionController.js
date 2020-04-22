const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    // login
    async create(req, res){
        const { email, password } = req.body;
    
        const user = await connection('users')
        .where('email', email)
        .select('password')
        .first();

        // se o usuario não existir 
        if(!user){
            return res.status(401).json({Error: "User not found" });
        }

        // se o usuario existir compare a senha com o hash
        bcrypt.compare(password, user.password, async (err, match) => {
            if(err){
                return res.status(500).json({error: `${err}`});
            }
            // se as senhas não baterem
            if(!match){
                return res.status(401).json({Error: "Incorret Password"});
            }

            return res.status(200).json({Success: "Authenticate Successful"});
        });
    }
}