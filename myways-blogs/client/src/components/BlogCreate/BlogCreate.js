import React,{useState} from 'react'
import { createBlog } from '../../utilities/blogCalls'
import FailureAlert from '../Helpers/FailureAlert'
import Navigation from '../Navigation/Navigation'
import "./BlogCreate.css"
import {Redirect} from "react-router-dom"
const token = JSON.parse(localStorage.getItem("token"))

const BlogCreate = () => {

    const[values,setValues] = useState({
        title:"",
        imageLink:"",
        content:"",
        error:"",
        success:"",
        loading:false
    })

    const {title,imageLink,content,error,success,loading} = values

    const onChangeHandler = name => (e) => {
        setValues({
            ...values,
            [name]:e.target.value
        })
    }

    const onSubmitHandler = () => {
        setValues({
            ...values,
            loading:true
        })
        createBlog(values,token)
        .then(res=>{
            if(res.error){
                setValues({
                    ...values,
                    success:"",
                    error:res.error,
                    loading:false
                })
            } else{
                return setValues({
                    ...values,
                    error:"",
                    success:"Blog has been created Successfully...",
                    loading:false
                })
            }
        })
    }

    return (
        <>

        <Navigation/>
        <div className="row editor__block">
            <div className="col-8 offset-2 text-center">
                <h1 className="text-warning"> MyWays Blogs </h1>
            <div className="alert alert-success">
                If You want to change the world, pick up the pen...
            </div>
            {
                loading && (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                )
            }
            {
                error && <FailureAlert message={error}/>
            }

            {
                success && <Redirect to="/"/>
            }
            <div className="form-floating">
                <textarea 
                value={title} 
                onChange={onChangeHandler("title")} 
                className="form-control" 
                placeholder="Leave a comment here" 
                ></textarea>
                <label>Title</label>
            </div>

            <div className="form-floating mt-3">
                <textarea
                value={imageLink} 
                onChange={onChangeHandler("imageLink")} 
                class="form-control" 
                placeholder="Link of the image.."></textarea>
                <label>Link to Image Here</label>
            </div>

            <div className="form-floating blog__input mt-3">
                <textarea 
                value={content}
                onChange={onChangeHandler("content")}
                 class="form-control" 
                 placeholder="Write your blog.."></textarea>
                <label>Your Blog Here</label>
            </div>
                <button onClick={onSubmitHandler} className="btn btn-success mt-3"> Publish </button>
            </div>
           
        </div>
       
        </>
    )
}

export default BlogCreate
