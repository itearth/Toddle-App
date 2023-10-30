import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; //to generate unique id's
import styles from "./Registration.module.scss";
import Navbar from "../../generics/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistrationField } from "../../../redux/slices/RegistrationSlice";
import UniqueIdPopup from "../uniqueId/UidPopup";
import { Link } from 'react-router-dom'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    uniqueId: "",
    boardId: "",
  });
  const dispatch = useDispatch();
  // const formData = useSelector((state) => state.registration);

  const [passwordMessageVisible, setPasswordMessageVisible] = useState(false);
  const [uniqueIdMessageVisible, setUniqueIdMessageVisible] = useState(false);
  const [uniqueId, setUniqueId] = useState(""); // State to store the unique ID

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

    // Generate the unique ID
    const generatedUniqueId = generateUniqueId();

    // Set the unique ID in the state
    setUniqueId(generatedUniqueId);

    // Dispatching the action and then updating the Redux state
    dispatch(updateRegistrationField({ field: "name", value: formData.name }));
    dispatch(
      updateRegistrationField({ field: "email", value: formData.email })
    );
    dispatch(
      updateRegistrationField({ field: "password", value: formData.password })
    );
    dispatch(
      updateRegistrationField({ field: "uniqueId", value: generatedUniqueId })
    );

    // Display the unique ID message
    setUniqueIdMessageVisible(true); // Show the message

    //       // Dispatch an action for uniqueId
    // dispatch(updateRegistrationField({ field: 'uniqueId', value: formData.uniqueId }));

    // Saving user registration data to local storage
    localStorage.setItem("userRegistrationData", JSON.stringify(formData));
  };

  // Function to load user registration data from local storage. It will occur during page refresh
  const loadUserRegistrationData = () => {
    const storedData = localStorage.getItem("userRegistrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      dispatch(
        updateRegistrationField({
          field: "uniqueId",
          value: parsedData.uniqueId,
        })
      );
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
                Password must contain at least 8 characters and include numbers,
                letters, and special characters.
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
      </div>
      {uniqueIdMessageVisible && (
        <UniqueIdPopup uniqueId={uniqueId} onClose={handleUniqueIdPopupClose} />
      )}
    </div>
  );
};

export default RegistrationForm;
