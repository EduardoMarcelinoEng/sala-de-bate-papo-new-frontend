import React, { useEffect, useRef, useState } from "react";
import WrapperChat, { WrapperMessage, WrapperUserRoom } from "./style";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { faFaceSmile, faPaperPlane, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker from 'emoji-picker-react';
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../services";
import utils from "../../utils";
import moment from "moment";

function ChatRow({ room, selectChat }){

    const dispatch = useDispatch();
    const { lastRoomSelected } = useSelector(state=>state.userState);
    const getClassName = ()=>{
        return [
            lastRoomSelected.url === room.url ? "active" : "",
            room.isFavorite ? "favorite" : ""
        ].filter(className=>Boolean(className)).join(" ");
    }
    const [isLoadingControlActions, setIsLoadingControlActions] = useState(false);
    const [className, setClassName] = useState(getClassName());
    
    const toFavorite = () => {
        setIsLoadingControlActions(true);
        
        http.room.favorite(room.url)
            .then(result=>dispatch({
                type: "UPDATE_ROOM",
                payload: result.data
            }))
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao favoritar sala',
                message: error.response.data
            }))
            .finally(()=>setIsLoadingControlActions(false));
    }

    const toUnfavorite = () => {
        setIsLoadingControlActions(true);
        
        http.room.unfavorite(room.url)
            .then(result=>dispatch({
                type: "UPDATE_ROOM",
                payload: result.data
            }))
            .catch(error=>utils.createNotification({
                type: 'error',
                title: 'Falha ao desfavoritar sala',
                message: error.response.data
            }))
            .finally(()=>setIsLoadingControlActions(false));
    }

    useEffect(()=>{
        setClassName(getClassName());
    }, [room.isFavorite, lastRoomSelected.url === room.url]);

    return (
        <li onClick={e=>{
            if(["button", "path"].includes(e.target.localName)) return;
            selectChat(room.url);
        }} className={ className }>
            <span>{room.url}</span>
            {
                isLoadingControlActions ? (
                    <Spinner size="sm" border="animation" />
                ) : (
                    <div className="actions">
                        <Button title="Favoritar" onClick={()=>{
                            room.isFavorite ? toUnfavorite() : toFavorite();
                        }}>
                            <FontAwesomeIcon icon={faStar} />
                        </Button>
                    </div>
                )
            }
        </li>
    );
}

function Message({ event }){

    const { user } = useSelector(state=>state.userState);

    return (
        <WrapperMessage className={ event.user.nickname === user.nickname ? "my-message" : ""}>
            <div className="wrapper">
                {
                    event.user.nickname === user.nickname ? null : (
                        <p className="name">{ event.user.name?.replace(/(\w+(\s\w+)?)(\s*\w*)*/, "$1") || event.user.nickname }</p>
                    )
                }
                <p className="text">{ event.message.text }</p>
                <p className="datetime">{ moment(event.message.datetime).format("HH:mm") }</p>
            </div>
        </WrapperMessage>
    );
}

function UserJoinRoom({ event }){

    const { user } = useSelector(state=>state.userState);

    return (
        <WrapperUserRoom>
            <h3 className="info">{ 
                event.user.nickname === user?.nickname ?
                    "Você entrou na sala" :
                    `${ event.user.name?.replace(/(\w+(\s\w+)?)(\s*\w*)*/, "$1") || event.user.nickname } entrou na sala`
            }</h3>
        </WrapperUserRoom>
    );
}

function UserLeaveRoom({ event }){

    const { user } = useSelector(state=>state.userState);

    return (
        <WrapperUserRoom>
            <h3 className="info">{ 
                event.user.nickname === user?.nickname ?
                    "Você saiu da sala" :
                    `${ event.user.name?.replace(/(\w+(\s\w+)?)(\s*\w*)*/, "$1") || event.user.nickname } saiu da sala`
            }</h3>
        </WrapperUserRoom>
    );
}

function DateComponent({ date }){

    let info = "";
    
    (()=>{
        if(moment().format("YYYY-MM-DD") === date){
            info = "Hoje"
            return;
        }

        if(moment().subtract(1, "days").format("YYYY-MM-DD") === date){
            info = "Ontem"
            return;
        }

        info = date;
    })();

    return (
        <h3 className="info">{ info }</h3>
    );
}

