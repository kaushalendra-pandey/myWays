const express = require("express")
const Blog = require("../models/blog")
const {getAllBlogs,createBlog,updateBlog,deleteBlog,getBlogById,likeBlog} = require("../controllers/blog")
const {isSignedIn,isAdmin } = require("../controllers/auth")


const router = express.Router()

router.get("/blog/:blogId",getBlogById)
router.get("/blogs",getAllBlogs)
router.post("/createBlog",isSignedIn,isAdmin,createBlog)
router.put("/update/blog/:blogId",isSignedIn,isAdmin,updateBlog)
router.delete("/delete/:blogId",isSignedIn,isAdmin,deleteBlog)
router.post("/like/blog/:blogId",isSignedIn,likeBlog)


module.exports = router