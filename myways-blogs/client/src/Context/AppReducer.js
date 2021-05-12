const appReducer = (state,action) => {
    switch(action.type){
        case "updateUser":{

            const {_id,name,email,phone,role} = action.payload.user
            const {token} = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload.user))
            localStorage.setItem("token",JSON.stringify(action.payload.token))
            return {
                ...state,
                name,
                email,
                phone,
                token

            }
        }

        case "removeUser" : {
            console.log("in here");
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            return {
                ...state,
                name:"",
                email:'',
                phone:"",
                token:""

            }
        }

    }
}

export default appReducer