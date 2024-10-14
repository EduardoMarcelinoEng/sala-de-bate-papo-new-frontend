const INITIAL_STATE = {
    isLoading: false,
    isLogged: false,
    lastRoomSelected: null,
    registerFinished: false,
    nickname: null,
    user: null
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'SET_NICKNAME':
            return {
                ...state,
                nickname: payload
            };
        case 'LOAD_USER':
            return {
                ...state,
                isLogged: true,
                user: payload,
                registerFinished: payload?.name && payload?.email && payload?.nickname && payload?.dateOfBirth || false,
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
            return Object.assign(INITIAL_STATE, {
                nickname: state.nickname,
                lastRoomSelected: state.lastRoomSelected
            });
        default:
            return state;
    }
}

export default userReducer;