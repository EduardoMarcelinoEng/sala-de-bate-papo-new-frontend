const INITIAL_STATE = {
    isLoading: false,
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
        case 'INCLUDE_ROOM':
            return {
                ...state, 
                rooms: [...state.rooms, payload]
            };
        case 'IS_LOADING_ROOM':
            return {
                ...state,
                isLoading: payload
            };
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room=>(room.id === payload.id) ? payload : room)
            };
        case 'DELETE_ROOM':
            return {
                ...state, 
                rooms: state.rooms.filter(room=>room.id != payload.id)
            };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default roomReducer;