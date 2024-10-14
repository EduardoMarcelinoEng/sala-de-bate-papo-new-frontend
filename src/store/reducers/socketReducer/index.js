const INITIAL_STATE = {
    socket: null,
    isConnected: true
}

const socketReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'CONNECT_SOCKET':
            return { ...state, socket: payload };
        case 'SET_IS_CONNECTED_SOCKET':
            return { ...state, isConnected: payload };
        case 'LOGOUT':
            if(state.socket) state.socket.disconnect();
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default socketReducer;