import { useState } from 'react'
import { useDispatch } from "react-redux"
import { loginUser } from '../../features/authentication/authSlice'
import AuthWarning from './AuthWarning'

function LoginPage({ isError }) {
    const dispatch = useDispatch()

    const [loginFormData, setLoginFormData] = useState({
        loginEmail: "",
        loginPass: ""
    })

    const { loginEmail, loginPass } = loginFormData

    const changeLoginForm = (e) => {
        setLoginFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const submitLoginData = (e) => {
        e.preventDefault()

        if (loginEmail == "" || loginPass == "") {
            return
        }

        const userData = {
            email: loginEmail, password: loginPass
        }

        dispatch(loginUser(userData))

    }

    return (
        <div className="login-page">
            <div className="login">
                <h1>LOG IN</h1>
                <form action="" onSubmit={submitLoginData} className="login-form">
                    <input className="font" type="text" name="loginEmail" value={loginEmail} placeholder={"Email"} onChange={changeLoginForm} />
                    <hr />
                    <input className="font" type="password" name="loginPass" value={loginPass} placeholder={"Password"} onChange={changeLoginForm} />
                    <hr />
                    <button type="submit">Log In</button>
                </form>
                {isError && <AuthWarning errorMsg={"LOG IN FAILED"} />}
            </div>
        </div>
    )
}

export default LoginPage