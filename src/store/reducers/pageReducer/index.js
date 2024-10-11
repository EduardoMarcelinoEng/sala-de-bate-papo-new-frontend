const INITIAL_STATE = {
    current: '/',
    context: '',
    open: true,
    isLoading: true,
    openModalLogin: false,
    openModalEditProfile: false
}

const pageReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'SET_PAGE':
            return { ...state, current: payload };
        case 'SET_OPEN_MODAL_LOGIN':
            return { ...state, openModalLogin: payload };
        case 'SET_OPEN_MODAL_EDIT_PROFILE':
            return { ...state, openModalEditProfile: payload };
        case 'SET_CONTEXT':
            return { ...state, context: payload };
        case 'TOGGLE':
            return { ...state, open: !state.open };
        case 'IS_LOADING':
            return { ...state, isLoading: payload };
        case 'LOGOUT':
            return Object.assign({}, INITIAL_STATE, {
                isLoading: false
            });
        default:
            return state;
    }
}

export default pageReducer;