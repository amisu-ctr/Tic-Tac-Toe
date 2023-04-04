const Gameboard = (() => {
    let gameboard = ['','','','','','','','','']


    //set variable to an empty . loop through gameboard array . upon each iteration create a string and attach it to the boardHtml variable
    //after the loop is done . grab the gameboard element  div from the html and set its value to the boardHtml 
    //this will populate it child divs with based on the number of items in the gameboard array 
    const render = () => {
        let boardHTML = '';

        gameboard.forEach((square, index) => {  
            boardHTML += `<div class="square" id="square-${index}">${square} </div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;   
        const squares = document.querySelectorAll(".square") //select all created div element with class square
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick)
        })      
    }

    const update = (index, value) => {
        gameboard[index] = value; // this method just uses the index(in this case the id of the clicked square/div) of the gamebaord  array and assign it a 
        //value in this case X or 0 . then calls the render method again which loops through it create div squares assing the value as the text-content 
        render()
    } 

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
    }
})()


const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "0")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
       //selects the id value of the clicked element splits it into an array at point where it finds dash 
       // The items in the array are strings so it converts the selected index into an inter value 
        let index = parseInt(event.target.id.split('-')[1])

        if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            alert(`${players[currentPlayerIndex].name} won`)
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            alert("its a tie!")
        }

        if(Gameboard.getGameboard()[index] !== '')
        return; //this prevents from updating a particular squares mark which is x or y it checks whether you've already inserted something in this case clicked . if its already clicked and updated with x or y 
        // it simply breaks and the Gameboard.update method doesnt trigger on the next line

        Gameboard.update(index, players[currentPlayerIndex].mark)  
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
    }

    const restart = () => {
        for(let i = 0; i < 9; i++) {
            Gameboard.update(i, '')
        }
        Gameboard.render()
    }
    
    return {start,restart, handleClick}
})()

function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true
        }
    }
    return false
}


const restartButton = document.querySelector("#restart-button")
restartButton.addEventListener('click', () => {
    Game.restart();
})

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})