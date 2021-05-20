


import './Register.css'



import github from "../../assets/img/icons/common/github.svg"
import google from "../../assets/img/icons/common/google.svg"


import "../../assets/vendor/nucleo/css/nucleo.css" 
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"

import "../../assets/css/argon.min.css"

import { useHistory } from "react-router-dom";

import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function Register(props) {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [gamertag, setGamertag]=useState("");

    const history = useHistory();

    async function register() 
    {

        let item={gamertag,email,password} //gamertag,

        let result = await fetch(process.env.REACT_APP_API_URL+"users/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(item)
        });

        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result))
        console.log(result)

        history.push("/dashboard")
        /*
        {
            "email" : "digital@gmail.com",
            "password": "123"
        }*/

    }

   
    return (
       
        <div class="main-content" style={{backgroundColor: "#172b4d"}}>

            <div class="header bg-gradient-primary py-5 py-lg-5 pt-lg-5" >
                <div class="container">
                    <div class="header-body text-center mb-7">
                        <div class="row justify-content-center" >
                            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                <h1 class="text-white">Welcome!</h1>
                                <p class="text-lead text-white">Welcome to your free online Tick Tack Toe Game !</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator separator-bottom separator-skew zindex-100">
                    <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>

            <div class="container mt--8 pb-5" style={{backgroundColor: "#1f2b4d"}}>
                <div class="row justify-content-center" style={{marginBottom: "100px"}}>
                    <div class="col-lg-5 col-md-7">
                        
                    <div class="card shadow border-0 mb-0">
     
                        <div class="card-body px-lg-5 py-lg-5">
                            <div class="text-center text-muted mb-4">
                                <small>Register as a new player </small>
                            </div>
                            <form role="form">

                                <div class="form-group mb-3">
                                    <div class="input-group input-group-merge input-group-alternative">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ni ni-circle-08"></i></span>
                                        </div>
                                        <input 
                                            name="gamertag" 
                                            class="form-control" 
                                            style={{paddingLeft:"10px"}} 
                                            placeholder="gamertag"
                                            onChange={(e)=>setGamertag(e.target.value)}  
                                            type="text" 
                                        />
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group input-group-merge input-group-alternative">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                        </div>
                                        <input 
                                            name="email" 
                                            onChange={(e)=>setEmail(e.target.value)} 
                                            class="form-control" 
                                            style={{paddingLeft:"10px"}} 
                                            placeholder="Email" 
                                            type="email" 
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group input-group-merge input-group-alternative">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                        </div>
                                        <input 
                                            name="password" 
                                            class="form-control" 
                                            style={{paddingLeft:"10px"}}  
                                            placeholder="Password" 
                                            onChange={(e)=>setPassword(e.target.value)} 
                                            type="password" 
                                        />
                                    </div>
                                </div>
                                
                                <div class="custom-control custom-control-alternative custom-checkbox">
                                    <input class="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                    <label class="custom-control-label" for=" customCheckLogin">
                                        <span class="text-muted">Remember me</span>
                                    </label>
                                </div>

                                <div class="text-center">
                                
                                    <button type="button" onClick={register}  class="btn btn-primary my-4">Sign up</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                        </div>
                        <div class="col-6 text-right">
                            <Link to="/login"><a  class="text-light"><small>Already Have an account? Login</small></a></Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;
