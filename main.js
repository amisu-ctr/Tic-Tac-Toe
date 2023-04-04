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

    return {
        render
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
    return {start}
})()


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})