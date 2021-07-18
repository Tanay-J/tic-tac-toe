const playerFactory = (name,sign) => {
    return {name,sign};
}

const gameboard = (() => {
    // let playerOne = '';
    // let playerTwo = '';
    let gameboardArray = ['','','','','','','','',''];
    

    const playBtn = document.getElementById('playBtn');

    const playerNameInput = () => {
        let input1 = document.getElementById('player1');
        let input2 = document.getElementById('player2');
        let playerOne = playerFactory(input1.value,'x');
        let playerTwo = playerFactory(input2.value,'o');
        return {input1,input2,playerOne,playerTwo}
    }

    const selectPlayer = (num) => {
       if(num % 2 == 0){
            return playerNameInput().playerOne;
        }else return playerNameInput().playerTwo;
    }

    const result = () => {
        //function to check equality of gameboardArray items
        function areEqual(){
            var len = arguments.length;
            for (var i = 1; i< len; i++){
               if (arguments[i] === null || arguments[i] !== arguments[i-1])
                  return false;
            }
            return true;
         }
        if(areEqual(gameboardArray[0],gameboardArray[1],gameboardArray[2])){
            if(gameboardArray[0] == 'x'){
                
            }
        }else if(gameboardArray[0],gameboardArray[1],gameboardArray[2]){

        }else if(gameboardArray[3],gameboardArray[4],gameboardArray[5]){
            
        }else if(gameboardArray[6],gameboardArray[8],gameboardArray[8]){
            
        }else if(gameboardArray[0],gameboardArray[3],gameboardArray[6]){
            
        }else if(gameboardArray[1],gameboardArray[4],gameboardArray[7]){
            
        }else if(gameboardArray[2],gameboardArray[5],gameboardArray[8]){
            
        }else if(gameboardArray[0],gameboardArray[4],gameboardArray[8]){
            
        }else if(gameboardArray[2],gameboardArray[4],gameboardArray[6]){
            
        }
    }

    return {playBtn,gameboardArray,playerNameInput,selectPlayer,result}
})();
  
   



const displayController = () => {
    const gameboardGrid = document.querySelector('.gameboard');


    const displayInputForm = () => {
        
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const clearBtn = document.createElement('button');
        const div = document.querySelector('.player-form');

        input1.setAttribute('id','player1');
        input2.setAttribute('id','player2');
        clearBtn.textContent = 'Clear';
        
        div.appendChild(input1);
        div.appendChild(input2);
        div.appendChild(clearBtn);

        clearBtn.addEventListener('click',clearBoard);
       
    }

    const removeInputForm = () => {

    }

    const displayBoard = () => {
        const cellArray = Array.from(document.getElementsByClassName('cell'));
        let counter = 0;
        let clickCounter = 0;
        let selectedPlayer = gameboard.selectPlayer;

        if(cellArray.length == 0){
            gameboard.gameboardArray.forEach((board)=>{
                const cell = document.createElement('p');
                
                cell.classList.add('cell');
                cell.dataset.item = counter;
                cell.addEventListener('click',() => {
                    if(!cell.textContent){
                        cell.textContent = selectedPlayer(clickCounter).sign;
                        // cell.textContent = cell.dataset.item;
                        gameboard.gameboardArray[cell.dataset.item] = selectedPlayer(clickCounter).sign; 
                        clickCounter++;
                    }
                    gameboard.result();
                })
                gameboardGrid.appendChild(cell);
               
                counter++;
            })
        }

        //clear input boxes after clicking play
        // gameboard.playerNameInput().input1.value = '';
        // gameboard.playerNameInput().input2.value = '';
    }
       
       

    const clearBoard = () => {
        const cellArray = Array.from(document.getElementsByClassName('cell'));
        if(cellArray.length > 0){
            for(let i = 0; i < 9; i++){
                gameboard.gameboardArray[i] = '';
                cellArray[i].textContent = '';
                gameboardGrid.removeChild(gameboardGrid.lastChild);
            } 
        }
        gameboard.playerNameInput().input1.value = '';
        gameboard.playerNameInput().input2.value = ''; 
    }
    return {displayInputForm,removeInputForm,displayBoard}
};



displayController().displayInputForm();
gameboard.playBtn.addEventListener('click', () => {
    
    if(gameboard.playerNameInput().playerOne.name && gameboard.playerNameInput().playerTwo.name){
        displayController().displayBoard();
    }
})

