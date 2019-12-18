const INITIAL_STATE = {
    id:'',
    jumlahnotif:0,
    totalharga:0,
    tanggal:'',
    bayar:false,
    item: {}
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SHOW_CART':
            return {...state, ...action.payload}
        default:
            return state
    }
}