const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create(req, res){
        // dados para cadastro
        const { name, lastname, email, password } = req.body;

        if(name == '' || lastname == '' || email == '' || password == '' ){
            res.status(400).json({Error: "Some Fields are Empty!"});
        }

        // verificar se o email digitado ja esta cadastrado no banco de dados
        const userExist = await connection('users')
        .select('email')
        .where('email', email);
        
        //se já existir um usuario com este email 
        if(userExist.length > 0){
            // retorne uma mensagem de erro
            return res.status(400).json({error: "this E-mail already exist"});
        }

        // se nao houver erros de validação, encriptar senha e cadastrar no banco
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err){
                res.status(500).json({error: "Unspected error ocurred"});
            }

            const password = hash;

            await connection('users').insert({
                name, 
                lastname,
                email,
                password
            });

            return res.status(201).json({success: "Successful Registered"});
        });
    },

    async update(req, res){
        const { newPassword, newPasswordMatch } = req.body;
        const user_id = req.headers.authorization;

        if(newPassword == ''){
            return res.status(400).json({error: "Password can not be empty!"})
        }

        if(newPassword !== newPasswordMatch){
            return res.status(400).json({error: "The Passwords doesn't match"});
        }

        bcrypt.hash(newPassword, 10, async(err, hash) => {

            if(err){
                return res.status(500).json({error: "Unspected error ocurred"})
            }

            const newPassword = hash;

            await connection('users')
            .where('user_id', user_id)
            .update({
                password: newPassword
            });
            
            return res.status(200).json({success: `Password changed Successful`})
        });
    }

}