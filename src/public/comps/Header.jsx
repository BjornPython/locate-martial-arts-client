import "../css/header.css"
import img from "../images/icons/locate-icon.png"

const Header = () => {
    return (
        <nav className="navbar">

            <div className="navbar-content">
                <a href="#" className="navbar-brand">
                    <img src={img} alt="" />
                    <div className="brand">
                        <h3 className="mainfont">LOCATE MARTIAL ARTS</h3>
                        <p className="font">HONE YOUR SKILLS</p>

                    </div>
                </a>

                <ul className="links">
                    <li><a href="#" className="font home-btn">HOME</a></li>
                    <li><a href="#" className="font register-btn">REGISTER</a></li>
                    <li><a href="#" className="font login-btn">LOGIN</a></li>
                </ul>

                <div className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    )
}

export default Header