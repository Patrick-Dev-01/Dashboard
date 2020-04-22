const connection = require('../database/connection');

module.exports = {

    async create(req, res){
        // pegar o id do projeto onde a tarefa sera adicionada
        const { project_id } = req.params;
        // dados da tarefa
        const { title } = req.body;
        const user_id = req.headers.authorization;

        // verificar se uma tarera com o mesmo nome ja existe
        const taskExist = await connection('tasks')
        .where('title', title)
        .andWhere('project_id', project_id)
        .andWhere('User_id', user_id);

        // se existir o sistema nao criará a nova tarefa
        if(taskExist.length > 0){
            return res.status(400).json({error: "A task with this name already exists"});
        }

        await connection('tasks').insert({
            title,
            project_id,
            user_id
        });

        return res.status(201).json({success: "Task created with Successful"});

    },

    async index(req, res){
        const { project_id } = req.params;
        const user_id = req.headers.authorization;

        // selecionar todas as tarefas do projeto desse usuario
        const tasks = await connection('tasks')
        .where('project_id', project_id)
        .andWhere('User_id', user_id)
        .select('task_id','title', 'status');

        res.json(tasks);
    },

    async update(req, res){
        const { status } = req.body;
        const { task_id, project_id } = req.params;
        
        if(status == ''){
            return res.status(401).json({error: 'Status can not be empty!'});
        }
        // o status não pode receber valores diferentes desse 
        if(status != 'parado' && status != 'desenvolvimento' && status != 'concluido'){
            return res.status(401).json({error: 'Status can not recive this value'});
        }

        // verificar se a tarefa
        const task = await connection('tasks')
        .where('task_id', task_id)
        .andWhere('Project_id', project_id);

        // se por ventura ele não achar a tarefa
        if(!task.length > 0){
            return res.status(404).json({error: "Task not found"});
        }

        await connection('tasks')
        .where('task_id', task_id)
        .andWhere('Project_id', project_id)
        .update({
            status: status
        });

        return res.status(202).json({success: "Task updated Successful"});
    },

    async delete(req, res){
        const { task_id, project_id } = req.params;
        const user_id = req.headers.authorization;

        // verificar se a tarefa
        const task = await connection('tasks')
        .where('task_id', task_id)
        .andWhere('Project_id', project_id)
        .andWhere('User_Id'. user_id);

        // se por ventura ele não achar a tarefa
        if(!task.length > 0){
            return res.status(404).json({error: "Task not found"});
        }

        // impedir que um usuario não autorizado delete a tarefa
        if(task.User_Id != user_id){
            return res.status(403).json({error: "Operation not permited" });
        }

        await connection('tasks')
        .where('task_id', task_id)
        .andWhere('Project_id', project_id)
        .andWhere('User_Id', user_id);

        return res.status(204)
    }
}