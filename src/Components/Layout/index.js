import React, { useState, useEffect } from "react";
import WrapperLayout from "./style";
import Logo from './../../files/logo.png';
import LogoResponsive from './../../files/logo-icone.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBars,
    faCircleExclamation,
    faMessage,
    faRightFromBracket,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { Navbar, Image, Nav, Button, Card } from 'react-bootstrap';
import { http } from "../../services";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import {
    Link,
    Outlet,
    useNavigate,
    Navigate
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import utils from "../../utils";

function HeaderResponsive(){
    const dispatch = useDispatch();
    const { roomName } = useParams();

    return (
        <Navbar id="header-responsive" expand="xxl">
            <Navbar.Brand style={{margin: '0 50px'}}>
                <Image src={ Logo } style={{width: '60px'}} fluid />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="mr-auto my-2 my-lg-0"
                navbarScroll
                >
                    <Navbar>
                        <Link to={ `/${roomName}` }>Chat</Link>
                    </Navbar>
                    <Navbar>
                        <Link to={ "/meu-perfil" }>Meu perfil</Link>
                    </Navbar>
                    <Navbar>
                        <Button onClick={()=>dispatch({type: 'LOGOUT'})} variant='link'>Sair</Button>
                    </Navbar>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default function Layout(){

    const [active, setActive] = useState(false);
    const { user, lastRoomSelected } = useSelector(state=>state.userState);
    const [isLogged, setIsLogged] = useState(Boolean(user));
    const [registerFinished, setRegisterFinished] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const dispatch = useDispatch();

    //const isOpen = useSelector(state=>state.notificationState.open);

    const logout = ()=>{
        dispatch({type: 'LOGOUT'});
        setTimeout(()=>{
            navigate('/login');
        }, 500);
    }

    useEffect(()=>{
        setIsLogged(Boolean(user));

        setRegisterFinished(user?.name && user?.email && user?.nickname && user?.dateOfBirth);

        if(user?.nickname){
            setSearchParams({
                nickname: user?.nickname
            });
        }
    }, [user]);

    return (
        <WrapperLayout className={ (active ? "active" : "") }>
            <HeaderResponsive active={ active } />
            {
                !isLogged ? <Navigate replace to={ "/login" } /> : false
            }
            <div className="navigation">
                <ul>
                    <li className="logo">
                        <img src={ !active ? Logo : LogoResponsive } />
                    </li>
                    <Link to={ `${lastRoomSelected?.url}?nickname=${user?.nickname}` }>
                        <li className={ "" + ("/meu-perfil" !== location.pathname ? "active" : "") }>
                            <div className="icon">
                                <FontAwesomeIcon icon={ faMessage } />
                            </div>
                            <p>Chat</p>
                        </li>
                    </Link>
                    <li className="hr">
                        <hr/>
                    </li>
                    <Link to={`/meu-perfil?nickname=${user?.nickname}`}>
                        <li className={ "" + ("/meu-perfil" === location.pathname ? "active" : "") }>
                            <div className="icon">
                                <FontAwesomeIcon icon={ faUser } />
                            </div>
                            <p>Minha conta</p>
                            {
                                registerFinished ? null : (
                                    <div className="icon alert">
                                        <FontAwesomeIcon icon={faCircleExclamation} />
                                    </div>
                                )
                            }
                        </li>
                    </Link>
                    <li onClick={logout}>
                        <div className="icon">
                            <FontAwesomeIcon icon={ faRightFromBracket } />
                        </div>
                        <p>Sair</p>
                    </li>
                </ul>
            </div>
            <div className="main">
                <header>
                    <FontAwesomeIcon
                        className="toggle"
                        onClick={()=>setActive(!active)}
                        icon={ faBars }
                    />
                </header>
                <div>
                    {
                        registerFinished ? null : (
                            <Card className="warning-message">
                                <Card.Body>
                                    <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                    <span>Para enviar mensagem pelo chat complete o seu cadastro.</span>
                                </Card.Body>
                            </Card>
                        )
                    }
                    <Outlet />
                </div>
            </div>
        </WrapperLayout>
    );
}