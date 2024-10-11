const INITIAL_STATE = {
    isLoading: false,
    lastRoomSelected: null,
    user: null
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'LOAD_USER':
            return {
                ...state, 
                user: payload,
                isLoading: false
            };
        case 'SET_LAST_ROOM_SELECTED_USER':
            return {
                ...state,
                lastRoomSelected: payload
            };
        case 'IS_LOADING_USER':
            return {
                ...state,
                isLoading: payload
            };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default userReducer;