
import React from 'react';

import styles from './Login.module.scss';
import Navbar from '../../generics/navbar/Navbar';

const Login = () => {
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // If login is successful, navigate to the dashboard page
   
  };

  return (
    <div>
      <Navbar />
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputField}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
