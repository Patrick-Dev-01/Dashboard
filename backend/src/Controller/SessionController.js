const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {

    // pegar informações do usuário
    async index(req, res){
        const user_id = req.headers.authorization;

        const user = await connection('users').select('*')
        .where('user_id', user_id);

        res.status(200).json(user);
    },

    // login
    async create(req, res){
        const { email, password } = req.body;

        if(email == ''){
            return res.status(401).json({error: "E-mail is Empty"})
        }

        if(password == ''){
            return res.status(401).json({error: "Password is empty"});
        }
    
        const user = await connection('users')
        .where('email', email)
        .select('password', 'user_id', 'name', 'lastname')
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

            return res.status(200).json(user);
        });
    },
}