boxes = document.querySelectorAll('.box');
resetButton = document.querySelector('.reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] 
];

function handleBoxClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        boxes[index].disabled = true;

        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (gameBoard.every(cell => cell !== '')) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    boxes.forEach(box => {
        box.textContent = '';
        box.disabled = false;
    });
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

resetButton.addEventListener('click', resetGame);