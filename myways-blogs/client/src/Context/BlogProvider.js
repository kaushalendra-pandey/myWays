import React,{useReducer} from 'react'
import { blogReducer } from './BlogReducer'
import { BlogContext } from './Context'

const BlogProvider = (props) => {

    const initialValue = {
        blogs:[]
    }

    const [state,dispatch] = useReducer(blogReducer,initialValue)

    const update = (data) => {
        dispatch({
            type:"update",
            payload:data
        })
    }

    return (


        <BlogContext.Provider value={
            {
                state,
                type:{
                    update
                }
            }
        }>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogProvider

