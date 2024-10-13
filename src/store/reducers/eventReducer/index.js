const INITIAL_STATE = {
    isLoading: false,
    events: []
}

const eventReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'LOAD_EVENT':
            return {
                ...state, 
                events: payload
            };
        case 'NEW_EVENT':
            return {
                ...state, 
                events: [...state.events, payload]
            };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default eventReducer;