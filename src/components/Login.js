import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch user data from the Firebase Realtime Database based on the email entered
    db.ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then((snapshot) => {
        const users = snapshot.val();

        // Check if the user exists in the database
        if (users) {
          // Iterate over the users and find the one with matching email
          const userId = Object.keys(users)[0];
          const user = users[userId];

          // Verify the password
          if (user.password === password) {
            // Password is correct, perform login logic here
            // For example, set user session or update app state
            console.log('Login successful');
            navigate('/dashboard'); // Redirect to the dashboard or desired page using the navigate function
          } else {
            // Password is incorrect
            console.log('Incorrect password');
          }
        } else {
          // User not found
          console.log('User not found');
        }
      })
      .catch((error) => {
        console.log('Error fetching user data: ', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
