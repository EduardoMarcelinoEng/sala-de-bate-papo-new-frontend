const INITIAL_STATE = {
    isLoading: false,
    form: {}
}

const formReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'SAVE_FORM':
            return { ...state,
                form: {
                    ...state.form,
                    ...payload
                }
            };
        case 'CLEAR_FORM':
            return { ...state,
                form: {}
            };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default formReducer;