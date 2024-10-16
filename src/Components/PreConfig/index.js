import { useDispatch, useSelector } from "react-redux";
import { http } from '../../services';
import utils from '../../utils';
import store from '../../store';
import { useEffect } from "react";

export default function PreConfig({ children }){
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userState);

    const verifyAndCreateUser = async ({ urlsUnavailable }) => {
        
        const searchParams = new URLSearchParams(window.location.search);
        const nickname = searchParams.get("nickname") || userState.user?.nickname || userState.nickname;

        if(window.location.pathname !== "/login"){
            if(!nickname) window.location.href = "/login";
            let user = null;

            await http.user.findOne(nickname)
            .then(async resultFindUser=>{
                user = resultFindUser.data;
            })
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao buscar usuário',
                message: error.response.data
            }));

            if(!user) window.location.href = "/login";
        }

        if(utils.pageCurrentIsChat(urlsUnavailable)){

            if(nickname){

                dispatch({
                    type: "SET_NICKNAME",
                    payload: nickname
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