const GRID_SIZE = 4;
const VICTORY_VALUE = 2048;

createTable();
resetScore();
createRandom();
createRandom();
console.table(gameState.table);

const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", function(event) {
	switch(event.key) {
		case "ArrowUp":
			moveUp();
			console.table(gameState.table);
			break;
		case "ArrowDown":
			moveDown();
			console.table(gameState.table);
			break;
		case "ArrowLeft":
			moveLeft();
			console.table(gameState.table);
			break;
		case "ArrowRight":
			moveRight();
			console.table(gameState.table);
			break;
	}
});
