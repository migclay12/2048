function createTable()
{
	const gameTable = document.querySelector(".grid-container");

	gameTable.innerHTML = "";
	for (let row of gameState.table)
	{
		for (let value of row)
		{
			const cell = document.createElement("div");
			cell.classList.add("num");
			if (value !== 0)
			{
				cell.classList.add(`tile-${value}`);
				cell.textContent = parseInt(value);
			}
			else
				cell.textContent = "";
			gameTable.appendChild(cell);
		}
	}
}

function updateScore(sum)
{
	const score = document.querySelector("#score-value");
	const currentScore = parseInt(score.textContent) || 0;
	const newScore = currentScore + sum;

	score.innerHTML = newScore;

	const topScore = document.querySelector("#top-score-value");
	const currentTopScore = parseInt(topScore.textContent) || 0;
	
	if (newScore > currentTopScore)
		topScore.textContent = newScore;
}

function resetScore()
{
	const score = document.querySelector("#score-value");
	score.textContent = 0;
}

function createRandom()
{
	const freeCells = [];
	const cells = document.querySelectorAll(".grid-container .num");

	cells.forEach((cell, index) => {
		if (cell.textContent.trim() === "")
		{
			const row = Math.floor(index / GRID_SIZE);
			const col = index % GRID_SIZE;
			freeCells.push({cell: cell, row: row, col: col});
		}
	});

	if (freeCells.length > 0)
	{
		const randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
		const number = randomNumber();

		randomCell.cell.textContent = number;
		gameState.table[randomCell.row][randomCell.col] = number;

		randomCell.cell.classList.forEach(cls => {
			if (cls.startsWith("tile-"))
				randomCell.cell.classList.remove(cls);
		});

		randomCell.cell.classList.add(`tile-${number}`);
		randomCell.cell.classList.add("tile-new");
		setTimeout(() => {
			randomCell.cell.classList.remove("tile-new");
		}, 200);
	}
}

function animateMergedCells()
{
	if (gameState.mergedCells.length === 0) return;
	
	const cells = document.querySelectorAll(".grid-container .num");
	gameState.mergedCells.forEach(cell => {
		const index = cell.row * GRID_SIZE + cell.col;
		if (cells[index])
		{
			cells[index].classList.add("tile-merged");
			setTimeout(() => {
				cells[index].classList.remove("tile-merged");
			}, 200);
		}
	});
}

