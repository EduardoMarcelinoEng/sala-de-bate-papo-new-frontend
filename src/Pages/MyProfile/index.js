import React, { useEffect, useState } from "react";
import WrapperMyProfile from "./style";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import http from "../../services/http";
import utils from "../../utils";
import { Navigate, useNavigate } from "react-router-dom";

export default function MyProfile(){

    const { user, isLogged } = useSelector(state=>state.userState);
    const dispatch = useDispatch();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
    const [hasChanges, setHasChanges] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const cancel = ()=>{
        setName(user?.name || "");
        setEmail(user?.email || "");
        setDateOfBirth(user?.dateOfBirth || "");
    }

    const save = ()=>{
        setIsLoading(true);
        http.user.update({ name, email, dateOfBirth })
            .then(result=>{
                utils.createNotification({
                    type: 'success',
                    title: 'As informações do seu perfil foram atualizadas'
                });
                dispatch({
                    type: "LOAD_USER",
                    payload: result.data
                });
            })
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao atualizar informações do seu perfil',
                message: error.response.data
            }))
            .finally(()=>setIsLoading(false));
    }

    useEffect(()=>{

        if(name !== (user?.name || "")) return setHasChanges(true);
        if(email !== (user?.email || "")) return setHasChanges(true);
        if(dateOfBirth !== (user?.dateOfBirth || "")) return setHasChanges(true);
        
        return setHasChanges(false);
    }, [name, email, dateOfBirth, user]);

    useEffect(()=>{
        if(!isLogged){
            dispatch({type: 'LOGOUT'});
            setTimeout(()=>{
                navigate("/login");
            }, 0);
        }
    }, [isLogged]);

    return (
        <WrapperMyProfile className="page">
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            {
                                user?.name ? null : (
                                    <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                )
                            }
                            <Form.Control
                                value={name}
                                onChange={e=>{
                                    if(/\d/.test(e.target.value)) return;
                                    
                                    setName(e.target.value);
                                }}
                                className="shadow-none"
                                type="email"
                                placeholder="Digite o seu nome"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>E-mail</Form.Label>
                            {
                                user?.email ? null : (
                                    <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                )
                            }
                            <Form.Control
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                className="shadow-none"
                                type="email"
                                placeholder="Digite o seu e-mail"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBirth">
                            <Form.Label>Data de nascimento</Form.Label>
                            {
                                user?.dateOfBirth ? null : (
                                    <FontAwesomeIcon className="warning" icon={faCircleExclamation} />
                                )
                            }
                            <Form.Control
                                value={dateOfBirth}
                                onChange={e=>setDateOfBirth(e.target.value)}
                                className="shadow-none"
                                type="date"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {
                    isLoading ? (
                        <Spinner border="animation" />
                    ) : (
                        <>
                            <Button onClick={save} className="save" disabled={!hasChanges}>Salvar</Button>
                            <Button onClick={cancel} className="cancel" disabled={!hasChanges}>Cancelar</Button>
                        </>
                    )
                }
            </Form>
        </WrapperMyProfile>
    );
}