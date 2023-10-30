import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // to generate unique id's
import styles from "./Registration.module.scss";
import Navbar from "../../generics/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistrationField } from "../../../redux/slices/RegistrationSlice";
import UniqueIdPopup from "../uniqueId/UidPopup";
import { Link } from "react-router-dom";
import { addUser } from "../../../redux/slices/UsersSlice";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    uniqueId: "",
    boardId: "",
  });
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.usersList);
  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);
  const [uniqueIdMessageVisible, setUniqueIdMessageVisible] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [uniqueId, setUniqueId] = useState(""); // State to store the unique ID
  const [initialFormData, setInitialFormData] = useState({
    name: "",
    email: "",
    password: "",
    uniqueId: "",
    boardId: "",
  }); // Store initial form data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((_formData) => {
      return {
        ..._formData,
        [name]: value,
      };
    });
  };

  const handlePasswordFocus = () => {
    setPasswordMessageVisible(true);
  };

  const handlePasswordBlur = () => {
    setPasswordMessageVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the user with entered email already exists
    const userExists = usersList.some((user) => user.email === formData.email);
  
    if (userExists) {
      // Show a message that the user already exists
      alert("User with this email already exists.");
    } else {
      // Dispatching the action to add a new user
      dispatch(addUser(formData));
  
      // Set the registrationSuccessful state to true
      handleRegistrationSuccess();
  
      // Generate the unique ID
      const generatedUniqueId = generateUniqueId();
  
      // Set the unique ID in the state
      setUniqueId(generatedUniqueId);
  
      // Dispatching the action and then updating the Redux state
      dispatch(
        updateRegistrationField({ field: "name", value: formData.name })
      );
      dispatch(
        updateRegistrationField({ field: "email", value: formData.email })
      );
      dispatch(
        updateRegistrationField({
          field: "password",
          value: formData.password,
        })
      );
      dispatch(
        updateRegistrationField({
          field: "uniqueId",
          value: generatedUniqueId,
        })
      );
  
      // Display the unique ID message
      setUniqueIdMessageVisible(true); // Show the message
  
      // Saving user registration data to local storage
      localStorage.setItem(
        "userRegistrationData",
        JSON.stringify(formData)
      );
    }
  };
  

  const handleRegistrationSuccess = () => {
    setRegistrationSuccessful(true);
  };

  // Function to load user registration data from local storage. It will occur during page refresh
  const loadUserRegistrationData = () => {
    const storedData = localStorage.getItem("userRegistrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Clear the local storage data
      localStorage.removeItem("userRegistrationData");
      setFormData(initialFormData); // Set the form data to its initial state
      setInitialFormData(parsedData); // Update initial form data with the stored data
      dispatch(
        updateRegistrationField({
          field: "uniqueId",
          value: parsedData.uniqueId,
        })
      );
    } else {
      // Clear the input fields if there is no stored data
      setFormData(initialFormData);
    }
  };
  
  const generateUniqueId = () => {
    // Generate a unique ID using the uuidv4 function
    return uuidv4();
  };

  const handleUniqueIdPopupClose = () => {
    // Close the popup by hiding the message
    setUniqueIdMessageVisible(false);
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
          <i
            className="fab fa-google"
            style={{ marginRight: "12px", color: "#888" }}
          ></i>{" "}
          {/* Google icon */}
          <i
            className="fab fa-twitter"
            style={{ marginRight: "12px", color: "#888" }}
          ></i>{" "}
          {/* Twitter icon */}
          <i className="fab fa-facebook" style={{ color: "#888" }}></i>{" "}
          {/* Facebook icon */}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              className={styles.inputField}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
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
                Password must contain at least 8 characters and include
                numbers, letters, and special characters.
              </p>
            )}
          </div>
          {/* ... Rest of your input fields */}
          <button className={styles.registerButton} type="submit">
            Register
          </button>
          <div className={styles.loginText}>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
        {registrationSuccessful && (
          <div className={styles.registrationSuccess}>
            Registration Successful!
          </div>
        )}
      </div>
      {uniqueIdMessageVisible && (
        <UniqueIdPopup uniqueId={uniqueId} onClose={handleUniqueIdPopupClose} />
      )}
    </div>
  );
};

export default RegistrationForm;
