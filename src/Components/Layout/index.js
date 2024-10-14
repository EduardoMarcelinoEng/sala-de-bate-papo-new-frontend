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
    faRightToBracket,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { Navbar, Image, Nav, Button, Card } from 'react-bootstrap';
import { http, websocket } from "../../services";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import {
    Link,
    Outlet
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

function HeaderResponsive(){
    const dispatch = useDispatch();
    const { isLogged, lastRoomSelected, nickname } = useSelector(state=>state.userState);
    const location = useLocation();

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
                        <Link to={ `${lastRoomSelected?.url}?nickname=${nickname}` }>Chat</Link>
                    </Navbar>
                    {
                        isLogged ? (
                            <Navbar>
                                <Link to={ "/meu-perfil" }>Meu perfil</Link>
                            </Navbar>
                        ) : null
                    }             
                    <Navbar>
                        {
                            isLogged ? (
                                <Button onClick={()=>dispatch({type: 'LOGOUT'})} variant='link'>Sair</Button>
                            ) : (
                                <Link to={`/login`}>
                                    <li className={ ("/login" === location.pathname ? "active" : "") }>
                                        <p>Login</p>
                                    </li>
                                </Link>
                            )
                        }
                    </Navbar>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default function Layout(){

    const [active, setActive] = useState(false);
    const { user, lastRoomSelected, nickname, registerFinished, isLogged } = useSelector(state=>state.userState);
    const { socket, isConnected } = useSelector(state=>state.socketState);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { urlsUnavailable } = useSelector(state=>state.configState.config);

    const dispatch = useDispatch();

    const logout = ()=>{
        dispatch({type: 'LOGOUT'});
    }

    useEffect(()=>{
        dispatch({type: 'CONNECT_SOCKET', payload: websocket.connection.connect()});
    }, []);

    const initSocket = ()=>{
        socket.removeAllListeners();

        dispatch({
            type: "IS_LOADING_IN_ROOM",
            payload: true
        });

        socket.emit('room:in', window.location.pathname, data=>{
            dispatch({
                type: "IN_ROOM",
                payload: {
                    url: window.location.pathname
                }
            });

            dispatch({
                type: "SET_LAST_ROOM_SELECTED_USER",
                payload: data
            });

            dispatch({
                type: "LOAD_EVENT",
                payload: [
                    ...data.Messages.map(message=>({
                        type: "NEW_MESSAGE",
                        user: message.User,
                        message: {
                            text: message.text,
                            datetime: message.createdAt
                        },
                        roomURL: window.location.pathname
                    })),
                    {
                        type: "USER_JOIN_ROOM",
                        user: user || {
                            nickname
                        },
                        roomURL: data.url
                    }
                ]
            });

            dispatch({
                type: "IS_LOADING_IN_ROOM",
                payload: false
            });
        });

        socket.on('room:user:entered', data=>{
            if(data.url === window.location.pathname){
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        type: "USER_JOIN_ROOM",
                        user: data.user,
                        roomURL: data.url
                    }
                });
            }
        });

        socket.on('room:user:leave', data=>{
            if(data.url === window.location.pathname){
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        type: "USER_LEAVE_ROOM",
                        user: data.user,
                        roomURL: data.url
                    }
                });
            }
        });

        socket.on('message:new', data=>{
            if(data.roomURL === window.location.pathname){
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        type: "NEW_MESSAGE",
                        user: data.user,
                        message: data.message,
                        roomURL: data.url
                    }
                });
            }
        });

        socket.on('connect', function(){

            socket.removeAllListeners();

            dispatch({
                type: "SET_IS_CONNECTED_SOCKET",
                payload: true
            });

            initSocket();
        });

        socket.on('disconnect', function(){

            dispatch({
                type: "SET_IS_CONNECTED_SOCKET",
                payload: false
            });

        });
    }

    useEffect(()=>{
        if(socket && !urlsUnavailable.find(urlUnavailable=>new RegExp(`^${urlUnavailable}(/[a-z0-9-])*$`).test(window.location.pathname))){
            socket.on('connect', function(){
                initSocket();

                dispatch({
                    type: "SET_IS_CONNECTED_SOCKET",
                    payload: true
                });
            });
        }
    }, [socket, window.location.pathname]);

    useEffect(()=>{
        if(nickname){
            setSearchParams({
                nickname
            });
        }
    }, [user]);

    return (
        <WrapperLayout className={ (active ? "active" : "") }>
            <HeaderResponsive active={ active } />
            <div className="navigation">
                <ul>
                    <li className="logo">
                        <img src={ !active ? Logo : LogoResponsive } />
                    </li>
                    <Link to={ `${lastRoomSelected?.url}?nickname=${nickname}` }>
                        <li className={ ("/meu-perfil" !== location.pathname ? "active" : "") }>
                            <div className="icon">
                                <FontAwesomeIcon icon={ faMessage } />
                            </div>
                            <p>Chat</p>
                        </li>
                    </Link>
                    <li className="hr">
                        <hr/>
                    </li>
                    {
                        isLogged ? (
                            <Link to={`/meu-perfil?nickname=${nickname}`}>
                                <li className={ ("/meu-perfil" === location.pathname ? "active" : "") }>
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
                        ) : null
                    }
                    {
                        isLogged ? (
                            <li onClick={logout}>
                                <div className="icon">
                                    <FontAwesomeIcon icon={ faRightFromBracket } />
                                </div>
                                <p>Sair</p>
                            </li>
                        ) : (
                            <Link to={`/login`}>
                                <li className={ ("/login" === location.pathname ? "active" : "") }>
                                    <div className="icon">
                                        <FontAwesomeIcon icon={ faRightToBracket } />
                                    </div>
                                    <p>Login</p>
                                </li>
                            </Link>
                        )
                    }
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
                        isConnected ? (
                            isLogged ? (
                                registerFinished ? null : (
                                    <Card className="warning-message">
                                        <Card.Body>
                                            <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                            <span>Para enviar mensagem pelo chat complete o seu cadastro.</span>
                                        </Card.Body>
                                    </Card>
                                )
                            ) : (
                                <Card className="warning-message">
                                    <Card.Body>
                                        <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                        <span>Para enviar mensagem pelo chat faça login.</span>
                                    </Card.Body>
                                </Card>
                            )
                        ) : (
                            <Card className="warning-message">
                                <Card.Body>
                                    <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                    <span>Você perdeu conexão com o servidor. Aguarde alguns instantes.</span>
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