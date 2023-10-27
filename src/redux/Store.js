import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/Root-reducer';

const store = configureStore({
    reducer: rootReducer,
});

export default store;
