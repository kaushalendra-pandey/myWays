import React,{useReducer} from 'react'
import appReducer from './AppReducer'
import {MainContext} from './Context'

const AppProvider = (props) => {

    const initState = {
        _id:"",
        name:"",
        email:"",
        phone:"",
        token:""
    }

    const [state,dispatch] = useReducer(appReducer,initState)

    const updateUser = (user) => {
        dispatch({
            type:"updateUser",
            payload:user
        })
    }

    const signOut = () => {
        dispatch({
            type:"removeUser",
        })
    }

    return (
        <MainContext.Provider value={
            {
            state,
            type:{
                updateUser,
                signOut
            }
        }
        }>
            {props.children}
        </ MainContext.Provider>
    )
}

export default AppProvider
