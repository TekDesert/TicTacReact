
import './TTTBoard.css'


import React, { useState, useEffect } from 'react';

import circle from "../../../assets/img/icons/circle.png"
import cross from "../../../assets/img/icons/cross.png"

function TTCBoard(props) {


    const initialValue = [
        { id: 1, empty: 1, value: 0 }, 
        { id: 2, empty: 1, value: 0 },
        { id: 3, empty: 1, value: 0 },
        { id: 4, empty: 1, value: 0 },
        { id: 5, empty: 1, value: 0 },
        { id: 6, empty: 1, value: 0 },
        { id: 7, empty: 1, value: 0 },
        { id: 8, empty: 1, value: 0 },
        { id: 9, empty: 1, value: 0 },
    ];

    const allowedState = [
        { id: 1, empty: 1, value: 0 }, //Empty is if the division is empty, value 0 are for circle, 1 for cross
        { id: 2, empty: 1, value: 1 },
        { id: 3, empty: 1, value: 0 },
        { id: 4, empty: 1, value: 0 },
        { id: 5, empty: 1, value: 1 },
        { id: 6, empty: 1, value: 0 },
        { id: 7, empty: 1, value: 0 },
        { id: 8, empty: 1, value: 0 },
        { id: 9, empty: 1, value: 0 },
    ];

    const [BoardMarks, setStateValues] = useState(initialValue);

    const [Player, setPlayerTurn] = useState(props.startingPlayer); //get the starting player from parent component
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

    

    const checkTie = (array,type) => {

        for (let i = 0; i < array.length; i++){

            if(array[i].empty === 1){

                console.log("not empty")

                return false;
            }

        }

        return true;

    }

    const checkWin = (array,type) => {

        if ((array[0].value === type && array[0].empty === 0) && (array[4].value === type && array[4].empty === 0) && (array[8].value === type && array[8].empty === 0)){
            
            return true; //Diagonal win
        }

        if ((array[2].value === type && array[2].empty === 0) && (array[4].value === type && array[4].empty === 0) && (array[6].value === type && array[6].empty === 0)){
            
            return true; //Diagonal win
        }


        for (let i = 0; i < 7; i+=3){ //Horizontal win check
            
            if((array[i].value === type && array[i].empty === 0) && (array[i+1].value === type && array[i+1].empty === 0) && (array[i+2].value === type && array[i+2].empty === 0)){
                return true
            }

        }

        for (let i = 0; i < 3; i++){ //Vertical check win
            
            if((array[i].value === type && array[i].empty === 0) && (array[i+3].value === type && array[i+3].empty === 0) && (array[i+6].value === type && array[i+6].empty === 0)){

                return true
            }

        }


        return false;
        
    }


    const updateFieldChanged = (index,type) => e => {

       
        
        if(BoardMarks[index].empty){ //If the selected square is not empty
            

            let newArr = [...BoardMarks]; // copying the old datas array

            newArr[index].empty = 0; //Square is not longer empty

            setStateValues(newArr); // ??

            if(type === 0){
                newArr[index].value = 0; //Put a circle

                if(checkWin(newArr, type)){

                    props.winHandler(type)

                    if(window.confirm("Circle Player won ! Would you like to play again ?")){
                        resetBoard()
                        
                    }
                    
                } //Check if board is a winning board

                setPlayerTurn(1)

                props.playerHandler(1) // Pass the player change from child (here) to parent Main.js so we can update the current displayed name

            }else{
                newArr[index].value = 1; //Put a cross

                if(checkWin(newArr, type)){

                    props.winHandler(type)

                    if(window.confirm("Cross Player won ! Would you like to play again ?")){
                        resetBoard()
                    }
                } //Check if board is a winning board

                setPlayerTurn(0)

                props.playerHandler(0) // Pass the player change from child (here) to parent Main.js so we can update the current displayed name
            }        

        }

        if(checkTie(BoardMarks)){

            if(window.confirm("It's a tie ! Would you like to play again ?")){
                resetBoard()
            }

        }
        
    }

    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        setStateValues(allowedState);
    }, []);

    return (
        <div id="board" >  

         

            {
            BoardMarks.map((BoardMarks, index) => ( (BoardMarks.value === 1 && BoardMarks.empty === 0) ? (

                <div className="TTTsquare" key={BoardMarks.id} >
                   
                  
                        <img src={cross} style={{marginTop:"12px"}} />
                        
                </div>

                ): (BoardMarks.value === 0 && BoardMarks.empty === 0) ? (

                        <div className="TTTsquare" key={BoardMarks.id} >
                        
                            <img src={circle} style={{marginTop:"10px"}} />

                        </div>

                    ) : (

                        <div className="TTTsquare" key={BoardMarks.id} onClick={updateFieldChanged(index,Player)}>


                        </div>

                    )
            
                ))
            }
                 
            
        </div>
    );
}

export default TTCBoard;

//onClick={updateFieldChanged(index,Player)}