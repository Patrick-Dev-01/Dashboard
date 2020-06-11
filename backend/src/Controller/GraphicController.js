const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        
        const { project_id } = req.params;
        const user_id = req.headers.authorization;
    
        // query que vai retornar valores para o frontend 
        async function progress(status, project_id, user_id,){
            const grafic = await connection('tasks').count(`status as ${status.charAt(0)}`)
            .where('status', status)
            .andWhere('Project_Id', project_id)
            .andWhere('User_Id', user_id)
            .first();

            return grafic;
        }

        const concluido = await progress('concluido', project_id, user_id);
        const desenvolvimento = await progress('desenvolvimento', project_id, user_id);
        const parado = await progress('parado', project_id, user_id);

        projectStatus = {
            concluido: concluido,
            desenvolvimento: desenvolvimento,
            parado: parado
        }

        return res.status(200).json(projectStatus);
    }
}