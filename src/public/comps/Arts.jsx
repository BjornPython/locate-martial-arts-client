
import "../css/arts.css"

import img1 from "../images/martialArtsImages/5.webp"
import img2 from "../images/martialArtsImages/6.jpg"
import img3 from "../images/martialArtsImages/7.jpg"
import img4 from "../images/martialArtsImages/8.jpg"
import img5 from "../images/martialArtsImages/9.webp"
import karate from "../images/martialArtsImages/karate-combat.jpg"
import sambo from "../images/martialArtsImages/sambo.jpg"
import wrestling from "../images/martialArtsImages/wrestling.jpg"
import kickboxing from "../images/martialArtsImages/kickboxing.jpg"
import BJJ from "../images/martialArtsImages/BJJ.jpg"

const ShowMartInfo = ({ img, mart, info }) => {
    return (
        <div className="arts-box hide">
            <div className="image">
                <img src={img} alt="Boxing" />
                <div className="overlay">
                    <a className="image-txt" href=""><h3 className="mainfont">GYM</h3></a>
                    <span className="image-line"></span>
                    <a className="image-txt" href=""><h3 className="mainfont">COACH</h3></a>
                </div>
            </div>
            <div className="arts-text">
                <h2 className="mainfont">{mart}</h2>
                <p className="font">{info}</p>
            </div>
        </div>
    )
}


function Carousell() {
    return (

        <div className="martial-arts-page" id="martial-arts-page">
            <div className="text">
                <h1 className="mainfont">DIFFERENT MARTIAL ARTS</h1>
                <h3 className="font">DISCOVER THE MARTIAL ART THAT IS BEST FOR YOU</h3>
            </div>



            <div className="martial-arts">

                <ShowMartInfo img={img1} mart="Muay Thai"
                    info="A traditional martial art from Thailand renowned for its utilization of punches,
                    kicks, elbows, and knee strikes. Founded upon five pillars: respect, discipline, courage,
                    fair play, and Excellence." />

                <ShowMartInfo img={img4} mart="Boxing"
                    info="a striking-based sport that focuses on punches, specifically punches thrown with the fists. 
                    It is unique in its focus on hand-to-hand combat, and is known for its 
                    precise and powerful striking techniques." />

                <ShowMartInfo img={img5} mart="Mixed Martial Arts"
                    info="(MMA) is a full-contact combat sport that combines elements of striking and grappling arts 
                    such as boxing, wrestling, BJJ, and kickboxing. It is unique in its integration of multiple styles 
                    and its focus on a well-rounded, multi-disciplinary skill set." />

                <ShowMartInfo img={karate} mart="Karate"
                    info="A striking art focusing on punches, kicks, knee strikes, elbow strikes and open-hand
                    techniques. Karate emphasis on discipline, focus, and perseverance, making it not just a 
                    way to learn self-defense, but also a way to improve mental and physical well-being." />

                <ShowMartInfo img={wrestling} mart="Wrestling"
                    info="A grappling-based sport that focuses on taking an opponent to the ground and pinning them. 
                    It is one of the oldest forms of martial arts and is unique in its combination of strength, 
                    technique, and endurance. Wrestling is not typically focused on strikes." />

                <ShowMartInfo img={sambo} mart="Sambo"
                    info="A Russian martial art that combines elements of wrestling and judo. It is unique in its 
                    focus on quick, explosive techniques and grappling, and is known for its combination of strikes and throws." />
                <ShowMartInfo img={kickboxing} mart="Kickboxing"
                    info="a striking-based martial art that combines punches, kicks, and knee strikes. It is unique 
                    in its blend of Western boxing and Eastern martial arts, and is known for its focus on striking with 
                    the feet as well as the hands." />
                <ShowMartInfo img={BJJ} mart="Brazillian-Jiu-Jitsu"
                    info="A grappling-based martial art that focuses on ground fighting and submission 
                    holds. It is unique in its emphasis on leverage and technique over raw strength and power, 
                    and is a popular discipline in mixed martial arts competition." />

            </div>

        </div>

    )
}

export default Carousell