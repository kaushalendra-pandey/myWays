import React from 'react'
import {Route,Redirect} from "react-router-dom"
import {isAdmin} from './index'

const AdminRoutes = ({component:Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props=>
            isAdmin() ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname:"/signin",
                    state:{from:props.location}
                }}>
                     
                </Redirect>
            )
            }
        />
    )
}

export default AdminRoutes