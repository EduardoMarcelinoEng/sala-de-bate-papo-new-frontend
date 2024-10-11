import store from './../../store';
import socketIOClient from "socket.io-client";
import config from "../../config";

export default {
    connection: {
        connect: ()=>{
            return socketIOClient(config.host, {
                reconnectionDelayMax: 10000,
                auth: {
                    token: store.getState().accountState.token
                }
            });
        }
    }
}