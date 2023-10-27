import { combineReducers } from 'redux';
import registrationReducer from '../slices/RegistrationSlice';

const rootReducer = combineReducers({
    registration: registrationReducer,
    // Add other reducers if you have more slices
});

export default rootReducer;
