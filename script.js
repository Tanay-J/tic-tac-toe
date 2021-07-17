const playerFactory = (name,sign) => {
    return {name,sign};
}

const gameboard = (() => {
    let playerOne = '';
    let playerTwo = '';
    let gameboardArray = ['x','x','','','','','','',''];
    
    const gameboardGrid = document.querySelector('.gameboard')
    const playBtn = document.getElementById('playBtn');
    const clearBtn = document.getElementById('clearBtn');
    playBtn.addEventListener('click',()=>{
        let input1 = document.getElementById('player1').value;
        let input2 = document.getElementById('player2').value;
        playerOne = playerFactory(input1,'x');
        playerTwo = playerFactory(input2,'o');
        if(playerTwo && playerTwo){
            input1.textContent = '';
            input2.textContent = '';
            displayController();
        }
    });
    
  
   
    const displayController = () => {
        // clearBoard();
        // for(let i = 0;i < 9;i++){
        //     const cell = document.createElement('p');
        //     cell.textContent = gameboardArray[i];
        //     cell.classList.add('cell');
        //     // cell.dataset.item = i;
        //     console.log(gameboardArray[i])
        //     gameboardGrid.appendChild(cell);
        // } 
        if(gameboardArray.length < 10){
            gameboardArray.forEach((board)=>{
                const cell = document.createElement('p');
                cell.textContent = board;
                cell.classList.add('cell');
                gameboardGrid.appendChild(cell);
            })
        }
       
    }
    const clearBoard = () => {
        const cellArray = Array.from(document.getElementsByClassName('cell'));
        console.log(cellArray)
        for(let i = 0; i < 9; i++){
            gameboardArray[i] = '';
            cellArray[i].textContent = '';
        }
    }

    clearBtn.addEventListener('click',clearBoard);

})()

