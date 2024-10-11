const INITIAL_STATE = {
    config: {}
}

const configReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'SET_CONFIG':
            return { ...state, config: payload };
        default:
            return state;
    }
}

export default configReducer;