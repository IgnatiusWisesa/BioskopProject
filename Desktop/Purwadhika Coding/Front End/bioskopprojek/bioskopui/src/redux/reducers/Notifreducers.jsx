const INITIAL_STATE = {
    notification: ''
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'PUSH_NOTIF':
            return {...state, ...action.payload}
        default:
            return state
    }
}