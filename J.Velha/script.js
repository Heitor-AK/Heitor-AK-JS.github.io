document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("#board td");
    const status = document.getElementById("status");
    let gameOver = false;
  
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "" && !gameOver) {
          cell.textContent = "X";
          checkWinner("X");
          if (!gameOver) {
            setTimeout(computerMove, 300);
          }
        }
      });
    });
  
    function computerMove() {
      let emptyCells = Array.from(cells).filter(c => c.textContent === "");
      if (emptyCells.length === 0) return;
      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = "O";
      checkWinner("O");
    }
  
    function checkWinner(player) {
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],  // linhas
        [0,3,6],[1,4,7],[2,5,8],  // colunas
        [0,4,8],[2,4,6]           // diagonais
      ];
  
      let won = wins.some(combo => {
        return combo.every(i => cells[i].textContent === player);
      });
  
      if (won) {
        status.textContent = player + " venceu!";
        gameOver = true;
        return;
      }
  
      if (Array.from(cells).every(c => c.textContent !== "")) {
        status.textContent = "Empate!";
        gameOver = true;
        return;
      }
  
      status.textContent = player === "X" ? "Vez do computador (O)" : "Sua vez (X)";
    }
  
    window.resetGame = function() {
      cells.forEach(c => c.textContent = "");
      status.textContent = "Sua vez (X)";
      gameOver = false;
    }
  });
  