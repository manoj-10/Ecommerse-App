import React, { useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const BASE_URL = 'http://13.235.87.215:4000'

function Login(){
    const [showSignup, setShowSignup] = useState(false)

    const loginFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        }
        axios.post(BASE_URL + "/api/v1/user/login", data)
        .then(function(response){
            console.log(response);
            if(response.data.success){
                localStorage.setItem("username", response.data.data.username);
                localStorage.setItem("userId", response.data.data.userId);
                localStorage.setItem("token", response.data.data.token);
                window.location.href = "/home"
            }
        })
        .catch(function(error){
            console.log("error");
        })
    }

    const signupFn = () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        const data = {
            username: username.value,
            password: password.value
        }
        axios.post(BASE_URL + "/api/v1/user/signup", data)
           .then(function(response){
               console.log(response);
               if(response.data.success){
                   localStorage.setItem("username", response.data.data.username);
                   localStorage.setItem("userId", response.data.data.userId);
                   localStorage.setItem("token", response.data.data.token);
                   window.location.href = "/home"
               }
           })
           .catch(function(error){
               console.log("error");
           });
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup)
    }
    return(
        <div id='loginPage'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h2 className='home-title text-center'>Welcome to e-commerse app</h2>
                        {!showSignup ? (<div className='login-wrapper'>
                            <h4 className='text-center'>Login</h4>
                            <div className='input-group'>
                                <input type='text' className='form-control' placeholder='Username' id='username' />
                            </div>
                            <div className='input-group'>
                                <input type='password' className='form-control' placeholder='password' id='password' />
                            </div>
                            <div className='input-group'>
                                <input type='submit' className='form-control btn btn-primary' value='Login as a user' onClick={loginFn} />
                            </div>
                            <div className='signup-btn text-center text-info' onClick={toggleSignup}>Don't have an account? sign-up</div>
                            <div className='auth-error-msg text-danger text-center'></div>
                        </div>) : (<div className='login-wrapper'>
                            <h4 className='text-center'>sign-up</h4>
                            <div className='input-group'>
                                <input type='text' className='form-control' placeholder='Username' id='username' />
                            </div>
                            <div className='input-group'>
                                <input type='password' className='form-control' placeholder='password' id='password' />
                            </div>
                            <div className='input-group'>
                                <input type='submit' className='form-control btn btn-primary' value='Sign up as a user' onClick={signupFn} />
                            </div>
                            <div className='signup-btn text-center text-info' onClick={toggleSignup}>already have an account? Login</div>
                            <div className='auth-error-msg text-danger text-center'></div>
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login