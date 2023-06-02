import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Perform email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    // Create a user using Firebase Authentication
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User creation successful, retrieve the user's unique ID
        const userId = userCredential.user.uid;

        // Save the user data to the Firebase Realtime Database
        const db = getDatabase();
        const userData = {
          email: email,
          // Additional user data...
        };
        const sanitizedUserId = userId.replace(/[.#$[\]/]/g, ''); // Sanitize the userId

        push(ref(db, 'users/' + sanitizedUserId), userData)          .then(() => {
            // User data saved successfully
            setErrorMessage('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            alert('Signup successful!');
          })
          .catch((error) => {
            // Error saving user data
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        // User creation failed, display error message
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
