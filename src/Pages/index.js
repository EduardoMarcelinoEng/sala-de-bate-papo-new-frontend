import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import Load from '../Components/Load';
import Layout from '../Components/Layout';
import Login from './Login';
import Chat from './Chat';
import MyProfile from './MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import PreConfig from "../Components/PreConfig";
import utils from '../utils';

function DisconnectSocketIfNotChat({ children }){

    const { socket } = useSelector(state => state.socketState);
    const { urlsUnavailable } = useSelector(state=>state.configState.config);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(socket && !utils.pageCurrentIsChat(urlsUnavailable)){
            socket.disconnect();
            dispatch({
                type: "CONNECT_SOCKET",
                payload: null
            });
        }
    }, [location.pathname]);

    return (
        children
    );
}

export default function Pages(){

    const { isLoading } = useSelector(state => state.pageState);
    
    return (
        <BrowserRouter>
            {
                isLoading ? (
                    <PreConfig>
                        <Load />
                    </PreConfig>
                ) : (
                    <DisconnectSocketIfNotChat>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Layout />}>
                                <Route path="meu-perfil" element={<MyProfile />} />
                                <Route path="" element={<Chat />} />
                                <Route path="*" element={<Chat />} />
                            </Route>
                        </Routes>
                    </DisconnectSocketIfNotChat>
                )
            }
        </BrowserRouter>
    );
}