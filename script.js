const player = (symbol) => {
    return {symbol};
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

        gameLogic.isNextTurnPlayer1 = true;
        gameLogic.round = 0;
    };

    return {BOARD, playerMove, resetBoard};

})();



// the 'main' function/module that handles the game logic
const gameLogic =(() => {
    const player1 = player('x');
    const player2 = player('o');

    let isNextTurnPlayer1 = true;

    let round = 0;

    // possible combinations which results in a winner
    const playerSymbol = () => {
        if (isNextTurnPlayer1){
            isNextTurnPlayer1 = false;
            return 'x';
        }
        else{
            isNextTurnPlayer1 = true;
            return 'o';
        }
    };

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
                    return gameBoard.BOARD[WINNING_COMBINATIONS[i][0]];
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


    return {playerSymbol, checkWin, checkDraw};



})();







// module with logic for the 'html' board
const displayController = (() => {
    const squares_div = document.querySelectorAll(".square");
    const message_div = document.getElementById("message");
    const reset_btn = document.getElementById("reset");

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

            // gameLogic.checkWin();
            gameLogic.checkDraw();

            if(gameLogic.checkWin()){
                console.log("congrats" + gameLogic.checkWin());
            }

            // if winner, congratulate
                // update messageboard
            // disable board


        });
    });


    // eventlistener for reset button
    reset_btn.addEventListener("click", () => gameBoard.resetBoard());


    return {updateBoard};
})();





