const board = document.getElementById("board");
        const message = document.getElementById("message");
        const popup = document.getElementById("popup");
        const popupMessage = document.getElementById("popup-message");
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];

        function createBoard() {
            board.innerHTML = "";
            gameBoard.forEach((cell, index) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.dataset.index = index;
                cellElement.innerText = cell;
                cellElement.addEventListener("click", handleClick);
                board.appendChild(cellElement);
            });
        }

        function handleClick(event) {
            const index = event.target.dataset.index;
            if (gameBoard[index] === "") {
                gameBoard[index] = currentPlayer;
                event.target.innerText = currentPlayer;
                event.target.classList.add("taken");
                if (checkWinner()) {
                    popupMessage.innerText = `Player ${currentPlayer} Wins!`;
                    popup.style.display = "block";
                    board.style.pointerEvents = "none";
                    setTimeout(resetGame, 2000);
                    return;
                }
                if (gameBoard.every(cell => cell !== "")) {
                    popupMessage.innerText = "It's a Tie!";
                    popup.style.display = "block";
                    setTimeout(resetGame, 2000);
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8], 
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function resetGame() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            popup.style.display = "none";
            board.style.pointerEvents = "auto";
            createBoard();
        }

        createBoard();