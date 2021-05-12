import React,{useContext,useEffect,useState} from 'react'
import { allBlogs, deleteBlog } from '../../utilities/blogCalls'
import {Link} from "react-router-dom"
import Navigation from '../Navigation/Navigation'
import "./Home.css"
import { isAdmin } from '../../utilities/index'


const Home = () => {
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)
    const [admin,setAdmin] = useState(false)
    const [error,setError] = useState("")

    const checkAdmin = () => {
        return isAdmin()
    }


    const deleteHandler = (id) => {
        deleteBlog(id)
        .then(res=>{
            if(res.error){
                setError(res.error)
            }else{
                getBlogs()
            }

        })
        .catch(e=>{
            console.log(e);
        })
    }


    const getBlogs = () => {
        allBlogs()
        .then(res=>{
            if(res.error){
                setError(res.error)
                setLoading(false)
            }
            else{
            setBlogs(res.data)
            setLoading(false)
            }
        })
        setAdmin(checkAdmin())
    }
   
    useEffect(() => {
        getBlogs()
    }, [])
  
    return (
        <>
            <Navigation/>
            {
                error && (
                <div className="container row">
                    <div className="col-6 offset-3 text-center">
                        <p className="alert alert-danger">
                            {error}
                        </p>
                    </div>
                </div>
                )
            }
            <div className="blog__page">
                <h1 className="blog__page__header">Blogs</h1>
                { admin && 
                <button className="btn btn-warning">
                    <Link style={{color:"black",style:"None"}} to="/create">
                         Create 
                    </Link>
                </button>
                }           
                {loading ? <h1 className="loading">Loading...</h1> : ""}
                <div className="blogs">
                    {blogs?.map((blog,idx) => (
                        <>
                            <div key={idx} className="blog">
                                <img src={blog.imageLink} />
                                <div>
                                <h3 className="sourceName">
                                    <span className="badge rounded-pills bg-success">7 min read</span>
                                    <p>
                                        <span className="badge rounded-pills bg-danger">&nbsp;Published on: </span>
                                         <br/> &nbsp;{blog.createdAt.substr(0,10)}</p>
                                    &nbsp;
                                    { admin &&
                                    <Link to={`/update/${blog._id}`}>
                                        <span className="badge rounded-pills bg-warning update-button"> update </span>
                                    </Link>
                                    }
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{`${blog.content.substr(0,100)}...`}</p>
                            </div>
                            <div className="ml-3">
                                { admin &&
                                <button 
                                onClick={()=>deleteHandler(blog._id)} 
                                className="btn btn-danger mt-1"> 
                                    Delete 
                                </button>
                                }
                                <button className="btn btn-primary mt-1">
                                   <Link style={{color:"white" }} to={`/blog/${blog._id}`}> 
                                        Read Here
                                    </Link>
                                </button>
                                </div>
                                           
                                </div>
                           
                            
                        </>
                    ))}

                    {blogs.length == 0 && (
                    <h1 className="mx-auto no__blogs">
                        No blogs available 😞. Search something else to read blogs on the
                        greatest platform.
                        <br/>
                        <Link to="/create">
                            <button className="btn btn-warning"> Create </button>
                        </Link>
                    </h1>
                    )}
                </div>
            </div>
        </>

    )
}

export default Home
