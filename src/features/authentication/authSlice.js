import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"


let user = JSON.parse(localStorage.getItem("user"))
let userType = JSON.parse(localStorage.getItem("type"))

const initialState = {
    user: user ? user : null,
    userType: userType ? userType : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""

}

export const registerUser = createAsyncThunk("/register", async (user, thunkAPI) => {
    try {
        const res =  await authService.registerUser(user)
        thunkAPI.fulfillWithValue(res)
        return res
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk("/", async (user, thunkAPI) => {
    try {
        console.log("IN AUTHSLICE LOGINUSER");

        const res =  await authService.loginUser(user)
        console.log("AUTHSLICE RES: ", res);
        thunkAPI.fulfillWithValue(res)
        return res
    } catch (error) {
        console.log("LOGIN AUTHSLICE ERROR");
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const registerGym = createAsyncThunk("/register", async (gym, thunkAPI) => {
    console.log("IN AUTHSLICE");
    try {
        const res = await authService.registerGym(gym)
        thunkAPI.fulfillWithValue(res)
        return res
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})






const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {     
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        },
        logout: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
            state.user = null
        },
        hideError: (state) => {
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            console.log("REGISTER USER FULFILLED");
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("LOGIN USER FULFILLED");
            console.log("action.payload.token: ", action.payload.token);
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.token
            state.userType = action.payload.type
            console.log("STATE.USER: ", state.user);
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log("LOGIN USER FAILED");
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

    }
})

export const { reset, logout, hideError } = authSlice.actions

export default authSlice.reducer