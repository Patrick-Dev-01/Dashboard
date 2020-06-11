import React, { useEffect, useState } from 'react';
import './styles.css';
import { Pie } from 'react-chartjs-2';
import moment from "moment";

import Menu from '../Menu/index';

import api from '../../services/api';

function Reports(){

    const user_id = localStorage.getItem('user_id');
    // array que vai trazer todos os projetos da API
    const [projects, setProjects] = useState([]);
    // id do projeto
    const [project_id, setProject_id] = useState(0);
    // relatorios
    const [reports, setReports] = useState([]);

    // pegar todos os projetos do usuario
    useEffect(() => {
        api.get('/project', {
            headers: {
                authorization: user_id,
            }
        }).then(response => {
            setProjects(response.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [user_id]);

    useEffect(() => {
        api.get(`report/${project_id}`, {
            headers: {
                authorization: user_id
            }
        }).then(response => {
            setReports(response.data);
        }).catch(err =>{
            console.log('erro ao carregar os relatórios deste projeto: ' + err)
        })
    }, [user_id, project_id]);

    return(
        <>
          <Menu />
          <div className="reports-container">
                <article>
                    <select onChange={(e) => setProject_id(e.target.value)}>
                        <option value="0">Selecione um projeto</option>
                            { projects.map(project => (
                                <option key={project.project_id} 
                                value={project.project_id}>{project.name}</option>
                            ))}
                    </select>
                </article>

                <section>
                {reports.length > 0 ? reports.map(report => (
                    <div className="report" key={report.report_id}>
                        <strong>Data do Relatório: {moment(report.created_at).format('LLL')}</strong>
                        <Pie data={{
                            labels: ['Concluído', 'Desenvolvimento', 'Parado'],
                            title: 'Tarefas',
                            datasets: [
                                {
                                    data: [report.complete, report.development, report.stoped],
                                    backgroundColor: [
                                        'rgb(45, 173, 45)',
                                        'rgb(73, 73, 4)',
                                        'rgb(141, 8, 8)'
                                    ],
                                }
                            ],
                            borderWidth: 1,
                            borderColor: 'black',
                        }}
                        options={{
                            responsive: true,
                        }}/>
                        <p>Total de tarefas: {report.complete + report.development + report.stoped}</p>
                        <hr></hr>
                    <p>{report.report}</p><br></br>
                    </div>
                )) : (<span>Você não tem relatórios neste projeto</span>)} 
                </section>
          </div>
        </>
    );
}

export default Reports;