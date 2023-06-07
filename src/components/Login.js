import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMTG7jN4xeeOjWokC19ghn8-TPnPw6yGE",
  authDomain: "blog-43e2f.firebaseapp.com",
  projectId: "blog-43e2f",
  storageBucket: "blog-43e2f.appspot.com",
  messagingSenderId: "902443032171",
  appId: "1:902443032171:web:5057f82906a8379f2f9b2e",
  measurementId: "G-H3PWBB3WRT",
  databaseURL: 'https://blog-43e2f-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Authenticate user with Firebase Authentication
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect to desired component upon successful login
        navigate("/Display");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div
      style={{
        marginTop:'1rem',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh", // Set min height to 100vh for full viewport height
        background: 'rgb(245,226,252)',
        background: 'linear-gradient(23deg, rgba(245,226,252,0.7301514355742297) 0%, rgba(251,245,220,1) 80%, rgba(251,251,251,0.8758096988795518) 100%)'
      }}
    >
      <div style={{fontSize:"40px", fontWeight:'500',marginBottom:'10px'}}>
      LogIn
      </div>
      <form onSubmit={handleLogin} style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Email"

          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ width: "300px", height: "40px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ width: "300px", height: "40px", marginBottom: "10px" }}
        />
        <br />
        <button
          type="submit"
          style={{ borderRadius: "5px", alignSelf: "left", backgroundColor:"#8bb1b5", alignItems:'center'}}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
