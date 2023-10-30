import { combineReducers } from 'redux';
import registrationReducer from './slices/RegistrationSlice';
import usersReducer from './slices/UsersSlice'; // Import the new users slice

const rootReducer = combineReducers({
  registration: registrationReducer,
  users: usersReducer, // Add the users slice
  // Add other reducers if you have more slices
});

export default rootReducer;
