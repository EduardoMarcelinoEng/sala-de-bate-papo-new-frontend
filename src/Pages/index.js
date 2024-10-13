import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Load from '../Components/Load';
import Layout from '../Components/Layout';
import Login from './Login';
import Chat from './Chat';
import MyProfile from './MyProfile';
import { useSelector } from 'react-redux';
import PreConfig from "../Components/PreConfig";

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
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Layout />}>
                            <Route path="meu-perfil" element={<MyProfile />} />
                            <Route path="" element={<Chat />} />
                            <Route path="*" element={<Chat />} />
                        </Route>
                    </Routes>
                )
            }
        </BrowserRouter>
    );
}