const Blog = require("../models/blog")

// GET Blog By Id:
const getBlogById = (req,res) => {
    const blogId = req.params.blogId
    Blog.findById(blogId)
    .populate("author","name email")
    .then(data=>{
        return res.json({data})
    }) 
    .catch((e)=>{
        return res.status(422).json({error:e})
    })
    
 }


// Get all the blogs:
const getAllBlogs = (req,res) => {
   Blog.find()
   .populate("author","name email")
   .then(data=>{
       return res.json({data})
   }) 
   .catch((e)=>{
       return res.status(422).json({error:e})
   })
   
}

// Create a new Blog:
const createBlog = (req,res) => {
    console.log(req.body);
    let {title,content,imageLink} = req.body
    author = req.profile._id
    console.log(author);

    // input check:
    if(title === "" || content === ""){
        return res.status(422).json({error:"All Fields are Necessary.."})
    } 

    // if image link in not set by user:
    if(imageLink === ""){
        imageLink=undefined
    }

    //creating new Blog:
    const blog = new Blog({
        title,
        content,
        author,
        imageLink
    })
    blog.save((err,data)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        return res.json({data})
       
    })
}

// update blog:
const updateBlog = async (req,res) => {
    const id = req.params.blogId
    const blog = await Blog.findOne({_id:id})

    // if the user is trying to update the blog create by any other user.

    
    Blog.findByIdAndUpdate(id,
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,data)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            return res.json(data)
        }
        )
 }

 // Delete the blog:
 const deleteBlog = async (req,res) => {
     const _id = req.params.blogId
     try {
        await Blog.findByIdAndDelete(_id)
        return res.json({message:"Succesfully deleted the blog"})
    
     } catch (error) {
         return res.status(422).json({error})
         
     }
     
     

 }

 const likeBlog = async (req,res) => {
    const userId = req.profile._id
    const blogId = req.params.blogId
    
    try {
        let blog = await Blog.findById(blogId).populate("author","name email")
        blog.likes.push(userId)
        blog.save((err,data)=>{
            if(err){
                return res.status(422).json({error:"Please Try again.."})
            }
            return res.json({message:"liked",data})
    })
        
    } catch (error) {
        res.status(422).json({error})
    }
    


 }

module.exports = {getAllBlogs,createBlog,updateBlog,deleteBlog,getBlogById,likeBlog}