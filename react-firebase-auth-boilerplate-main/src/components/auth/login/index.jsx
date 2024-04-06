import React, { useState } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../../firebase/firebase'
import { useAuth } from '../../../contexts/authContext'
import './login.css'
import ReCAPTCHA from "react-google-recaptcha"
import ForgotPassword from '../forgot/forgotPassword'
import Modal from '../../../Modal'

const Login = () => {
    const { userLoggedIn } = useAuth()
    const redirectt = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onChange = (value) => {
        setIsCaptchaVerified(!!value);
      }; 

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);

    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEmail = email;

    if (!isCaptchaVerified) {
        setErrorMessage("Please verify reCAPTCHA.");
      return;
    }
        if (password.length < 8) {
          setErrorMessage("Passwords must have at least 8 characters.");
          return;
        }
      
        signInWithEmailAndPassword(auth, userEmail, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
              console.log(userCredential);
            if (user.email.toLowerCase() === 'kentjalaran@admin.com') {
                redirectt('/home'); 
              } else {
                redirectt('/student');
            } 
            } 
          })
          .catch((error) => {
            setErrorMessage("Invalid Email or Password.");
            console.log(error);
          });
      };
    

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <ReCAPTCHA className="recaptcha-container"  sitekey="6Lel_bEpAAAAADhjgQEf1ZZmuB05re50hiCLZqyQ" onChange={onChange}/>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit" className='btn'> 
                           Login
                        </button>
                        <p className='fpass' onClick={openModal}>Forgot Password? </p>
                    </form>

                                {showModal && (
                            <Modal onClose={closeModal}>
                                <ForgotPassword />
                            </Modal>
                            
                        )}
                   
                    <div className='flex flex-row text-center w-full'>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login