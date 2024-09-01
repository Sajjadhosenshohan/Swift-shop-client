import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    user: null,
}

// state => state?.user.user এই অংশটি স্টোরের পুরো স্টেট থেকে user স্লাইসের user প্রপার্টি নির্বাচন করছে।

export const userSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload

        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer