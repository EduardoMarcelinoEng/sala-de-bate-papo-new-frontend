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
        default:
            return state;
    }
}

export default socketReducer;