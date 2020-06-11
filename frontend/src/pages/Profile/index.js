import React, { useEffect, useState } from 'react';
import './styles.css';
import { AccountBox, Lock } from "@material-ui/icons";

import Menu from '../../pages/Menu';

import api from '../../services/api';

function Profile(){

    const user_id = localStorage.getItem('user_id');

    const [profile, setProfile] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');

    useEffect(() => {
        api.get('user', {
            headers: {
                authorization: user_id
            }
        }).then(response => {
            setProfile(response.data);
        }).catch(err => {
            alert('Não foi possivel trazer as informações');
        })
    }, [user_id]);

    async function handleChangePassword(e){
        e.preventDefault();

        if(password !== passwordMatch){
            alert('As senhas não batem')
        }

        const data = {
            password
        }

        try{
            await api.put(`user`, data, {
                headers: {
                    authorization: user_id
                }
            });
            alert('Senha alterada com sucesso!');
        }

        catch{
            alert('Algum erro ocorreu ao tentar alterar a senha');
        }
    }

    return(
        <>
        <Menu />
        <div className="profile-container">
            <section>
                {profile.map(user => (
                    <div className="user-info" key={user.user_id}>
                        <AccountBox style={{fontSize: 40}}/>
                        <h2>Informações do Usuário</h2>
                        <div className="info">
                            <p> Nome: {user.name} {user.lastname}</p><br></br>
                            <p> Email: {user.email}</p>
                        </div>
                    </div>
                ))}

                <hr></hr>

                <form onSubmit={handleChangePassword}>
                    <Lock fontSize="large" color="black" className="icon" style={{fontSize: 44, margintop: 10}}/>
                    <h2>Alterar Senha</h2>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Nova Senha"/><br></br>
                    <input type="passoerd" onChange={(e) => setPasswordMatch(e.target.value)}
                    placeholder="Confirmar nova Senha"/><br></br>

                    <button type="submit">Salvar</button>
                </form>
            </section>
        </div>
        </>
    );
}

export default Profile;