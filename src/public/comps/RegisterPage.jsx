import React from 'react'
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import AuthWarning from './AuthWarning'
import { registerUser, registerGym } from "../../features/authentication/authSlice"


function RegisterPage({ isError }) {

    const dispatch = useDispatch()

    const [registerFormData, setRegisterFormData] = useState({
        regisName: "",
        regisEmail: "",
        regisPass: "",
        regisCPass: "",
        isUser: true
    })
    const { regisName, regisEmail, regisPass, regisCPass, isUser } = registerFormData

    const setIsUserTrue = (e) => {
        e.preventDefault()
        if (isUser === false) {
            setRegisterFormData(prevState => ({ ...prevState, isUser: true }))
        }
    }

    const setIsUserFalse = (e) => {
        e.preventDefault()
        if (isUser === true) {
            setRegisterFormData(prevState => ({ ...prevState, isUser: false }))
        }
    }





    const changeRegisterForm = (e) => {
        setRegisterFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    const submitRegisData = (e) => {
        e.preventDefault()

        if (regisName == "" || regisEmail == "" || regisPass == "" || regisCPass == "") {
            toast.error("Please Fill all Fields.")
        }

        if (regisPass !== regisCPass) {
            toast.error("Passwords do not match.")
        }

        if (isUser) {
            const userData = {
                name: regisName,
                email: regisEmail,
                password: regisPass
            }

            dispatch(registerUser(userData))
        } else {
            const gymData = {
                name: regisName,
                email: regisEmail,
                password: regisPass
            }
            console.log("IN REGISTER GYM");
            dispatch(registerGym(gymData))
        }




    }
    return (
        <div className="register-page">
            <div className="register">
                <h1>REGISTER</h1>
                <form action="" className="login-form">
                    <input className="font" type="text" name="regisName" value={regisName} placeholder={"Name"} onChange={changeRegisterForm} />
                    <hr />
                    <input className="font" type="text" name="regisEmail" value={regisEmail} placeholder={"Email"} onChange={changeRegisterForm} />
                    <hr />
                    <input className="font" type="password" name="regisPass" value={regisPass} placeholder={"Password"} onChange={changeRegisterForm} />
                    <hr />
                    <input className="font" type="password" name="regisCPass" value={regisCPass} placeholder={"Confirm Password"} onChange={changeRegisterForm} />
                    <hr />
                    <h3>register account as A:</h3>
                    <div className="account-as">
                        <div onClick={setIsUserTrue} className="account-as-btn account-as-btn-coach"><span className="account-as-span account-as-span-coach account-as-span-active"></span><h4>Coach / Student</h4></div>
                        <div onClick={setIsUserFalse} className="account-as-btn account-as-btn-gym"><span className="account-as-span account-as-span-gym"></span><h4>Gym</h4></div>
                    </div>
                    <button onClick={submitRegisData}>Register</button>
                </form>
                {isError && <AuthWarning errorMsg={"REGISTER FAILED"} />}
            </div>
        </div>

    )
}

export default RegisterPage