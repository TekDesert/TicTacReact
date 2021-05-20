
import './Main.css'

import "../assets/css/argon.min.css"

import Board from "./Games/TTT/TTTBoard"


import crown from "../assets/img/icons/crown.svg"
import swords from "../assets/img/icons/swords.svg"

import React, { useState, useRef, useEffect } from "react";

import TTTContainer from './Games/TTT/TTTContainer'

import RevealCardContainer from "./Games/RevealCard/RevealCardContainer"


function Main(props) {

    const [state, setState] = useState([{test: "1"}])

    const [isLoading, setLoading] = useState(true)

    const [currentGame, setCurrentGame] = useState("Choice")

    const [startingPlayer, setStartingPlayer] = useState(0)

    useEffect( () => {



        fetch(process.env.REACT_APP_API_URL+"users/allOnline")
        .then(
            (res) => res.json() 
        ).then(

            (jsondata) => {
                setState(jsondata);
                setLoading(false)

                console.log(jsondata)
            }   

        );

    }, [])


    const getStartingPlayer = (e) => {
        setStartingPlayer(e);
        setCurrentGame("TTT")

        console.log("MAIN SAYS : starting player is : " + startingPlayer)
        
    }


    return (

        <React.Fragment>

                <div style={{background: "linear-gradient( #7c61e4,#172b4d)", overflow:"hidden"}}>

                <div id="mainContainer" className="row d-flex justify-content-center align-items-center">

                <div id="TTTContainer" className="shadow">

                    {
                        (currentGame === "Choice") ? 
                        
                        (
                            <React.Fragment>

                                


                                <div className="row d-flex justify-content-center align-items-center DetailContainer" >

                                <h1 id="playerTurn" className="animate__animated animate__bounce">Chose who goes first !</h1>


                                </div>

                                

                                    <div className="shadow choiceCard" onClick={() => {setCurrentGame("RevealCard")}} style={{height: "300px", width: "50%", backgroundColor: "white", margin: "auto", marginTop: "50px"}}>

                                        
                                        <div style={{height: "70%", width: "100%"}}>
                                            <img style={{height: "70%", width: "70%",marginTop:"40px"}} src={swords}></img>
                                        </div>

                                        <h3>I Will take the Challenge ! </h3>

                                    </div>

                                    <br></br>

                                    <div className="shadow choiceCard" onClick={() => {setStartingPlayer(0); setCurrentGame("TTT")}} style={{height: "300px", width: "50%", backgroundColor: "white", margin: "auto", marginBottom: "50px"}}>

                                        <div style={{height: "70%", width: "100%"}}>
                                            <img style={{height: "100%", width: "100%"}} src={crown}></img>
                                        </div>

                                        <h3>I Will go First </h3>

                                    </div>


                                

                                <div className="row d-flex justify-content-center align-items-center DetailContainer" style={{marginBottom:"20px"}}>


                                </div>

                            </React.Fragment>
                        ) : 
                        
                        (currentGame === "RevealCard")? (<RevealCardContainer getStartingPlayer={(e) => getStartingPlayer(e)} ></RevealCardContainer>) : 
                        
                        (<TTTContainer startingPlayer={startingPlayer}></TTTContainer>)
                    }

                    

                </div>



                </div>

                <div style={{height: "100px", width: "90%", backgroundColor: "white", margin: "auto", marginBottom: "50px", borderRadius: "10px"}}>

                    <h3>Connected users</h3>

                    {
                        (isLoading === false) ? (
                            state.map((user, index) => (
                                <span style={{marginRight: "30px"}}><img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" height="20" width="20" style={{marginRight:"10px"}} />{user.gamertag}</span>
                            ))
                            ):(
                            <div>Loading...</div>
                            )
                    }
                        
                    
                    

                </div>

                </div>

                    

      
                
        </React.Fragment>
        


        
    );
}

export default Main;

// <span style={{marginRight: "30px"}}><img src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png" height="20" width="20" style={{marginRight:"10px"}} />user.gamertag</span>