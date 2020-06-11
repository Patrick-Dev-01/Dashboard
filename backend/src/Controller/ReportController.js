const connection = require('../database/connection');

module.exports = {

    async create(req, res){
        const { report, complete, development, stoped } = req.body;
        const { project_id } = req.params;
        const user_id = req.headers.authorization;

        // o relatorio não pode ser vazio
        if(report == ''){
            return res.status(401).json({error: `Report can not be empty!`})
        }

        await connection('reports').insert({
            report,
            complete,
            development,
            stoped,
            project_id,
            user_id
        });

        return res.status(201).json({success: `Report created Successful`});
    },

    async index(req, res){
        const { project_id } = req.params;
        const user_id = req.headers.authorization;

        // selecionar todos os relatórios de um determinado projeto do usuario
        const reports = await connection('reports')
        .join('projects', 'projects.project_id', '=', 'reports.Project_Id')
        .where('reports.Project_Id', project_id)
        .andWhere('reports.User_ID', user_id)
        .select(['projects.name', 
        'reports.report_id', 
        'reports.report',
        'reports.complete',
        'reports.development',
        'reports.stoped',
        'reports.created_at'])
        .orderBy('reports.report_id', 'desc');
        
        if(reports.length <= 0){
            return res.status(200).json({warning: 'You have not reports on this project'});
        }

        return res.status(200).json(reports);
    }
}