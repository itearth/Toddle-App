import React from 'react';
import styles from './Navbar.module.scss';
import companyLogo from '../../../assets/logo.png'; 

function Navbar() {
    return (
        <div className={styles.navbar}>
            <img src={companyLogo} alt="Company Logo" className={styles.logo} />
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/services">Services</a>
            </nav>
        </div>
    );
}

export default Navbar;
