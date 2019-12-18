export const Notification = (jumlahnotif) =>{
    return{
        type: 'PUSH_NOTIF',
        payload: jumlahnotif
    }
}