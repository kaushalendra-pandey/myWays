const User = require("../models/user")
const validator = require("validator")


// populated req.profile with the info of the user.
const getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(403).json({errro:"No such user exist!!"})
        }
        req.profile = user
        next()
    })

}

//get the current user from req.profile
const getUser = (req,res,next) => {
    req.profile.password = undefined
    return res.json(req.profile)
    next()
}


// updating user info:
const updateUser = (req,res,next) => {
    const {name,email} = req.body

    // input check:
    if(!name && !email){
        return res.status(402).json({error:"Invalid inputs.."})
    }

    // check if the input is valid or not 
    if (name && name.length < 4){
        return res.status(402).json({error:"Invalid name"})
    }

    if (email && !validator.isEmail(email)){
        return res.status(402).json({error:"Invalid email"})
    }
    
    
    User.findByIdAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({error:"Yor are not authorized to update!!"})
            }
            user.password=undefined
            res.json(user)
            
        })
}


module.exports = {getUser,getUserById,updateUser}