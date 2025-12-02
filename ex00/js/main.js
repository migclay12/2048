// Inicializar el juego
createTable();
resetScore();
createRandom();
createRandom();
console.table(gameState.table);

// Event listener para el botón de reset
const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", resetGame);

// Event listener para las teclas de flecha
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

