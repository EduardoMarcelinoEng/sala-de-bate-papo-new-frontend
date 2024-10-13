import { useDispatch, useSelector } from "react-redux";
import { http } from '../../services';
import utils from '../../utils';
import store from '../../store';
import { useEffect } from "react";

export default function PreConfig({ children }){
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userState);

    const verifyAndCreateUser = async ({ urlsUnavailable }) => {
        
        const searchParams = new URLSearchParams(window.location.search);

        if(!urlsUnavailable.find(urlUnavailable=>new RegExp(`^${urlUnavailable}(/[a-z0-9-])*$`).test(window.location.pathname))){
            const nickname = searchParams.get("nickname") || user?.nickname;

            if(nickname){
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

                        store.dispatch({
                            type: "LOAD_USER",
                            payload: user
                        });

                        store.dispatch({
                            type: "LOAD_ROOM",
                            payload: user.rooms
                        });

                        await http.room.findOne(window.location.pathname)
                            .then(async result=>{
                                let room = result.data;
                                
                                if(!room){
                                    await http.room.create(window.location.pathname)
                                        .then(resultCreateRoom=>room = resultCreateRoom.data)
                                        .catch(error=>utils.createNotification({
                                            type: 'error',
                                            title: 'Falha ao criar sala',
                                            message: error.response.data
                                        }));
                                }

                                dispatch({
                                    type: "SET_LAST_ROOM_SELECTED_USER",
                                    payload: room
                                });
                            });
                    })
                    .catch(error=>{
                        utils.createNotification({
                            type: 'error',
                            title: 'Falha ao buscar usuário',
                            message: error.response.data
                        });

                        window.history.pushState();
                        dispatch({
                            type: "LOGOUT"
                        });
                        window.location.href = "/login";
                    });

                return;
            }
            dispatch({
                type: "LOGOUT"
            });
            window.location.href = "/login";
        }
    }

    useEffect(()=>{
        http.config.findAll()
            .then(async result=>{
                dispatch({
                    type: 'SET_CONFIG',
                    payload: result.data
                });

                await verifyAndCreateUser(result.data);
            })
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao carregar configurações',
                message: error.response.data
            }))
            .finally(()=>dispatch({
                type: "IS_LOADING",
                payload: false
            }));
    }, []);

    return (children);
}