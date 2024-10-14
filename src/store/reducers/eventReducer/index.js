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
        default:
            return state;
    }
}

export default eventReducer;