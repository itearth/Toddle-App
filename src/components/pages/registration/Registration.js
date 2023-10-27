import React, { useState, useEffect } from 'react';
import styles from './Registration.module.scss';
import Navbar from '../../generics/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistrationField } from '../../../redux/slices/RegistrationSlice';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        uniqueId: '',
        boardId: ''
    });
    const dispatch = useDispatch();
    // const formData = useSelector((state) => state.registration);


    const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);

    const handleChange = (e) => {
        console.log('handleChange called');
        const { name, value } = e.target;
        console.log('Field:', name, 'Value:', value);
        dispatch(updateRegistrationField({ field: name, value }));
    };
    

    const handlePasswordFocus = () => {
        setPasswordMessageVisible(true);
    };

    const handlePasswordBlur = () => {
        setPasswordMessageVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
         // Saving user registration data to local storage
    localStorage.setItem('userRegistrationData', JSON.stringify(formData));
    };

    // Function to load user registration data from local storage. It will occur during page refresh
const loadUserRegistrationData = () => {
    const storedData = localStorage.getItem('userRegistrationData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
        dispatch(updateRegistrationField({ field: 'uniqueId', value: parsedData.uniqueId }));
    }
};

// Call the function to load data when the component mounts
useEffect(() => {
    loadUserRegistrationData();
}, []);

    return (
        <div>
            <Navbar />
        <div className={styles.registrationContainer}>
            
            <h2 className={styles.registrationTitle}>Register Here</h2>
            <div className={styles.socialMediaContainer}>
    <i className="fab fa-google" style={{ marginRight: '12px', color: '#888' }}></i> {/* Google icon */}
    <i className="fab fa-twitter" style={{ marginRight: '12px', color: '#888' }}></i> {/* Twitter icon */}
    <i className="fab fa-facebook" style={{ color: '#888' }}></i> {/* Facebook icon */}
</div>


            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        className={styles.inputField}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        className={styles.inputField}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        className={styles.inputField}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                    />
                    {passwordMessageVisible && (
                        <p className={styles.passwordInfo}>
                            Password must contain at least 8 characters and include numbers, letters, and special characters.
                        </p>
                    )}
                </div>
                {/* ... Rest of your input fields */}
                <button className={styles.registerButton} type="submit">
                    Register
                </button>
                <div className={styles.loginText}>
    Already have an account? <a href="#">Login here</a>
</div>

            </form>
        </div>
        </div>
    );
}

export default RegistrationForm;
