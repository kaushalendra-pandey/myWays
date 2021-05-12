import { BACKEND_URL } from "../backendUrl"


export const signupHelper = (info) => {
    return fetch(`/api/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json"
        },
        body:JSON.stringify(info)

        })
        .then(res=>{
        return res.json()
        })
        .catch(e=>{
            console.log(e);
        })
}   

export const signinHandler = (info) => {
    console.log(JSON.stringify(info));
    return fetch(`/api/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json"
        },
        body:JSON.stringify(info)

        })
        .then(res=>{
        return res.json()
        })
        .catch(e=>{
            console.log(e);
        })
}

export const isAuthorized = () => {
    if(typeof window === "undefined"){
        return false
    }
    let user = JSON.parse(localStorage.getItem("user"))
 
    if(user){
        return user
    }
    return false
}


export const isAdmin = () => {
    if(typeof window === "undefined"){
        return false
    }
    let user = JSON.parse(localStorage.getItem("user"))
 
    if(user){
        let role = user.role
        if(role === 1){
            return true
        }
    }
    return false
}