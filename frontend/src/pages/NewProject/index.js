import React, { useState } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { Book } from '@material-ui/icons';

import Menu from '../Menu/index';
import api from '../../services/api';

function NewProject(){

    const user_id = localStorage.getItem('user_id');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const history = useHistory();

    async function handleNewProject(e){
        e.preventDefault();

        if(name === ''){
            alert('Você precisa dar um nome ao projeto!');
        }

        const data = {
            name,
            description,
            user_id
        }

        try{
            await api.post('project', data, {
                headers: {
                    authorization: user_id
                }
            });
            alert('Você salvou um novo projeto');
            history.push('/');
        }
        catch(err){
            alert(`Algum erro ocorreu ao salvar o projeto`);
        }
    }

    return(
        <>
            <Menu />
            <div className="project-container">
                <section>
                    <Book style={{fontSize: 40}}/>
                    <h2>Criar um novo Projeto</h2>
                        <form onSubmit={handleNewProject}>
                            <label for="name">Nome do Projeto: </label>
                            <input type="text"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            />

                            <label for="description">Descrição:  </label><br></br>
                                <textarea col="40" rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            
                            <button type="submit">Salvar</button>
                        </form>
                </section>
            </div>
        </>
    );
}

export default NewProject;