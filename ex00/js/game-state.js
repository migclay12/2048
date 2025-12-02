const gameState = {
	table: [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
	],
	mergedCells: []
};

function checkVictory()
{
	for (let i = 0; i < GRID_SIZE; i++)
	{
		for (let j = 0; j < GRID_SIZE; j++)
		{
			if (gameState.table[i][j] === VICTORY_VALUE)
			{
				setTimeout(() => {
					alert("Victory 🎮");
					resetGame();
				}, 100);
				return true;
			}
		}
	}
	return (false);
}

function checkLost()
{
	for (let i = 0; i < GRID_SIZE; i++)
	{
		for (let j = 0; j < GRID_SIZE; j++)
		{
			if (gameState.table[i][j] === 0)
				return (false);
		}
	}

	for (let i = 0; i < GRID_SIZE; i++)
	{
		for (let j = 0; j < GRID_SIZE - 1; j++)
		{
			if (gameState.table[i][j] === gameState.table[i][j + 1])
				return (false);
		}
	}

	for (let i = 0; i < GRID_SIZE - 1; i++)
	{
		for (let j = 0; j < GRID_SIZE; j++)
		{
			if (gameState.table[i][j] === gameState.table[i + 1][j])
				return (false);
		}
	}

	setTimeout(() => {
		alert("Game Over 👾");
		resetGame();
	}, 100);
	return (true);
}

function resetGame()
{
	for (let i = 0; i < GRID_SIZE; i++)
	{
		for (let j = 0; j < GRID_SIZE; j++)
			gameState.table[i][j] = 0;
	}

	gameState.mergedCells = [];
	createTable();
	resetScore();
	createRandom();
	createRandom();
	console.table(gameState.table);
}

