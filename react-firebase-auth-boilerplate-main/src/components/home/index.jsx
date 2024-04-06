import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { auth } from '../../firebase/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './index.css'
import Register from '../auth/register'
import Modal from '../../Modal'

const Home = () => {
    const [authUser, setAuthUser] = useState(null);
    const redirectt = useNavigate();
    const [showSignUpModal,setShowSignUpModal] = useState(null);

    const openSignUpModal = () => {
        setShowSignUpModal(true);
    };
    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setAuthUser(user);
            }else {
                setAuthUser(null);
            }

        });
        return () => unsubscribe();

    }, []);


    const userSignout = () => {
        signOut(auth)
        .then(() => {
            console.log("Sign out Successfully")
            redirectt('/login');
        })
        .catch((err) => console.log(err));
    };


    return (
        <>
        <nav>
            <h2>Login System</h2>
            <button onClick={userSignout}>Logout</button>

        </nav>


        <p className='creds'> Admin Account <br/> <span>Kent Jalaran</span></p>

        <button className='bttn' onClick={openSignUpModal}> Add Student</button>



        <div className="modal">
            {showSignUpModal && (
                <Modal onClose={closeSignUpModal}>
                    <Register />
                </Modal>
                
            )}
        </div>



        </>
    )
}

export default Home