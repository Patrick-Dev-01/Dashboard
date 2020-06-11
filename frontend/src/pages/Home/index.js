import React, { useState, useEffect } from 'react';
import './styles.css';
import { AddBox, Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Menu from '../Menu/index';

export default function Home(){

    const user_id = localStorage.getItem('user_id');
      // array que vai trazer todos os projetos da API
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(''); 
    // id do projeto
    const [project_id, setProject_id] = useState(0);
    const [status, setStatus] = useState('');
    
    // pegar todos os projetos do usuario
    useEffect(() => {
        api.get('/project', {
            headers: {
                authorization: user_id,
            }
        }).then(response => {
            setProjects(response.data);
        })
        .catch(err =>{
            console.log(err)
        })
    }, [user_id]);

    // pegar todas as tarefas do projeto
    useEffect(() => {
        api.get(`/task/${project_id}`, {
            headers: {
                authorization: user_id
            }
        }).then(response => {
            setTasks(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [user_id, project_id, status]);

    // criar uma nova tarefa
    async function handleNewTask(e){
        e.preventDefault();

        if(title === ''){
            alert('a tarefa não pode ser vazia!');
        }

        if(project_id === 0){
            alert('Selecione um projeto');
        }

        const data = {
            title,
            project_id,
            user_id
        }

        try{
            await api.post(`task/${project_id}`, data, {
                headers: {
                    authorization: user_id
                }
            });
        }

        catch(err){
            alert('Algum erro ocorreu ao criar a tarefa');
        }
    }

    async function deleteTask(taskId){

        try{
            await api.delete(`task/${taskId}/${project_id}`, {
                headers: {
                    authorization: user_id
                }
            });
        }

        catch(err){
            alert('Não foi possivel deletar essa tarefa ' + err);
        }
    }

    // função que atualiza o estado da tarefa
    async function handleStatus(taskId){
        const data = {
            status
        }

        if(status === ''){
            return;
        }

        try{
            await api.put(`task/${taskId}/${project_id}`, data, {
                headers: {
                    authorization: user_id
                }
            });
        }

        catch(err){
            alert(`Ocorreu um erro ao atualizar esta tarefa`);
        }
    }

    return(
        <div>
            <Menu />
            <div className="home-container">
                    <article>
                        <Link to="project/new">
                            <AddBox style={{ color: 'green', background: 'white', fontSize: 40}}/>
                        </Link>
                        <select onChange={(e) => setProject_id(e.target.value)}>
                            <option value="">Selecione um Projeto</option>
                        { projects.map(project => (
                            <option key={project.project_id} 
                            value={project.project_id}>{project.name}</option>
                        ))}
                        </select>

                        <form onSubmit={handleNewTask}>
                            <input type="text" placeholder="Adicione uma tarefa a este Projeto" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>

                            <button type="submit">Salvar</button>
                       </form>

                    </article>

                    <section><br></br>
                        { tasks.map(task => (
                            <div className="task" key={ task.task_id }>
                                <Delete className='delete-icon' onClick={() => deleteTask(task.task_id)}></Delete> 
                                <div className="task-title">
                                    <p>{task.title}</p>
                                </div>
                                                           
                                <div className={`task-status task-status-${task.status}`}>

                                    <select onChange={(e) => setStatus(e.target.value)} 
                                    onBlur={() => handleStatus(task.task_id)}>
                                       <option value="concluido">Concluído</option>
                                       <option value="desenvolvimento">Desenvolvimento</option>
                                       <option value="parado">Parado</option>
                                       <option></option>
                                       {/* deixar a primeira letra maiuscula */}
                                       <option value={task.status} selected>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</option>

                                   </select>
                                </div>
                            </div>
                        ))}
                    </section>
            </div>
        </div>
    );
}
