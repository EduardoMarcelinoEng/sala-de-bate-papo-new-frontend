import React, { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row, Button, Spinner } from "react-bootstrap";
import WrapperLogin from "./style";
import logo from "../../files/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../utils";
import { http } from "../../services";

export default function Login(){

    const [nickname, setNickname] = useState("");
    const userState = useSelector(state=>state.userState);
    const [roomName, setRoomName] = useState("/");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async ()=>{
        await http.user.findOne(nickname)
            .then(async resultFindUser=>{
                let user = resultFindUser.data;

                if(!user){
                    await http.user.create(nickname)
                        .then(resultCreateUser=>user = resultCreateUser.data)
                        .catch(error=>utils.createNotification({
                            type: 'error',
                            title: 'Falha ao criar usuário',
                            message: error.response.data
                        }));
                }

                dispatch({
                    type: "LOAD_USER",
                    payload: user
                });

                dispatch({
                    type: "LOAD_ROOM",
                    payload: user.rooms
                });
            })
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao buscar usuário',
                message: error.response.data
            }));

        if(!utils.validateRoomURL(roomName)){
            return utils.createNotification({
                type: 'error',
                title: 'Digite uma url válida!'
            });
        }
        dispatch({
            type: 'IS_LOADING',
            payload: true
        });
        navigate(`${roomName}?nickname=${nickname}`);
    };

    return (
        <WrapperLogin className="page">
            {
                useState.isLogged ? <Navigate replace to={ `${userState.lastRoomSelected?.url}?nickname=${userState.nickname}` } /> : null
            }
            <Form>
                <Image draggable={false} src={logo} />
                <Form.Group className="mb-3" controlId="formNickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        value={nickname}
                        onChange={e=>setNickname(e.target.value)}
                        className="shadow-none"
                        type="text"
                        placeholder="Digite o seu nickname"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRoomName">
                    <Form.Label>URL da sala</Form.Label>
                    <Form.Control
                        value={roomName}
                        onChange={e=>{
                            if(!e.target.value) return setRoomName("/");
                            if(/\-\//.test(e.target.value)) return;
                            if(/\/\-/.test(e.target.value)) return;
                            if(/\/\//.test(e.target.value)) return;
                            if(/\-\-/.test(e.target.value)) return;
                            if(!/^(\/([a-z0-9\-])*)*$/.test(e.target.value)){
                                return;
                            }

                            setRoomName(e.target.value);
                        }}
                        className="mb-2 shadow-none"
                        type="text"
                        placeholder="Digite a url da sala"
                    />
                </Form.Group>
                <Button
                    disabled={!(nickname && roomName)}
                    className='mb-1'
                    variant="primary"
                    onClick={login}
                >
                    Entrar
                </Button>
            </Form>
        </WrapperLogin>
    );
}