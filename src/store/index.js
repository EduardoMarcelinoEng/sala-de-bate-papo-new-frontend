import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducers from './reducers';
import { save, load } from "redux-localstorage-simple";

const createStoreWithMiddleware 
    = applyMiddleware(
        save({ states: ["userState"] })
    )(createStore);

const store = createStoreWithMiddleware(
    reducers,    
    load({ states: ["userState"] })
);

export default store;