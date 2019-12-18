import Axios from 'axios'
import { url } from './../../support/ApiURL'
export const LoginSuccessAction = (datauser) =>{
    return{
        type: 'LOGIN_SUCCESS',
        payload: datauser
    }
}

export const Loginthunk = (username, password) =>{
    return(dispatch)=>{
        dispatch({type: 'LOGIN_LOADING'})
        Axios.get(`${url}users?username=${username}&password=${password}`)
        .then((res)=>{
            if(res.data.length){
                localStorage.setItem('dino',res.data[0].id)
                dispatch(LoginSuccessAction(res.data[0]))
            }
            else{
                dispatch({type:'LOGIN_ERROR', payload:'Wrong password'})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'LOGIN_ERROR',payload:'server error'})
        })
    }
}

export const Login_error =()=>{
    return(dispatch)=>{
        dispatch({type:'LOGIN_ERROR',payload:''})
    }
}