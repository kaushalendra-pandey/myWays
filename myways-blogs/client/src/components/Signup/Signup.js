import React,{useState} from 'react'
import { signupHelper } from '../../utilities'
import {Redirect} from "react-router-dom"
import FailureAlert from '../Helpers/FailureAlert'
import Select from "react-select"

const Signup = () => {

    const [values,setValues] = useState({
        name:"",
        email:"",
        phone:"",
        role:0,
        password:"",
        confirmPassword:"",
        success:false,
        error:"",
        loading:false
    })

    const {name,email,phone,password,role,confirmPassword,success,error,loading} = values

    const options =[
        {value:0,label:"user"},
        {value:1,label:"admin"}
    ]

    const onChangeHandler = name => (e) => {
        setValues({
            ...values,
            [name]:e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setValues({...values,loading:true})
        const res = await signupHelper(values)
            if(res.error){
                setValues({...values,success:false,error:res.error,loading:false})
            } else{
                setValues({
                name:"",
                email:"",
                phone:"",
                role:"",
                password:"",
                confirmPassword:"",
                success:true,
                error:"",
                loading:false
            })
        }
    }

    const selectHandler = (e) => {
        console.log(e);
        setValues({
            ...values,
            role:e.value
        })
    }

    const signUpForm = () => {
        return (
            <div className="container row">
                <div className="col-6 offset-4 mt-2 text-center fs-1">
                    <h3 style={{fontSize:"50px"}} className="text-dark"> MyWays</h3>
                    <h2 className="text-dark"> Read to gain..</h2>

                    {
                        loading && (
                            <div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }

                </div>

            <div className="col-4 offset-5 text-center">
            <form>
                <div className="mb-3">
                    <input type="text"
                    value={name} 
                    placeholder="Enter Your Name"
                    onChange={onChangeHandler("name")}
                    className='form-control'
                    />
                 </div>

                <div className="mb-3">
                    <input 
                    type="text" 
                    value={email} 
                    placeholder="Enter Your Email"
                    onChange={onChangeHandler("email")}
                    className='form-control'
                    />
                </div>
                
                <div className="mb-3">
                    <input 
                    type="number" 
                    value={phone} 
                    placeholder="Enter Your Phone Number"
                    onChange={onChangeHandler("phone")}
                    className='form-control'
                    />
                </div>

                <div class="mb-3">
                    <Select options={options} onChange={selectHandler} />
                </div>

                <div className="mb-3">
                    <input 
                    type="password" 
                    value={password} 
                    placeholder="Enter Your Password"
                    onChange={onChangeHandler("password")}
                    className='form-control'
                    />
                </div>

                <div className="mb-3">
                    <input 
                    type="password" 
                    value={confirmPassword} 
                    placeholder="Confirm your password"
                    onChange={onChangeHandler("confirmPassword")}
                    className='form-control'
                    />
                </div>

                <div className="mb-3 d-grip gap-2">
                    <button 
                    className="btn btn-success text-white"
                    onClick={onSubmitHandler}> Signup </button>
                </div>
            </form>

            <p className="text-center mt-3 lh-1 fw-lighter">
                Already have an account? 
                <a style={{textDecoration:"none"}} href="/signin">
                    <h6 style={{color:"#054a91"}} className="text-center mt-1"> 
                        Sign in 
                    </h6>
                </a>
            </p>
            
            </div>
        </div>
        )        
    }
    

    return (
        <div>
            {error && <FailureAlert message={error}/>}
            {success ? <Redirect to="/signin"/> : signUpForm()}
        </div>
    )
    
    
    
}

export default Signup
