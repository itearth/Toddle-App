import { createSlice } from '@reduxjs/toolkit';


const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        name: '',
        email: '',
        password: '',
        uniqueId: '',
    },
    reducers: {
        updateRegistrationField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
    },
});

const generateUniqueId = () => {
  //applying our logic here
};

export const { updateRegistrationField } = registrationSlice.actions;
export default registrationSlice.reducer;
