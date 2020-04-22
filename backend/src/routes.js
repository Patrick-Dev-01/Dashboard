const express = require('express');

// controllers
const userController = require('./Controller/UserController');
const sessionController = require('./Controller/SessionController');
const projectController = require('./Controller/ProjectController');
const taskController = require('./Controller/TaskController');
const graphicController = require('./Controller/GraphicController');
const reportController = require('./Controller/ReportController');

// routes
const routes = express.Router();

// rotas de retorno
routes.get('/', userController.index);
routes.get('/project', projectController.index)
routes.get('/task/:project_id', taskController.index);
routes.get('/indicators/:project_id', graphicController.index);
routes.get('/report/:project_id', reportController.index);

// rotas de envio
routes.post('/register', userController.create);
routes.post('/login', sessionController.create);
routes.post('/project', projectController.create);
routes.post('/task/:project_id', taskController.create);
routes.post('/report/:project_id', reportController.create);

// rotas de update
routes.put('/task/:task_id/:project_id', taskController.update)
routes.put('/user', userController.update);

// rotas de deleção
routes.delete('/project/:project_id', projectController.delete)
routes.delete('/task/:task_id/:project:id', taskController.delete);

module.exports = routes;