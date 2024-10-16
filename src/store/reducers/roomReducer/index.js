const INITIAL_STATE = {
    isLoading: false,
    isLoadingInRoom: true,
    rooms: []
}

const roomReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'LOAD_ROOM':
            return {
                ...state, 
                rooms: payload,
                isLoading: false
            };
        case 'IN_ROOM':
            return {
                ...state, 
                rooms: state.rooms.find(room=>room.url===payload.url) ?
                    state.rooms : [...state.rooms, payload]
            };
        case 'IS_LOADING_IN_ROOM':
            return {
                ...state,
                isLoadingInRoom: payload
            };
        case 'IS_LOADING_ROOM':
            return {
                ...state,
                isLoading: payload
            };
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room=>(room.url === payload.url) ? payload : room)
            };
        case 'DELETE_ROOM':
            return {
                ...state, 
                rooms: state.rooms.filter(room=>room.url != payload.url)
            };
        case 'LOGOUT':
            return {
                ...state,
                rooms: state.rooms.filter(room=>room.url === window.location.pathname)
            };
        default:
            return state;
    }
}

export default roomReducer;