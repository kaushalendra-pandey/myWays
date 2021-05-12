import { BACKEND_URL } from "../backendUrl";
const token = JSON.parse(localStorage.getItem('token'))

export const getBlogById = (id) => {
    return fetch(`/api/blog/${id}`)
    .then(res=>{
        return res.json()
        
    })
    .catch(e=>{
        console.log(e);
    })
}

export const allBlogs = () => {
    return fetch(`/api/blogs`)
    .then(res=>{
        return res.json()
    })
    .catch(e=>{
        console.log(e);
    })
}

export const createBlog = (values,token) => {
    return fetch(`/api/createBlog`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    .then(res=>{
        return res.json()
        
    })
    .catch((e)=>{
        console.log(e);
    })
}

export const updateBlog = (values,token,id) => {
    return fetch(`/api/update/blog/${id}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    .then(res=>{
        return res.json()
        
    })
    .catch((e)=>{
        console.log(e);
    })
}


export const deleteBlog = (id) => {
    return fetch(`/api/delete/${id}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(e=>{
        console.log(e);
    })
}


export const likeBlog = (blogId) => {
    return fetch(`/api/like/blog/${blogId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "CONTENT-TYPE":"application/json",
            Authorization : `Bearer ${token}`
        }

    })
    .then(res=>{
        return res.json()
    })
    .catch(e=>{
        console.log(e);
    })
}