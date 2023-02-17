import "../css/footer.css"
import img from "../images/icons/locate-icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"

function Footer() {
    return (
        <div className="main-footer">

            <div className="footer-main-info">
                <div className="footer-logo">
                    <img src={img} className="brand-icn" alt="brand icon" />
                    <div className="footer-brand ">
                        <h3 className="mainfont">LOCATE MARTIAL ARTS</h3>
                        <p className="font">HONE YOUR SKILLS</p>
                    </div>
                </div>
                <div className="footer-info">
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faMapMarkerAlt} />
                        <p>#20, Sample St., Address Village, Sample City.</p>
                    </div>
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faPhone} />
                        <p>+63 949-340-5687</p>
                    </div>
                    <div className="info-grp"><FontAwesomeIcon className="info-grp-icn" icon={faEnvelope} />
                        <p style={{ color: "yellow" }}>locatemartialarts@gmail.com</p>
                    </div>
                </div>
                <div className="footer-about-info">
                    <h4>ABOUT THE COMPANY</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam odio justo, pellentesque sit amet egestas sed.</p>
                </div>
            </div>
            <p className="copyright">@Copyright. All Rights Reserved.</p>
            <div className="footer-background"></div>
        </div >
    )
}

export default Footer