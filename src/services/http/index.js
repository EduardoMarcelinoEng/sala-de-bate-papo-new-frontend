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
            return axios.put(`${config.host}/user/${store.getState().userState.nickname}`, {
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
        },
        favorite(url){
            return axios.put(`${config.host}/room/favorite`, {
                url
            }, {
                headers: {
                    auth: store.getState().userState.nickname
                }
            });
        },
        unfavorite(url){
            return axios.put(`${config.host}/room/unfavorite`, {
                url
            }, {
                headers: {
                    auth: store.getState().userState.nickname
                }
            });
        }
    }
}