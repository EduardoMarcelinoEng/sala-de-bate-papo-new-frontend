const INITIAL_STATE = {
    isLoading: false,
    users: [],
    usersOnline: []
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case 'LOAD_USER':
            return {
                ...state, 
                users: payload,
                isLoading: false
            };
        case 'LOAD_USER_ONLINE':
            return {
                ...state, 
                usersOnline: payload
            };
        case 'SET_ONLINE_USER_ONLINE':
            if(state.usersOnline.find(user=>user.id === payload.id && user.socketId === payload.socketId)){
                return {
                    ...state
                };
            }
            return {
                ...state, 
                usersOnline: [...state.usersOnline, payload]
            };
        case 'SET_OFFLINE_USER_ONLINE':
            return {
                ...state, 
                usersOnline: state.usersOnline.filter(user=>!(user.id === payload.userId && user.socketId === payload.socketId))
            };
        case 'TOGGLE_ONLINE_USER_ONLINE':
            return {
                ...state, 
                usersOnline: [...state.usersOnline, ...payload.filter(user=>!state.usersOnline.map(u=>u.socketId).includes(user.socketId))]
            };
        case 'TOGGLE_OFFLINE_USER_ONLINE':
            return {
                ...state, 
                usersOnline: state.usersOnline.filter(user=>{
                    return user.id !== payload.userId;
                })
            };
        case 'IS_LOADING_USER':
            return {
                ...state,
                isLoading: payload
            };
        case 'INCLUDE_USER':
            return {
                ...state, 
                users: [...state.users, payload]
            };
        case 'UPDATE_USER':
            return {
                ...state, 
                users: state.users.map(user=>(user.id === payload.id) ? payload : user)
            };
        case 'DELETE_USER':
            return {
                ...state, 
                users: state.users.filter(user=>user.id != payload.id)
            };
        case 'LOGOUT':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default userReducer;