import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { auth } from '../../firebase/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Student = () => {
    const { currentUser } = useAuth();
    const [authUser, setAuthUser] = useState(null);
    const redirectt = useNavigate();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setAuthUser(user);
                setDisplayName(user.displayName);
                
                
            }else {
                setAuthUser(null);
                setDisplayName(null);
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


        <p className='creds'> Student Account <br/> <span>Welcome {` ${displayName}`}</span></p>
        </>
    )
}

export default Student