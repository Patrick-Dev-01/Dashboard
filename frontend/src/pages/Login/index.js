import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { Email, VpnKey } from '@material-ui/icons';

import register_login_img from '../../assets/register_login_img.jpg';
import lockImg from '../../assets/lock.png';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory(); 

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('login', { email, password });
            // armazenar alguns dados na sessão
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('user_name', response.data.name);
            localStorage.setItem('user_lastname', response.data.lastname);

            history.push('/');
        }
        catch(err){
            alert('Email ou Senha Incorretos');
        }
    }

    return(
        <div className="login-container">
             <div className="login">
                <aside>
                    <img src={register_login_img} alt="" />
                </aside>

                <section>
                    <img src={lockImg} alt=""/>
                    <h1>Área de Login</h1>
                    <div className="login-section">         
                        <form onSubmit={handleLogin}>
                            
                            <label for="email"><Email className="input-icon" fontSize="large" /></label>
                            <input type="email" placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/><br></br>
                            
                            <label for="password"><VpnKey className="input-icon" fontSize="large"/></label>
                            <input type="password" placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/><br></br>
                            
                            <button type="submit">Entrar</button>
                        </form>
                    </div>

                    <Link to="/register" className="redirect">Não tenho cadastro</Link>
                </section>
            </div>
        </div>
    );
}

export default Login;






