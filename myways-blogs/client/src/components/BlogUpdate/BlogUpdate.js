import React,{useState,useEffect} from 'react'
import { updateBlog,getBlogById } from '../../utilities/blogCalls'
import FailureAlert from '../Helpers/FailureAlert'
import Navigation from '../Navigation/Navigation'
import "./BlogUpdate.css"
import {Redirect,useParams} from "react-router-dom"
const token = JSON.parse(localStorage.getItem("token"))


const BlogUpdate = () => {
    const {blogId} = useParams()
    const[value,setValue] = useState({
        title:"Loading...",
        imageLink:"Loading...",
        content:"Loading...",
        error:"",
        success:"",
        loading:false
    })

    useEffect(() => {
        getBlogById(blogId)
        .then(res=>{
            setValue({
                ...value,
                title:res.data.title,
                content:res.data.content,
                imageLink:res.data.imageLink
            })
        })
        .catch(e=>{
            console.log(e);
        })
    }, [])

    const {title,imageLink,content,error,success,loading} = value

    const onChangeHandler = name => (e) => {
        setValue({
            ...value,
            [name]:e.target.value
        })
    }

    const onSubmitHandler = () => {
        setValue({
            ...value,
            loading:true
        })
        updateBlog(value,token,blogId)
        .then(res=>{
            if(res.error){
                setValue({
                    ...value,
                    success:"",
                    error:res.error,
                    loading:false
                })
            } else{
                return setValue({
                    ...value,
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
                <button onClick={onSubmitHandler} className="btn btn-success mt-3"> Update </button>
            </div>
        </div>
       
        </>
    )
}

export default BlogUpdate
