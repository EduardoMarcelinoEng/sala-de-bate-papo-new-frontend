import axios from "axios";
import config from './../../config';
import store from "../../store";

export default {
    config: {
        findAll(){
            return axios.get(`${config.host}/config`);
        }
    },
    user: {
        findOne(nickname){
            return axios.get(`${config.host}/user/${nickname}`);
        },
        create(nickname){
            return axios.post(`${config.host}/user`, {
                nickname
            });
        },
        update({ name, email, dateOfBirth }){
            return axios.put(`${config.host}/user/${store.getState().userState.user.nickname}`, {
                name, email, dateOfBirth
            });
        }
    },
    room: {
        findOne(url){
            return axios.get(`${config.host}/room`, {
                params: {
                    url
                }
            });
        },
        create(url){
            return axios.post(`${config.host}/room`, {
                url
            });
        }
    }
}