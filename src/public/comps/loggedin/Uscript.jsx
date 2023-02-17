
import React from 'react'

function Uscript() {
    return (

        <script>
            {window.onload = (() => {

                // Animations for Uprofile.jsx
                const userCoach = document.querySelector(".user-coach");
                const userStud = document.querySelector(".user-stud")
                const editButton = document.querySelector(".p-setting-icon")
                const saveChangesBUtton = document.querySelector(".save-changes")

                //Animations for navbar
                // const UhomePages = document.querySelector(".u-home-pages");
                // const messageButton = document.querySelector(".messages-btn");
                // const profileButton = document.querySelector(".profile-btn");
                // const messagePage = document.querySelector("#u-user-message");

                // Animations for find dropdown in UprofileFinding.jsx
                const spartnerDiv = document.querySelector("#spartner-div");
                const coachDiv = document.querySelector("#coach-div");
                const spartnerDropdown = document.querySelector("#spartner-dropdown");
                const coachDropdown = document.querySelector("#coach-dropdown");
                const searchingArts = document.querySelectorAll(".u-display-mart");

                // messageButton.addEventListener("click", () => {
                //     console.log("MESSAGE BTN CLICKED.");
                //     messagePage.scrollIntoView({block: "center", inline: "center"});

                // })

                // profileButton.addEventListener("click", () => {
                //     console.log("PROFILE BTN CLICKED.");
                //     UhomePages.classList.remove("show-messages");
                // })





                // Functions
                // For profile

                spartnerDiv.addEventListener("click", () => {
                    console.log("spartner div clicked");
                    spartnerDropdown.classList.toggle("spar-dropdown-active")
                })

                coachDiv.addEventListener("click", () => {
                    console.log("spartner div clicked");
                    coachDropdown.classList.toggle("spar-dropdown-active")
                })

                console.log("COACH DIV", coachDiv);




                let editing = false;

                editButton.addEventListener("click", () => {
                    editing = !editing
                    console.log(editing);
                    userCoach.classList.toggle("what-status-cursor");
                    userStud.classList.toggle("what-status-cursor");
                })

                saveChangesBUtton.addEventListener("click", () => {
                    editing = false;
                    userCoach.classList.remove("what-status-cursor");
                    userStud.classList.remove("what-status-cursor");
                })

                userCoach.addEventListener("click", () => {
                    console.log("USER COACH CLICKED");
                    if (editing) {
                        if (!userCoach.classList.contains("what-status-active")) {
                            userCoach.classList.toggle("what-status-active")
                            userStud.classList.toggle("what-status-active")
                        }

                    }

                })


                userStud.addEventListener("click", () => {
                    console.log("USER STUD CLICKED");

                    if (editing) {
                        if (!userStud.classList.contains("what-status-active")) {
                            userStud.classList.toggle("what-status-active")
                            userCoach.classList.toggle("what-status-active")
                        }
                    }
                })



            })}
        </script>
    )
}

export default Uscript