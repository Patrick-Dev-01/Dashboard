const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        
        const { project_id } = req.params;
        const user_id = req.headers.authorization;
        
        async function grafico(status, project, user){
            // query que vai retornar valores para o frontend 
             const grafic = await connection('tasks').count()
            .where('status', status)
            .andWhere('Project_id', project)
            .andWhere('User_Id', user)
            .first();

            return grafic;
        }

        const parado = await grafico('parado', project_id, user_id);
        const desenvolvimento = await grafico('desenvolvimento', project_id, user_id);
        const concluido = await grafico('concluido', project_id, user_id);

        /* objeto que armazena os valores do COUNT do status de um projeto para renderizar um grafico para o usuario
        posteriormente no frontend sobre o progresso desse projeto */
        const projectProgress = {
            parado: parado,
            desenvolvimento: desenvolvimento,
            concluido: concluido
        }

        return res.status(200).json(projectProgress);
    }
}