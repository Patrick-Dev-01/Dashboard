import React from 'react';
// import api from '../../services/api';
import './styles.css';
import { Link, useHistory} from 'react-router-dom';

import { AccountCircle, Home, Assessment, Assignment, Person, ExitToApp } from '@material-ui/icons';

function Menu(){

    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');
    const lastname = localStorage.getItem('user_lastname');

    const history = useHistory();

    if(!user_id || !user_name || !lastname){
        history.push('/login');
    }

    function logout(){
       localStorage.removeItem('user_id');
       localStorage.removeItem('user_name');
       localStorage.removeItem('user_lastname');
    }

    return(
        <div className="menu-container">
            <aside>
                <div className="profile">
                    <AccountCircle className="profile-icon" fontSize="large"/>
                    <p>{user_name} {lastname}</p>
                </div>

                <hr></hr>

                <ul>
                    <Link to="/" className="pages-link">
                        <li>
                            <Home fontSize="large" className="icon-link"/><span id="span-home">Home</span>
                        </li>
                    </Link>
                   
                    <Link to="/indicators" className="pages-link">
                        <li>
                            <Assessment fontSize="large" className="icon-link"/><span id="span-indicators">Indicadores</span>
                        </li>
                    </Link>
                    
                    <Link to="/reports" className="pages-link">
                        <li>
                            <Assignment fontSize="large" className="icon-link"/><span id="span-reports">Relatórios</span>
                        </li>    
                    </Link>
                    
                    <Link to="/profile" className="pages-link">
                        <li>
                            <Person fontSize="large" className="icon-link"/><span id="span-profile">Perfil</span>
                        </li>    
                    </Link>
                    
                    <Link to="/login" className="pages-link" onClick={logout}>
                        <li>
                            <ExitToApp fontSize="large" className="icon-link"/><span id="span-logout">Sair</span>
                        </li>
                    </Link>
                    
                </ul>
            </aside>
        </div>
    );
}

export default Menu;