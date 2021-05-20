
import './RevealCardBoard.css'


import React, { useState, useEffect } from 'react';

import pair1 from "../../../assets/img/pairs/pair1.svg"
import pair2 from "../../../assets/img/pairs/pair2.svg"
import pair3 from "../../../assets/img/pairs/pair3.svg"
import pair4 from "../../../assets/img/pairs/pair4.svg"
import pair5 from "../../../assets/img/pairs/pair5.svg"
import pair6 from "../../../assets/img/pairs/pair6.svg"

function RevealCardBoard(props) {

    const pairs = [pair1, pair2, pair3, pair4, pair5, pair6, pair1, pair2, pair3, pair4, pair5, pair6]

    var initialValue = [
        { id: 1, discovered: 0, value: 0, flipped: 0 }, //Empty is if the division is empty, value 0 are for circle, 1 for cross
        { id: 2, discovered: 0, value: 1, flipped: 0 },
        { id: 3, discovered: 0, value: 0, flipped: 0 },
        { id: 4, discovered: 0, value: 0, flipped: 0 },
        { id: 5, discovered: 0, value: 1, flipped: 0 },
        { id: 6, discovered: 0, value: 0, flipped: 0 },
        { id: 7, discovered: 0, value: 0, flipped: 0 },
        { id: 8, discovered: 0, value: 0, flipped: 0 },
        { id: 9, discovered: 0, value: 0, flipped: 0 },
        { id: 10, discovered: 0, value: 0, flipped: 0 },
        { id: 11, discovered: 0, value: 0, flipped: 0 },
        { id: 12, discovered: 0, value: 0, flipped: 0 },
    ];




    for (let i = 0; i < 12; i++) {
        
        var random = getRandomInt(pairs.length)

        initialValue[i].value = pairs[random]

        pairs.splice(random, 1);
        
    }


    const [BoardMarks, setStateValues] = useState(initialValue);

    const [Player, setPlayerTurn] = useState(props.startingPlayer); //get the starting player from parent component

    const [currentCard, setCurrentCard] = useState([]); //get the current flipped card (usually 2 card at most, it will be used to compare if flipped cards are equal)

    // initialValue.push(...allowedState);


    const resetBoard = () =>{
        setStateValues(initialValue);
    }

    useEffect(() => {

        // Updates the document after being mounted if there is a parent prop asking for a reset of the board
        if(props.reset == "true"){
            resetBoard()
            props.changeReset()
        }

      });


    const checkWin = (array,type) => {

        console.log("checking Win ...")

        

        for (let i = 0; i < array.length; i++){

            if(array[i].discovered === 0){

                console.log("THERE IS ONE NOT DISCOVERED")
                console.log(array[i])

                return false;
            }

        }

        console.log("WIN")

        return true;
        
    }


    const updateFieldChanged = (index,type) => e => {

        let flippedCard = [...currentCard]; //State with the 2 flipped cards

        let mainCard = [...BoardMarks]; //State with our whole board

        flippedCard.push(BoardMarks[index-1].value) //the the clicked card to the 2 flipped card
        


        if(flippedCard.length === 2){

            console.log("hee")

            mainCard[index-1].flipped = 1;
            setStateValues(mainCard)

            

            setTimeout(function(){ 

                console.log(mainCard)

                if(flippedCard[0] === flippedCard[1]){

                    
                    //If the users finds a pair
    
                    for (let i = 0; i < mainCard.length; i++) {
                        
                        if(mainCard[i].value === flippedCard[0]){
                            mainCard[i].discovered = 1;
                            console.log(i +" changed")
                        }
                        
                    }
      
    
                }else{
    
                    //If no pairs are found
    
                    for (let i = 0; i < mainCard.length; i++) {
                        
                        if(mainCard[i].value === flippedCard[0] || flippedCard[1]){
                            mainCard[i].flipped = 0;
                            console.log(i +" changed")
                        }
                        
                    }
    
                        
                    
                }
    
                setCurrentCard([])   
                setStateValues(mainCard)

                if(checkWin(mainCard)){

            
                    console.log("WINNER !")
                    props.resultHandler()
        
                }

            }, 500);

            

            

        }else{
            mainCard[index-1].flipped = 1;
            setCurrentCard(flippedCard)
            setStateValues(mainCard)
        }

        
        
        
     
        }
        
    

    /*useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        setStateValues(allowedState);
    }, []);*/


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div id="board" >  

         

            {
            BoardMarks.map((BoardMarks, index) => ( (BoardMarks.discovered === 1 || BoardMarks.flipped === 1) ? (

                

                <div class="flip-card flip-me " key={BoardMarks.id} >
                    <div class="flip-card-inner flip-me">
                        <div class="flip-card-front">

                        </div>
                        <div class="flip-card-back">
                        <img src={BoardMarks.value} style={{marginTop:"12px"}} height="140" width="140" />
                        </div>
                    </div>
                </div>
                               

                    ) : (

                        <div class="flip-card" key={BoardMarks.id} onClick={updateFieldChanged(BoardMarks.id,Player)}>
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        
                                    </div>
                                    <div class="flip-card-back">
                                        <img src={BoardMarks.value} style={{marginTop:"12px"}} height="140" width="140" />
                                       
                                    </div>
                                </div>
                            </div>

                       

                    )
            
                ))
            }
                 
            
        </div>
    );
}

export default RevealCardBoard;

//onClick={updateFieldChanged(index,Player)}