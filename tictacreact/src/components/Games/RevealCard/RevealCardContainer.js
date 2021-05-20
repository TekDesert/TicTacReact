
import '../../Main.css'

import "../../../assets/css/argon.min.css"

import Board from "./RevealCardBoard"


import circle from "../../../assets/img/icons/circle.png"
import cross from "../../../assets/img/icons/cross.png"

import React, { useState, useEffect } from 'react';

function RevealCardContainer(props) {

    var username = JSON.parse(localStorage.getItem('user-info')).gamertag;

    const InitialPlayers = [
        { id: 1, gamerTag: username, time: 0, currentPlayer: 1 }, 
        { id: 2, gamerTag: "BOT", time: 0, currentPlayer: 0 }
    ];

    const [Players, setPlayerValue] = useState(InitialPlayers);

    const [Reset, setResetValue] = useState("false");

    const [Timer, setTimer] = useState(5);

    const [stopGame, setStopGameFlag] = useState(false)
    



    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    useEffect(() => {

        if(!stopGame){

            
            const intervalId = setInterval(() => {  //assign interval to a variable to clear it.


            let newPlayerArr = [...Players]; // copying the old datas array

            if(newPlayerArr[0].currentPlayer === 1){
                newPlayerArr[0].time += 1 ; //Square is not longer empty
            }else{
                
                newPlayerArr[1].time += 1;
            }

            setPlayerValue(newPlayerArr); // ??
            

            setTimer(Timer+1);

        }, 1000)

        return () => clearInterval(intervalId);

        }else{
            if(Players[0].time > Players[1].time){
                alert("WINNER IS " + Players[1].gamerTag + " WITH A TIME OF : " +  pad(parseInt(Players[1].time / 60)) + " minutes and " + Players[1].time +" seconds")
                props.getStartingPlayer(1)

            }else{
                alert("WINNER IS " + Players[0].gamerTag + " WITH A TIME OF : " +  pad(parseInt(Players[0].time / 60)) + " minutes and " + Players[0].time +" seconds")
                props.getStartingPlayer(0)

            }
        }


   
        
    })


    const resultHandler = () => {

        if(Players[1].currentPlayer != 1 ){ //if the second player didn't finish his turn yet
            let changeplayer = [...Players]

            changeplayer[0].currentPlayer = 0;
            changeplayer[1].currentPlayer = 1;

            setPlayerValue(changeplayer); //Change current player
            setTimer(0); //reset timer for player 2

            setResetValue("true")//Reset Board

        }else{
            setTimer(0);
            setStopGameFlag(true); //Finish the game
        }

        


    }

    const handlePlayerWin = (Winner) => {

        let newPlayerArr = [...Players]; // copying the old datas array

        if(Winner === 0){
            //newPlayerArr[0].Score = newPlayerArr[0].Score + 1; //Square is not longer empty
        }else{
            //newPlayerArr[1].Score = newPlayerArr[1].Score + 1;
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

    }


    return(
        <React.Fragment>
            <div className="row d-flex justify-content-center align-items-center DetailContainer" >

                <span className="scoreItem" style={{width:"200px"}}>  {Players[0].gamerTag}  </span>

                <div className="scoreItem d-flex justify-content-center align-items-center" id="Score">

                    {
                    
                        (Players[0].currentPlayer === 1) ?

                        ("Time : "+ pad(parseInt(Players[0].time / 60))  + " m "+  Players[0].time + " s") : ("Time : "+ pad(parseInt(Players[1].time / 60))  + " m "+  Players[1].time + " s")
                    
                    }

                    

                </div>

                <span className="scoreItem" style={{width:"200px"}}> {Players[1].gamerTag}  </span>

                </div>

                <div className="row d-flex justify-content-center align-items-center DetailContainer" >

                <h1 id="playerTurn" className="animate__animated animate__bounce">it's {Players[0].currentPlayer === 1 ? Players[0].gamerTag : Players[1].gamerTag}'s turn</h1>


                </div>

                <div className="row d-flex justify-content-center align-items-center MainContainer" style={{height:"670px"}}>

                <Board reset={Reset} changeReset={() => cancelReset()} resultHandler={() => resultHandler()} winHandler={(e) => handlePlayerWin(e)}   startingPlayer={Players[0].currentPlayer === 1 ? 0 : 1}></Board>


                </div>

                <div className="row d-flex justify-content-center align-items-center DetailContainer" style={{marginBottom:"20px"}}>

                <button type="button" onClick={() => sendResetSignal()} style={{marginLeft:"0px"}} className="btn btn-primary paramBtn">Reset Board</button>
                <button type="button" onClick={() => resetGame()} className="btn btn-danger paramBtn">Reset Game</button>


                </div>
        </React.Fragment>
    )
}

export default RevealCardContainer;