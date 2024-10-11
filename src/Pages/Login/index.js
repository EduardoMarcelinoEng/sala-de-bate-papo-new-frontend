import React, { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row, Button, Spinner } from "react-bootstrap";
import WrapperLogin from "./style";
import logo from "../../files/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import utils from "../../utils";

export default function Login(){

    const [nickname, setNickname] = useState("");
    const { user, lastRoomSelected } = useSelector(state=>state.userState);
    const [roomName, setRoomName] = useState("/");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(Boolean(user));

    const goRoom = ()=>{
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

    useState(()=>{
        setIsLogged(Boolean(user));
    }, [user]);

    return (
        <WrapperLogin className="page">
            {
                isLogged ? <Navigate replace to={ `${lastRoomSelected?.url}?nickname=${user?.nickname}` } /> : false
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
                    onClick={goRoom}
                >
                    Entrar
                </Button>
            </Form>
        </WrapperLogin>
    );
}