export default function Chat(){

    const navigate = useNavigate();
    const socket = useSelector(state=>state.socketState.socket);
    const { events } = useSelector(state=>state.eventState);
    const [isDisabled, setIsDisabled] = useState(false);
    const [tab, setTab] = useState("all");
    const { user } = useSelector(state=>state.userState);
    const { rooms } = useSelector(state=>state.roomState);
    const [registerFinished, setRegisterFinished] = useState(true);
    const [btnEmoticonHidden, setBtnEmoticonHidden] = useState(true);
    const [message, setMessage] = useState("");
    const messageEl = useRef(null);
    const listMessageRef = useRef();
    const selectChat = url => {
        navigate(`${url}?nickname=${user.nickname}`);
    }

    const toBottomScroll = () => {
        listMessageRef.current?.scroll({
            top: listMessageRef.current?.scrollHeight,
            behavior: 'smooth',
        });
    }

    useEffect(()=>{
        setTimeout(()=>{
            if((listMessageRef.current?.scrollHeight - 800) < listMessageRef.current?.scrollTop){
                toBottomScroll();
            }
        }, 0);
    }, [events]);

    const sendMessage = () => {

        setIsDisabled(true);

        socket.emit("chat:send", {
            text: message, url: window.location.pathname
        }, data=>{
            setMessage("");
            setIsDisabled(false);
            toBottomScroll();
        });
    }

    useEffect(()=>{
        setRegisterFinished(user?.name && user?.email && user?.nickname && user?.dateOfBirth);
    }, [user]);

    return (
        <WrapperChat>
            <main>
                <div className="control">
                    <Card>
                        <Card.Header>
                            <Button onClick={()=>setTab("all")} className={tab === "all" ? "active" : ""}>Todos</Button>
                            <Button onClick={()=>setTab("favorites")} className={tab === "favorites" ? "active" : ""}>Favoritas</Button>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-of-chats">
                                {
                                    (tab === "all" ? rooms : rooms.filter(room=>room.isFavorite)).map(room => {
                                        return (
                                            <ChatRow
                                                room={room}
                                                selectChat={selectChat}
                                            />
                                        );
                                    })
                                }
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
                <div className="messages">
                    <div className="list-messages" ref={listMessageRef}>
                        {
                            events.reduce((acc, event)=>{
                                let components = acc[0];
                                let date = acc[1];

                                switch(event.type){
                                    case "USER_JOIN_ROOM":
                                        components.push(<UserJoinRoom event={event} />);
                                    break;
                                    case "USER_LEAVE_ROOM":
                                        components.push(<UserLeaveRoom event={event} />);
                                    break;
                                    case "NEW_MESSAGE":
                                        let datetime = moment(event.message.datetime).format("YYYY-MM-DD");

                                        if(datetime !== date){
                                            date = datetime;
                                            components.push(<DateComponent date={date} />);
                                        }
                                        components.push(<Message event={event} />);
                                    break;
                                }

                                return [components, date];
                            }, [[], null])[0]
                        }
                    </div>
                    <div className='send-message'>
                        <div className={`container-emoticon btn-emoticon${ btnEmoticonHidden ? " hidden" : "" }`}>
                            <button
                                disabled={ !registerFinished || isDisabled }
                                onClick={()=>setBtnEmoticonHidden(!btnEmoticonHidden)}
                                onBlur={e=>{
                                    if(!e.relatedTarget?.classList.contains("epr-emoji")){
                                        setBtnEmoticonHidden(true);
                                    }
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faFaceSmile}
                                />
                            </button>
                            <EmojiPicker
                                onBlur={ e=>setBtnEmoticonHidden(true) }
                                onEmojiClick={e=>{
                                    let newMessage = messageEl.current.value.substring(0, messageEl.current.selectionStart) + e.emoji + messageEl.current.value.substring(messageEl.current.selectionEnd, messageEl.current.value.length);
                                    setMessage(newMessage);
                                    setBtnEmoticonHidden(true);
                                }}
                            />
                        </div>
                        <Form.Control
                            className="shadow-none"
                            ref={ messageEl }
                            disabled={ !registerFinished || isDisabled }
                            type="text"
                            placeholder="Digite uma mensagem"
                            value={message}
                            onChange={e=>setMessage(e.target.value)}
                            onKeyDown={e=>{
                                if(e.key === "Enter"){
                                    sendMessage();
                                }
                            }}
                        />
                        <Button disabled={ !registerFinished || isDisabled } onClick={sendMessage}>
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                            />
                        </Button>
                    </div>
                </div>
            </main>
        </WrapperChat>
    );
}