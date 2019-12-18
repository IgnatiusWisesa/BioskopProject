import { combineReducers } from 'redux'
import Authreducers from './Authreducers'
import CartReducers from './CartReducers'
import Notifreducers from './Notifreducers'

export default combineReducers({
    Auth: Authreducers,
    Cart: CartReducers,
    Notif: Notifreducers
})