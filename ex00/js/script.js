const table = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
]

let mergedCells = [];

function copyTable()
{
	const tableCopy = [];
	for (let i = 0; i < 4; i++)
	{
		tableCopy[i] = [];
		for (let j = 0; j < 4; j++)
		{
			tableCopy[i][j] = table[i][j];
		}
	}
	return (tableCopy);
}

function equalTables(table1, table2)
{
	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 4; j++)
		{
			if (table1[i][j] !== table2[i][j])
				return (false);
		}
	}
	return (true);
}

function checkVictory()
{
	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 4; j++)
		{
			if (table[i][j] === 2048)
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
	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 4; j++)
		{
			if (table[i][j] === 0)
				return (false);
		}
	}

	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 3; j++)
		{
			if (table[i][j] === table[i][j + 1])
				return (false);
		}
	}

	for (let i = 0; i < 3; i++)
	{
		for (let j = 0; j < 4; j++)
		{
			if (table[i][j] === table[i + 1][j])
				return (false);
		}
	}

	setTimeout(() => {
		alert("Game Over 👾");
		resetGame();
	}, 100);
	return (true);
}

function createTable()
{
	const gameTable = document.querySelector(".grid-container");

	gameTable.innerHTML = "";
	for (let row of table)
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
	const currentScore = parseInt(score.textContent);
	const newScore = currentScore + sum;

	score.innerHTML = newScore;

	const topScore = document.querySelector("#top-score-value");
	const currentTopScore = parseInt(topScore.textContent) || 0; // Usar || 0 para manejar NaN
	
	if (newScore > currentTopScore)
		topScore.textContent = newScore;
}

function resetScore()
{
	const score = document.querySelector("#score-value");
	score.textContent = 0;
}

function randomNumber() {
	return Math.random() < 0.5 ? 2 : 4;
}

function createRandom()
{
	const freeCells = [];
	const cells = document.querySelectorAll(".grid-container .num");

	cells.forEach((cell, index) => {
		if (cell.textContent.trim() === "")
		{
			const row = Math.floor(index / 4);
			const col = index % 4;
			freeCells.push({cell: cell, row: row, col: col});
		}
	});

	if (freeCells.length > 0)
	{
		const randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
		const number = randomNumber();

		randomCell.cell.textContent = number;
		table[randomCell.row][randomCell.col] = number;

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

createTable();
resetScore();
createRandom();
createRandom();
console.table(table);

function resetGame()
{
	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 4; j++)
			table[i][j] = 0;
	}

	createTable();
	resetScore();
	createRandom();
	createRandom();
	console.table(table);
}

const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", resetGame);

function compactToStart(arr)
{
	const result = [];
	for (let i = 0; i < arr.length; i++)
	{
		if (arr[i] !== 0)
			result.push(arr[i]);
	}

	while (result.length < arr.length)
		result.push(0);
	return result;
}

function compactToEnd(arr)
{
	const nums = [];
	for (let i = 0; i < arr.length; i++)
	{
		if (arr[i] !== 0)
			nums.push(arr[i]);
	}

	const zeros = arr.length - nums.length;
	const result = [];
	for (let i = 0; i < zeros; i++)
		result.push(0);
	for (let i = 0; i < nums.length; i++)
		result.push(nums[i]);
	return result;
}

function moveUp()
{
	const oldTable = copyTable();
	mergedCells = [];
	
	for (let col = 0; col < 4; col++)
	{
		let column = [];
		for (let row = 0; row < 4; row++)
		{
			column.push(table[row][col]);
		}

		let updated = compactToStart(column);

		for (let i = 0; i < 3; i++)
		{
			if (updated[i] !== 0 && updated[i] == updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = compactToStart(updated);

		for (let row = 0; row < 4; row++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[row];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				mergedCells.push({row: row, col: col});
			}
			table[row][col] = final[row];
		}
	}
	
	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveDown()
{
	const oldTable = copyTable();
	mergedCells = [];
	
	for (let col = 0; col < 4; col++)
	{
		let column = [];
		for (let row = 0; row < 4; row++)
		{
			column.push(table[row][col]);
		}

		let updated = compactToEnd(column);

		for (let i = 3; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] == updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}

		let final = compactToEnd(updated);

		for (let row = 0; row < 4; row++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[row];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				mergedCells.push({row: row, col: col});
			}
			table[row][col] = final[row];
		}
	}
	
	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveLeft()
{
	const oldTable = copyTable();
	mergedCells = [];

	for (let row = 0; row < 4; row++)
	{
		let rows = [];
		for (let col = 0; col < 4; col++)
		{
			rows.push(table[row][col]);
		}

		let updated = compactToStart(rows);

		for (let i = 0; i < 3; i++)
		{
			if (updated[i] !== 0 && updated[i] == updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = compactToStart(updated);

		for (let col = 0; col < 4; col++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[col];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				mergedCells.push({row: row, col: col});
			}
			table[row][col] = final[col];
		}
	}

	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveRight()
{
	const oldTable = copyTable();
	mergedCells = [];

	for (let row = 0; row < 4; row++)
	{
		let rows = [];
		for (let col = 0; col < 4; col++)
		{
			rows.push(table[row][col]);
		}

		let updated = compactToEnd(rows);

		for (let i = 3; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] == updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}
		
		let final = compactToEnd(updated);

		for (let col = 0; col < 4; col++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[col];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				mergedCells.push({row: row, col: col});
			}
			table[row][col] = final[col];
		}
	}

	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function animateMergedCells()
{
	mergedCells.forEach(cell => {
		const cells = document.querySelectorAll(".grid-container .num");
		const index = cell.row * 4 + cell.col;
		if (cells[index])
		{
			cells[index].classList.add("tile-merged");
			setTimeout(() => {
				cells[index].classList.remove("tile-merged");
			}, 200);
		}
	});
}

document.addEventListener("keydown", function(event) {
	switch(event.key) {
		case "ArrowUp":
			moveUp();
			console.table(table);
			break;
		case "ArrowDown":
			moveDown();
			console.table(table);
			break;
		case "ArrowLeft":
			moveLeft();
			console.table(table);
			break;
		case "ArrowRight":
			moveRight();
			console.table(table);
			break;
	}
});
