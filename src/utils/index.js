import { NotificationManager } from 'react-notifications';
import store from '../store';

export default {
    validateRoomURL(str){
        if(typeof str !== "string") return false;
        if(/\-\//.test(str)) return false;
        if(/\/\-/.test(str)) return false;
        if(/\/\//.test(str)) return false;
        if(/\-\-/.test(str)) return false;
        if(!/^(\/([a-z0-9\-])*)*$/.test(str)) return false;
        let urlFormated = str.length > 1 && str.charAt(str.length - 1) ?
            str.replace(/^(.+)\/$/, "$1") :
            str;
        if(store.getState().configState.config.urlsUnavailable.find(urlUnavailable=>new RegExp(`^${urlUnavailable}(/[a-z0-9-])*$`).test(urlFormated))) return false;

        return true;
    },
    createNotification({type, title, message, timing, callback}){
        switch(type) {
            case 'info':
                NotificationManager.info(message, title, timing || 5000);
            break;
            case 'success':
                NotificationManager.success(message, title, timing || 5000);
            break;
            case 'warning':
                NotificationManager.warning(message, title, timing || 5000);
            break;
            case 'error':
                NotificationManager.error(message, title, timing || 5000, callback);
            break;
        }
    }
}