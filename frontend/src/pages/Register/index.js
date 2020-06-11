import React, { useState} from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { AccountBox, Email, VpnKey } from '@material-ui/icons';

import register_login_img from '../../assets/register_login_img.jpg';

function Register(){

    // dados de registro
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState(''); 

    const history = useHistory();

    // função que irá cadastrar os usuários
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            lastname,
            email,
            password
        };

        try{
            // chamar api
            await api.post('register', data);
            alert('Cadastro feito com Sucesso');
            history.push('/login');
        }

        catch(err){
            alert(`Ocorreu algum erro durante o cadastro`);
        }
    }

    return(
        <div className="register-container">
    
            <div className="register">
                <aside>
                    <img src={register_login_img} alt="" />
                </aside>
           
                <section>
                    <h2>Cadastre-se gratuitamente</h2>
                    <div className="register-section">         
                        <form onSubmit={handleRegister}>
                            <label for="name"><AccountBox className="input-icon" fontSize="large"/></label>
                            <input type="text" name="" placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}/><br></br>

                            <label for="lastname"><AccountBox className="input-icon" fontSize="large"/></label>
                            <input type="text" placeholder="Sobrenome"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}/><br></br>
                            
                            <label for="email"><Email className="input-icon" fontSize="large" /></label>
                            <input type="email" placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/><br></br>
                            
                            <label for="password"><VpnKey className="input-icon" fontSize="large"/></label>
                            <input type="password" placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/><br></br>
                            
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>

                    <Link to="/login" className="redirect">Ja tenho cadastro</Link>
                </section>
            </div>
        </div>
    );
}

export default Register;