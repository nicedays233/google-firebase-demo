import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCSqcppPWSkl3Q1aJ4g-ik96v9EbrO6M9s",
    authDomain: "travelai-da11c.firebaseapp.com",
    projectId: "travelai-da11c",
    storageBucket: "travelai-da11c.firebasestorage.app",
    messagingSenderId: "912120330974",
    appId: "1:912120330974:web:226ad6678dcf9a613ee04f",
    measurementId: "G-YFF6VE1CPX"
};

initializeApp(firebaseConfig);

const Login = () => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const handleGoogleSignInWithPopup = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                setIsLoggedIn(true)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential)
            })
    }

    const LogOut = () => {
        signOut(auth).then(() => {
            setUser({})
            setIsLoggedIn(false)
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h1>Login</h1>
            {
                isLoggedIn === true ?
                    <button onClick={() => LogOut()}>Log Out</button>
                    :
                    <button onClick={() => handleGoogleSignInWithPopup()}>Sign In with Google</button>
            }
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
            <img src={user.photoURL} alt={user.displayName} />
        </div>
    );
};

export default Login;