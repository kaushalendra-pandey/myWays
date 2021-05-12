import React,{useState,useContext} from 'react'
import {MainContext} from '../../Context/Context'
import { signinHandler } from '../../utilities';
import {Redirect} from "react-router-dom"
import FailureAlert from '../Helpers/FailureAlert';
import SuccessAlert from '../Helpers/SuccessAlert';
import "./Signin.css"

const Signin = () => {

    const {state,type} = useContext(MainContext)
   
    const [values,setValues] = useState({
        email:"",
        password:"",
        success:"",
        error:"",
        loading:false
    })

    const {email,password,success,error,loading} = values

    const onChangeHandler = name => (e) => {
        setValues({
            ...values,
            [name]:e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setValues({...values,error:"",success:"",loading:true})
        signinHandler({email,password})
        .then(res=>{
            if(res.error){
                setValues({...values,error:res.error,success:'',loading:false})
            }
            else{
                type.updateUser(res)
                setValues({...values,error:false,success:res.message,loading:false})
            }
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const signinForm = () => {
        return (
        <div className="row">
            <div className="col-6 offset-3 mt-2 text-center fs-1">
                    <h3 style={{fontSize:"50px"}} className="text-dark logo-name">
                        MyWays
                    </h3>
                    <h2 style={{fontSize:"25px"}} className="text-dark"> 
                        Read to Gain..
                </h2>
                {
                    loading && (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                }   
            </div>
            
            <div className="row mt-4">
                <div className="col-4 offset-4">
                    <form>
                        <div className="mb-3">
                            <input type="text"
                                type="email" 
                                className="form-control"
                                onChange={onChangeHandler("email")}
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="mb-3">
                            <input type="password" 
                            type="password" 
                            onChange={onChangeHandler("password")}
                            placeholder="password"
                            className="form-control"
                            />
                        </div>

                        <div className="mb-3 text-center d-grip gap-2">
                            <button 
                            onClick={onSubmitHandler} 
                            className="btn btn-primary ml-3">
                                Signin
                            </button>
                        </div>

                    </form>

                    <div className="col-7 offset-3 mt-4">
                        <p className="text-center lh-1 mt-4">
                                 Dont have an account? 
                               <a href="/signup" style={{textDecoration:"none"}}> 
                                    <h6 style={{color:"#054a91",textDecoration:"none"}} className="text-center">Create Account </h6> 
                                </a>
                        </p>
                    </div>

                </div>

            </div>
                        
        </div>

        )
    }
    return (
        <div className="container">
            {success&&(
                <>
                    <SuccessAlert message={success}/>
                    <Redirect to="/"/>
                </>
            )}
            {error&&<FailureAlert message={error}/>}
            {signinForm()}
        </div>
    )
}

export default Signin
