const connection = require('../database/connection');

module.exports = {
    async create(req, res){

        const { name, description } = req.body;
        const User_id = req.headers.authorization;
        // verificar se um projeto com o mesmo nome ja existe
        const projectExist = await connection('projects')
        .where('User_id', User_id).andWhere('name', name)

        if(name == ''){
            return res.status(400).json({error: "Give a Name to the project"})
        }
        // se um projeto com esse nome ja existir, então não podera criar
        if(projectExist.length > 0){
            return res.status(401).json({error: `A project with this name already exist`});
        }
        
        await connection('projects').insert({
            name, 
            description,
            User_id
        });

        return res.status(201).json({success: "New project created with Successful"});
    },

    async index(req, res){
        // pegar o id do usuario logado
        const user_id = req.headers.authorization

        // selecionar todos os projetos exixtentes desse usuario
        const projects = await connection('projects')
        .where('User_id', user_id)
        .select('project_id', 'name', 'description');

        return res.status(200).json(projects);
    },

    async delete(req, res){
        // pegar o id do projeto que vai ser deletado
        const { project_id } = req.params;
        // o id do usuario que esta logado
        const user_id = req.headers.authorization;

        // verificar se o usuario é o dono do projeto
        const project = await connection('projects')
        .where('User_id', user_id)
        .select('User_id')
        .first();

        // se este usuario não for o dono do projeto que vai ser deletado, o sistema não permitirá a deleção
        if(project.user_id != user_id){
            return res.status(403).json({error: "Operation not permited"});
        }

        // se ele for dono, o projeto será deletado
        await connection('projects').where('project_id', project_id).delete()

        return res.status(204)
    }
}