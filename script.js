

const gameboard = (() => {
    let playerOne = '';
    let playerTwo = '';
    let gameboardArray = ['','','','','','','','',''];
    let selectedPlayer = '';
    
    const playerObj = (name,sign) => {
       return {name,sign};
    }
    const setPlayer = () => {
        let input1 = document.getElementById('player1');
        let input2 = document.getElementById('player2');

        playerOne = playerObj(input1.value,'x');
        playerTwo = playerObj(input2.value,'o');
        
        return {playerOne,playerTwo}
    }

    // alternate turns for players
    const selectPlayer = (num) => {
        if(num % 2 == 0){
            selectedPlayer = playerOne;
        }else selectedPlayer = playerTwo;
        return selectedPlayer;
    }

    //declare winner
    const result = () => {
        let winMsg = selectedPlayer.name + ' wins!';
        let drawMsg = "It's a draw!";
        //function to check equality of gameboardArray items
        function areEqual(){
            var len = arguments.length;
            for (var i = 1; i< len; i++){
               if (arguments[i] === '' || arguments[i] !== arguments[i-1])
                  return false;
            }
            return true;
         }
         
        if(areEqual(gameboardArray[0],gameboardArray[1],gameboardArray[2])){
            return winMsg;
        }else if(areEqual(gameboardArray[3],gameboardArray[4],gameboardArray[5])){
            return winMsg;
        }else if(areEqual(gameboardArray[6],gameboardArray[7],gameboardArray[8])){
            return winMsg;
        }else if(areEqual(gameboardArray[0],gameboardArray[3],gameboardArray[6])){
            return winMsg;
        }else if(areEqual(gameboardArray[1],gameboardArray[4],gameboardArray[7])){
            return winMsg;
        }else if(areEqual(gameboardArray[2],gameboardArray[5],gameboardArray[8])){
            return winMsg;
        }else if(areEqual(gameboardArray[0],gameboardArray[4],gameboardArray[8])){
            return winMsg;
        }else if(areEqual(gameboardArray[2],gameboardArray[4],gameboardArray[6])){
            return winMsg;
        }else{
            for(let i = 0; i < 9; i++){
                if(gameboardArray[i] == ''){
                    return;
                }
            }
            return drawMsg;
        }
    }

    return {playerOne,playerTwo,gameboardArray,setPlayer,selectPlayer,result}
})();
  
   


const displayController = () => {
    const gameboardGridContainer = document.querySelector('.gameboard-container');
    const turnDisplay = document.querySelector('#turnDisplay'); //displays current player name
       
    //input player names, play button, clear button
    const displayInputForm = () => {
        
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const playBtn = document.createElement('button');
        const clearBtn = document.createElement('button');
        const div = document.querySelector('.player-form');

        input1.id = 'player1';
        input2.id = 'player2';
        input1.placeholder = 'Player 1';
        input2.placeholder = 'Player 2';
        playBtn.id = 'playBtn';
        clearBtn.id = 'clearBtn';
        playBtn.textContent = 'Play';
        clearBtn.textContent = 'Clear';
        
        div.appendChild(input1);
        div.appendChild(input2);
        div.appendChild(playBtn);
        div.appendChild(clearBtn);

        clearBtn.addEventListener('click',clearBoard);
        playBtn.addEventListener('click', () => {
            if(gameboard.setPlayer().playerOne.name && gameboard.setPlayer().playerTwo.name){
                  const displayControllerRef = displayController();
                  displayControllerRef.clearBoard();
                  displayControllerRef.displayBoard();
              }
          })
    }

    //displays gameboard
    const displayBoard = () => {
        const cellArray = Array.from(document.getElementsByClassName('cell'));
        const div = document.createElement('div');
        
        let counter = 0; //to set data attribute on each cell
        let clickCounter = 0; //to select each player alternately: Player 1 if even, Player 2 if odd
        let selectedPlayer = gameboard.selectPlayer;                

        const gameboardGrid = document.createElement('div');
        gameboardGrid.classList.add('gameboard');
        gameboardGridContainer.appendChild(gameboardGrid);

        if(cellArray.length == 0){
            //creates nine cells on gameboard
            gameboard.gameboardArray.forEach((board)=>{
                const cell = document.createElement('p');
                cell.classList.add('cell');
                cell.dataset.item = counter;
                div.textContent = selectedPlayer(clickCounter).name + "'s turn";
                cell.addEventListener('click',() => {
                    if(!cell.textContent){
                        cell.textContent = selectedPlayer(clickCounter).sign;
                        div.textContent = selectedPlayer(clickCounter+1).name + "'s turn";
                        gameboard.gameboardArray[cell.dataset.item] = selectedPlayer(clickCounter).sign; 
                        clickCounter++;
                    }
                    //checks for winner
                    if(displayWinner(gameboard.result())){
                        clearBoard();
                    }
                })
                turnDisplay.appendChild(div);
                gameboardGrid.appendChild(cell);
                counter++;
            })
        }
    }
    //clears gameboard   
    const clearBoard = () => {
        const cellArray = Array.from(document.getElementsByClassName('cell'));
        const div = document.getElementById('result');
        if(turnDisplay.hasChildNodes()){
            turnDisplay.removeChild(turnDisplay.lastChild)
        }

        if(div.hasChildNodes()){
            div.removeChild(div.lastChild);
        }

        if(cellArray.length > 0){
            for(let i = 0; i < 9; i++){
                gameboard.gameboardArray[i] = '';
                cellArray[i].textContent = ''; 
            } 
            gameboardGridContainer.removeChild(gameboardGridContainer.lastChild);
        }
        // let input1 = document.getElementById('player1');
        // let input2 = document.getElementById('player2');
        
        // input1.value = '';
        // input2.value = '';
    }

    const displayWinner = (result) => {
        if(result){
            clearBoard();

            const div = document.getElementById('result');
            const h2 = document.createElement('h2');
            h2.textContent = result;
            div.appendChild(h2);
        }
    }
    return {displayInputForm,displayBoard,clearBoard}
};



displayController().displayInputForm();


