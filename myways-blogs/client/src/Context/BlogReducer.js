export const blogReducer = (state,action) => {
    switch(action.type){
        case "update":{
            return {
                ...state,
                blogs:[action.payload]
            }
        }
    }
}