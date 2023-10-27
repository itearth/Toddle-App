import { createSlice } from '@reduxjs/toolkit';


const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        name: '',
        email: '',
        password: '',
    },
    reducers: {
        updateRegistrationField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
    },
});

export const { updateRegistrationField } = registrationSlice.actions;
export default registrationSlice.reducer;
