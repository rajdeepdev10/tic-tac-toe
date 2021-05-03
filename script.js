const player = (symbol, playerName) => {
    let isNextTurn = false;

    return {symbol, playerName, isNextTurn};
};




// Module containing the 'javascript' board
const gameBoard = (() =>{
    // board represented as 1D array
    const BOARD = ['', '', '',
                    '', '', '',
                    '', '', ''];

    // a player moves resulting in appending a symbol to the board
    const playerMove = (index, sign) => {
        BOARD[index] = sign;
    };


    // clears the board
    const resetBoard = () => {
        // clear the 'javascript' board
        for (let i = 0; i < BOARD.length; i++)
        {
            BOARD[i] = "";
        }

        // clear the 'html' board
        displayController.updateBoard();

        gameLogic.resetRound();

        document.getElementById("gameboard").classList.remove("gameover");
    };

    return {BOARD, playerMove, resetBoard};

})();




// the 'main' function/module that handles the game logic
const gameLogic =(() => {
    const player1 = player('x', 'Player1');
    const player2 = player('o', 'Player2');

    let round = 0;

    player1.isNextTurn = true;
    player2.isNextTurn = false;

    document.getElementById("playername").addEventListener("click", () => {
        player1.playerName = prompt("Player 1's name");
        player2.playerName = prompt("Player2's name");
    });

    const playerSymbol = () => {
        if (player1.isNextTurn){
            player1.isNextTurn = false;
            player2.isNextTurn = true;
            document.getElementById("message").innerHTML = player2.playerName + "'s turn";
            return 'x'
        }
        else if (player2.isNextTurn) {
            player2.isNextTurn = false;
            player1.isNextTurn = true;
            document.getElementById("message").innerHTML = player1.playerName + "'s turn";
            return 'o';
        }
    }

    const checkWin = () => {
        const WINNING_COMBINATIONS = [[0, 3, 6],
                                    [0, 4, 8],
                                    [0, 1, 2],
                                    [3, 4, 5],
                                    [6, 7, 8],
                                    [2, 5, 8],
                                    [2, 4, 6],
                                    [1, 4, 7]];

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++)
        {
            // check if the gameBoard.BOARD array has same characters as per one of the required WINNING_COMBINATION
            if(gameBoard.BOARD[WINNING_COMBINATIONS[i][0]] == gameBoard.BOARD[WINNING_COMBINATIONS[i][1]] && gameBoard.BOARD[WINNING_COMBINATIONS[i][1]] == gameBoard.BOARD[WINNING_COMBINATIONS[i][2]])
            {
                // check if those weren't blank spaces
                if (gameBoard.BOARD[WINNING_COMBINATIONS[i][0]] != '' || gameBoard.BOARD[WINNING_COMBINATIONS[i][1]] != '' || gameBoard.BOARD[WINNING_COMBINATIONS[i][2]] != '')
                {
                    // return winner name based on who is the winner
                    if (player1.symbol == gameBoard.BOARD[WINNING_COMBINATIONS[i][0]])
                    {
                        return player1.playerName;
                    } else return player2.playerName;
                }
            }
        }

    };

    const checkDraw = () => {
        if (round < 8)
        {
            round++;

        } else{
            return true;
        }
    };

    const resetRound = () => {
        round = 0;
        isNextTurnPlayer1 = true;
    };


    return {playerSymbol, checkWin, checkDraw, resetRound};



})();




// module with logic for the 'html' board
const displayController = (() => {
    const squares_div = document.querySelectorAll(".square");
    const message_div = document.getElementById("message");
    const reset_btn = document.getElementById("reset");
    const gameboard_div = document.getElementById("gameboard");


    // updates DOM with current state of gameBoard.BOARD array
    const updateBoard = () => {
        for (let i = 0; i < gameBoard.BOARD.length; i++)
        {
            for (let j = 0; j < squares_div.length; j++)
            {
                if (j === i)
                {
                    squares_div[i].innerHTML = gameBoard.BOARD[i];
                }
            }
        }
    };



    // eventlistener for clicking the squares
    squares_div.forEach(square => {
        square.addEventListener("click", event => {
            const squareIndex = parseInt(event.target.dataset.index);

            // play a move only if square is empty
            if (gameBoard.BOARD[squareIndex] === '') {
                gameBoard.playerMove(squareIndex, gameLogic.playerSymbol());
                displayController.updateBoard();
            }

            if(gameLogic.checkWin()){
                message_div.innerHTML = gameLogic.checkWin() + " Wins!";
                gameboard_div.classList.add("gameover");

            }

            if(gameLogic.checkDraw() && !gameLogic.checkWin()){
                message_div.innerHTML = "Match Drawn";
                gameboard_div.classList.add("gameover");
            }

        });
    });




    // eventlistener for reset button
    reset_btn.addEventListener("click", () => gameBoard.resetBoard());


    return {updateBoard};
})();





