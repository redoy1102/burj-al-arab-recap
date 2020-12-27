import React, {useContext} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import {UserContext} from "../../App";
import {useHistory, useLocation} from 'react-router-dom'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};

    //fixing start duplicate app
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
    //fixing end duplicate app

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser)
            history.replace(from);

        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div style={{textAlign: "center",marginTop: "30px"}}>
            <button  onClick={handleGoogleSignIn}>Google Sign In</button>

        </div>
    );
};

export default Login;