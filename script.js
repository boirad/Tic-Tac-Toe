const square = document.querySelectorAll(".square");
const resultMessage = document.querySelector("#result");
const restartBtn = document.querySelector("#restart");


let isPlayer_1;
let isPlayer_2;

const player = function (name, marker){
    return { name, marker };
};

player_1 = player("player_1", "X");
player_2 = player("player_2", "O");


let gameBoard = {
    gameStatus: ["", "", "", "", "", "", "", "", ""]
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


square.forEach(square => {
    square.addEventListener("click", () => {
        let squareIndex = square.getAttribute('data-square');
            if(isPlayer_1){
                resultMessage.textContent = "It's Player 2 turn";
                square.textContent = player_1.marker;
                gameBoard.gameStatus[squareIndex] = player_1.marker;
                square.classList.add("disable");
                isPlayer_1 = false;
                isPlayer_2 = true
            } else {
                resultMessage.textContent = "It's Player 1 turn";
                square.textContent = player_2.marker;
                gameBoard.gameStatus[squareIndex] = player_2.marker;
                square.classList.add("disable");
                isPlayer_1 = true;
                isPlayer_2 = false;
            }
        checkResult();        
    });
});


restartBtn.addEventListener("click", () => {
    gameBoard.gameStatus = ["", "", "", "", "", "", "", "", ""];
    square.forEach(square => {
        square.classList.remove("disable");
        square.textContent = "";
    })
})


function checkResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard.gameStatus[winCondition[0]];
        let b = gameBoard.gameStatus[winCondition[1]];
        let c = gameBoard.gameStatus[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        if(isPlayer_2){
            resultMessage.textContent = "Player 1 won!";
            square.forEach(square => {
                square.classList.add("disable");
            })
        } else {
            resultMessage.textContent = "Player 2 won!"
            square.forEach(square => {
                square.classList.add("disable");
            })
        }
        
        return;
    }

    let roundDraw = !gameBoard.gameStatus.includes("");
    if (roundDraw) {
        resultMessage.textContent = "It's a tie!";
        return;
    }
}

