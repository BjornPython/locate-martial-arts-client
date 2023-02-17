import { useEffect } from "react"
import Header from '../comps/Header';
import Footer from "../comps/Footer";
import "../css/home.css"

import Arts from "./Arts"
import Gym from "./Gym"
import LoginPage from "./LoginPage";
import { useSelector, useDispatch } from "react-redux"
import RegisterPage from "./RegisterPage";
import { useNavigate } from "react-router-dom"
import { hideError } from "../../features/authentication/authSlice"
function Home() {
    // to use functions in the authslice
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess } = useSelector((state) => state.auth)

    // redirect user to /userhome if logged in
    useEffect(() => {

        if (user || isSuccess) {
            console.log("USER SUCCESS");
            navigate("/home")
        } else {
            console.log("NO USER");
        }
    }, [user, isSuccess])


    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                dispatch(hideError())
            }, 3000)
        }
    }, [isError])




    return (

        <div className="homepage">
            <Header />
            <div className="home-contents">

                <div className="main-texts">

                    <LoginPage isError={isError} />


                    <RegisterPage isError={isError} />

                    <div className="main-texts-info">
                        <h1>THE BEST<br /> WAY TO CONNECT WITH MARTIAL ARTISTS.</h1>
                    </div>
                    <hr className="main-texts-line" />
                    <div className="find" id="find1">
                        <h1><a href="#find-gym" className="gym-txt">LOCATE OTHERS</a></h1>
                        <h1><a href="#martial-arts-page" className="gym-txt">MARTIAL ARTS</a></h1>
                    </div>


                </div>
                <div className="main-image">

                </div>
            </div>
            <div id="find-gym"></div>
            <Gym />
            <div id="martial-arts"></div>
            <Arts />
            <Footer />

        </div>

    )
}

export default Home