const INITIAL_STATE = {
    socket: null
}

const socketReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'CONNECT_SOCKET':
            return { ...state, socket: payload };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default socketReducer;