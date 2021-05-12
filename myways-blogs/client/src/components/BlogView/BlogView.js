import React,{useState,useEffect} from 'react'
import {useParams,Link} from "react-router-dom"
import { isAdmin, isAuthorized } from '../../utilities'
import { getBlogById, likeBlog } from '../../utilities/blogCalls'
import Navigation from '../Navigation/Navigation'

const user = isAuthorized()

const BlogView = () => {
    const {blogId} = useParams()
    
    const [privilege,setPrivilege] = useState(user ? true : false)
    const [alreadyLiked,setAlreadyLiked] = useState(false)
    const [admin,setAdmin] = useState(false)

    const checkAdmin = () => {
        return isAdmin()
    }


    const [value,setValue] = useState({
        title:"",
        author:"",
        content:"",
        imageLink:"",
        likes:[]
    })

    const {title,author,content,imageLink,likes} = value

    const onClickHandler = () => {
        likeBlog(blogId)
        .then(res=>{
            console.log(res.data.likes);
            if(res.message){
                setValue({
                    ...value,
                    title:res.data.title,
                    author:res.data.author.name,
                    content:res.data.content,
                    imageLink:res.data.imageLink,
                    likes:res.data.likes
                })
            }
        })

        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(() => {
        let mounted = true
        getBlogById(blogId)
        .then(res=>{
            if(mounted){
            setValue({
                ...value,
                title:res.data.title,
                author:res.data.author.name,
                content:res.data.content,
                imageLink:res.data.imageLink,
                likes:res.data.likes
            })

            }
        
        })
        .catch(e=>{
            console.log(e);
        })
        setAdmin(checkAdmin())
        return ()=> mounted = false
    }, [])

   
    return (
        <>
            <Navigation/>
            <div className="container row ">
                <div 
                className="col-9 offset-2 mt-5 rounded border border-3 border-warning">
                    
                    <div className="d-flex">

                        <div className="col-10">
                            <h1 className="text-center"> {title} </h1>
                        </div>
                        
                        {
                            admin && (
                            <div className="col-2 text-center">
                                <p className="badge rounded-pills bg-success mt-2">
                                <Link 
                                style={{textDecoration:"none",color:"white",cursor:"pointer"}}
                                to={`/update/${blogId}`}> Edit </Link>
                                </p>
                            </div>
                            )
                        }
                        
                        <hr/>

                    </div>

                    <hr />
                   
                    <h3 className="badge rounded-pills bg-warning text-wrap">
                        Posted By: {author}
                    </h3>
                    <span className="badge rounded-pills bg-warning mx-3">
                        7 min read 
                    </span>

                    <p className="fs-4 lh-sm mt-4">{content}</p>
                    <hr/>
                    <p className="col-1 text-center badges rounded-pill bg-primary text-wrap text-white">
                        {`${likes.length} likes`}
                    </p>
                    

                    { user ?
                ( 
                        <button 
                        onClick={!likes.includes(user.id) ? onClickHandler : ()=>{}} 
                        className={`btn btn-${!likes.includes(user.id) ? `primary` : `secondary`} mt-1 mb-3`}               
                        >
                            {!likes.includes(user.id) ? "Like" : "Liked"} 
                        </button>
                    ) :
                ( <p className="fs-5">
                    <Link style={{textDecoration:"none"}} to="/signin">
                        <span>Signin</span>
                    </Link>  to like and comment </p>)
                }
                    
                </div>
            </div>
            
        </>
    )
}

export default BlogView
