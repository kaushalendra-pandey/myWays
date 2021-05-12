const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:50
    },
    author:{
        type:ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true,
        trim:true,
        maxlength:1000
    },
    imageLink:{
        type:String,
        default:"https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?cs=srgb&dl=pexels-antonio-batini%C4%87-4164418.jpg&fm=jpg"
    },
    likes:{
        type:[
            {
                type:ObjectId,
                ref:"User"
            
            }
        ]
    },
    comments:{
        type:Array
    }
},{timestamps:true})

const Blog = mongoose.model("Blog",blogSchema)
module.exports = Blog
