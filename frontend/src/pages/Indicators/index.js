import React, { useState, useEffect } from 'react';
import './styles.css';
import { Pie } from 'react-chartjs-2';

import api from '../../services/api';

import Menu from '../Menu/index';

export default function Indicators(){

    const user_id = localStorage.getItem('user_id');
    // array que vai trazer todos os projetos da API
    const [projects, setProjects] = useState([]);
    // id do projeto
    const [project_id, setProject_id] = useState(0);
    // status do projeto
    const [parado, setParado] = useState(0);
    const [desenvolvimento, setDesenvolvimento] = useState(0);
    const [concluido, setConcluido] = useState(0);
    // relatorio
    const [report, setReport]= useState('');

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
        api.get(`indicators/${project_id}`, {
            headers: {
                authorization: user_id
            }
        }).then(response => {
            setParado(response.data.parado.p);
            setDesenvolvimento(response.data.desenvolvimento.d)
            setConcluido(response.data.concluido.c);
        }).catch(err => {
            console.log(err);
        })
    }, [project_id, user_id]);

    const [chartData, setChartData] = useState({});
    // construção do grafico
    const chart = () => {
        setChartData({
            labels: ['Concluído', 'Em Desenvolvimento', 'Parado'],
            title: 'Tarefas',
            datasets: [
                {
                    data: [concluido, desenvolvimento, parado],
                    backgroundColor: [
                        'rgb(45, 173, 45)',
                        'rgb(73, 73, 4)',
                        'rgb(141, 8, 8)'
                    ],
                    borderWidth: 1,
                    borderColor: 'black'
                }
            ]
        });
    }

    async function handleReport(e){

        e.preventDefault();

        let complete = concluido;
        let development = desenvolvimento;
        let stoped = parado;

        const data = {
            report,
            complete,
            development,
            stoped,
        }

        if(project_id === 0){
            alert('Selecione um projeto');
        }

        try{
            await api.post(`report/${project_id}`, data, {
                headers: {
                    authorization: user_id
                }
            });
            alert('Relatório salvo com sucesso');
        }

        catch(err){
            alert(`Houve um erro ao gerar o relatório`);
        }
    }

    return( 
        <div>
            <Menu />

            <div className="indicators-container">
                <article>
                    <select onChange={(e) => setProject_id(e.target.value)} onBlur={chart}>
                            <option value="0">Selecione um projeto</option>
                            { projects.map(project => (
                                <option key={project.project_id} 
                                value={project.project_id}>{project.name}</option>
                            ))}
                    </select>
                </article>
                {(project_id === 0 || (
                    <section>
                    <div style={{ width: '450px', height: '240px' }}>
                        <Pie data={chartData} options={{
                            responsive: true,
                        }} />
                    </div>

                    <strong>Total de Tarefas: { concluido + desenvolvimento + parado } </strong>

                    <form onSubmit={handleReport}>
                        <label>Relatório: </label><br></br>
                        <textarea onChange={(e) => setReport(e.target.value)}></textarea>

                        <button type='submit'>Gerar Relatório</button>
                    </form>
                </section>
                ))}
            </div>
        </div>
    );
}