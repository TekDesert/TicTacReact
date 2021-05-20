
import '../../Main.css'

import "../../../assets/css/argon.min.css"

import Board from "./TTTBoard"


import circle from "../../../assets/img/icons/circle.png"
import cross from "../../../assets/img/icons/cross.png"

import React, { useState, useEffect } from 'react';

function TTTContainer(props) {

    var username = JSON.parse(localStorage.getItem('user-info')).gamertag;

    const Player1 = { id: 1, gamerTag: username, Score: 0, currentPlayer: (props.startingPlayer === 0) ? 1 : 0 }

    const InitialPlayers = [
        { id: 1, gamerTag: username, Score: 0, currentPlayer: (props.startingPlayer === 0) ? 1 : 0 }, 
        { id: 2, gamerTag: "BOT", Score: 0, currentPlayer: (props.startingPlayer === 1) ? 1 : 0 }
    ];

    const [Players, setPlayerValue] = useState(InitialPlayers);

    const [Reset, setResetValue] = useState("false");

    const handlePlayerChange = (CurrentPlayer) => {
        
        

        let newPlayerArr = [...Players]; // copying the old datas array

        if(CurrentPlayer === 0){
            newPlayerArr[0].currentPlayer = 1; //Square is not longer empty
            newPlayerArr[1].currentPlayer = 0; //Square is not longer empty
        }else{
            newPlayerArr[0].currentPlayer = 0;
            newPlayerArr[1].currentPlayer = 1;
        }

        setPlayerValue(newPlayerArr); // ??
    }

    const handlePlayerWin = (Winner) => {

        let newPlayerArr = [...Players]; // copying the old datas array

        if(Winner === 0){
            newPlayerArr[0].Score = newPlayerArr[0].Score + 1; //Square is not longer empty
        }else{
            newPlayerArr[1].Score = newPlayerArr[1].Score + 1;
        }
        

        setPlayerValue(newPlayerArr); // ??

        
    }

    const sendResetSignal = () => {
        setResetValue("true")
    }

    const cancelReset = () => {
        setResetValue("false")
    }

    const resetGame = () => {

        /* Restart Bounce animation
        var PlayerTurnTitle = document.getElementById("playerTurn")
        PlayerTurnTitle.classList.remove("animate__animated", "animate__bounce");

        PlayerTurnTitle.classList.add("animate__animated", "animate__bounce" );
        */

        sendResetSignal();
        setPlayerValue(InitialPlayers)
    }


    return(
        <React.Fragment>

            <div className="row d-flex justify-content-center align-items-center DetailContainer">

                <span className="scoreItem" style={{width:"200px"}}> <img src={circle} height="30" width="30" /> {Players[0].gamerTag}  </span>

                <div className="scoreItem d-flex justify-content-center align-items-center" id="Score">

                    {Players[0].Score} - {Players[1].Score}

                </div>

                <span className="scoreItem" style={{width:"200px"}}> {Players[1].gamerTag} <img src={cross} height="30" width="30" />  </span>

                </div>

                <div className="row d-flex justify-content-center align-items-center DetailContainer" >

                <h1 id="playerTurn" className="animate__animated animate__bounce">it's {Players[0].currentPlayer === 1 ? Players[0].gamerTag : Players[1].gamerTag}'s turn</h1>


                </div>

                <div className="row d-flex justify-content-center align-items-center MainContainer">

                <Board reset={Reset} changeReset={() => cancelReset()} playerHandler={(e) => handlePlayerChange(e)} winHandler={(e) => handlePlayerWin(e)}   startingPlayer={Players[0].currentPlayer === 1 ? 0 : 1}></Board>


                </div>

                <div className="row d-flex justify-content-center align-items-center DetailContainer" style={{marginBottom:"20px"}}>

                <button type="button" onClick={() => sendResetSignal()} style={{marginLeft:"0px"}} className="btn btn-primary paramBtn">Reset Board</button>
                <button type="button" onClick={() => resetGame()} className="btn btn-danger paramBtn">Reset Game</button>


                </div>
        </React.Fragment>
    )
}

export default TTTContainer;