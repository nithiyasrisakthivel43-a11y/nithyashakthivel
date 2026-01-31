
class Game {
  constructor() {
    this.cells = Array(9).fill(null);            
    this.currentPlayer = "X";                     
    this.gameOver = false;                        
    this.statusEl = document.getElementById("status");
    
    this.createBoard();                            
    this.showLeaderboard();                        
    this.updateStatus(`${this.currentPlayer}'s Turn`);
  }

  
  checkWin = () => {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],   
      [0,3,6],[1,4,7],[2,5,8],  
      [0,4,8],[2,4,6]            
    ];

    return winPatterns.reduce((winner, [a,b,c]) => {
      if (winner) return winner;
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c])
        return this.cells[a];
      return null;
    }, null);
  }
 
  createBoard() {
    const boardEl = document.getElementById("board");
    boardEl.innerHTML = "";

    this.cells.forEach((_, index) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.onclick = () => this.playMove(index, cell);
      boardEl.appendChild(cell);
    });
  }
  playMove = (index, cellEl) => {
    if (this.gameOver || this.cells[index]) return;
    this.cells[index] = this.currentPlayer;
    cellEl.textContent = this.currentPlayer;


    const winner = this.checkWin();
    if (winner) {
      this.updateStatus(`Player ${winner} wins! 🎉`);
      this.saveScore(winner);
      this.gameOver = true;
      this.showLeaderboard();
      return;
    }
    if (!this.cells.includes(null)) {
      this.updateStatus("It's a draw! 🤝");
      this.gameOver = true;
      return;
    }
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updateStatus(`${this.currentPlayer}'s Turn`);
  }
  saveScore(player) {
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    scores[player] = (scores[player] || 0) + 1;
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  showLeaderboard() {
    const leaderboardEl = document.getElementById("leaderboard");
    leaderboardEl.innerHTML = "";
    const scores = JSON.parse(localStorage.getItem("scores") || "{}");
    for (let player in scores) {
      leaderboardEl.innerHTML += `<li>Player ${player}: ${scores[player]} wins</li>`;
    }
  }
  updateStatus(msg) {
    this.statusEl.textContent = msg;
  }
}
document.getElementById("resetBtn").onclick = () => location.reload();
new Game();