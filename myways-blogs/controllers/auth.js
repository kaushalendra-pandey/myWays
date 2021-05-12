const User = require("../models/user")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")
const validator = require("validator")

const signin = async (req,res) => {


    // check by express-validator:
    const errors = validationResult(req)

    // input check:
    if(!errors.isEmpty()){
        return res.status(422).json({error:errors.array()[0].msg})
    }


    const {email,password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(402).json({error:"No such user exist..."})
        }

        // checking password:
        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if(!isPasswordMatched){
            return res.status(402).json({error:"Invalid Credentials.."})
        }
        
        // creating token:
        const token = jwt.sign({_id:user._id},process.env.SECRET)

        //storing token in ac cookie:
        res.cookie("token",token,{expire: new Date() + 9999})

        const {_id,name,role,phone} = user
        res.json({message:"User is logged in successfully",user:{id:_id,name,email,phone,role},token})

    } catch (error) {
        console.log(error);
        res.status(403).json({error:"Some internal error occue"})
    }
    

}

// signout handler:
const signout = (req,res) => {
    res.clearCookie("token")

    res.status(200).json({message:"sign out successfull!!!"})
}


// signup hanadler
const signup = async (req,res) => {
    const {email,name,password,phone,confirmPassword,role} = req.body
   
    //check by express-validator:
    const errors = validationResult(req)

    //input check:
    if(!errors.isEmpty()){
        return res.status(422).json({error:errors.array()[0].msg})
    }



    if(!validator.isNumeric(phone) || phone.length !== 10){
        return res.status(422).json({error:"Invalid Phone number"})
    }

    // if user already exist or not:
    const alreadyExist = await User.findOne({email})
    if(alreadyExist){
        return res.status(422).json({error:"User already exist..."})
    }

    // password and confirm password check:
    if (confirmPassword !== password){
        return res.status(422).json({error:"Passwords not matched"})
    }

    try {
        const user = new User({name,phone,email,password,role})
        await user.save()
        res.json({message:"success",user})

        
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"SOmething went wrong!!!"})
    }
    
    
}

// custom middleware:

// to check if the user is signed in or not:
const isSignedIn = (req,res,next) => {
    const key = req.headers.authorization
    const token = key.slice(7)
    const data = jwt.verify(token,process.env.SECRET)
    if(!data){
        return res.status(422).json({error:"Not Logged In"})
    }
    const id = data._id
    User.findOne({_id:id})
    .then(user=>{
        user.password = undefined
        req.profile=user
        next()
    })
    .catch(e=>{
        return res.status(422).json({error:e})
    })
    
   
 }


// to check the credentials of current logged in user.
const isAuthorized = (req,res,next) => {
    if(req.profile && req.profile.role === 1){
        next()
    }
    res.status(422).json({error:"Not authorized..."})
}

//to check if the user is admin or not:
const isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({error:"You are not authorized for this action.."})
    }
    next()
}

module.exports = {signout,signup,signin,isSignedIn,isAuthorized,isAdmin}