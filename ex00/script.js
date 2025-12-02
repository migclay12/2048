const table = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
]

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
				alert("VICTORYYYYYY")
				resetGame();
				return (true);
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

	alert("LOOOOOOOOOOOOOST");
	resetGame();
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
			cell.textContent = value;
			if (cell.textContent == 0)
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

function moveUp()
{
	const oldTable = copyTable(table);
	for (let col = 0; col < 4; col++)
	{
		let column = [];
		for (let row = 0; row < 4; row++)
		{
			column.push(table[row][col]);
		}

		let updated = [];
		for (let i = 0; i < column.length; i++)
		{
			if (column[i] !== 0)
				updated.push(column[i]);
		}

		while (updated.length < 4)
			updated.push(0);

		for (let i = 0; i < 3; i++)
		{
			if (updated[i] !== 0 && updated[i] == updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = [];
		for (let i = 0; i < updated.length; i++)
		{
			if (updated[i] !== 0)
				final.push(updated[i]);
		}
		
		while (final.length < 4)
			final.push(0);

		for (let row = 0; row < 4; row++)
		{
			table[row][col] = final[row];
		}
	}
	
	createTable();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveDown()
{
	const oldTable = copyTable(table);
	for (let col = 0; col < 4; col++)
	{
		let column = [];
		for (let row = 0; row < 4; row++)
		{
			column.push(table[row][col]);
		}

		let numbers = [];
		for (let i = 0; i < 4; i++)
		{
			if (column[i] !== 0)
				numbers.push(column[i]);
		}

		let updated = [];
		let zeros = 4 - numbers.length;
		for (let i = 0; i < zeros; i++)
		{
			updated.push(0);
		}

		for (let i = 0; i < numbers.length; i++)
		{
			updated.push(numbers[i]);
		}

		for (let i = 3; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] == updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}

		let newNumbers = [];
		for (let i = 0; i < 4; i++)
		{
			if (updated[i] !== 0)
				newNumbers.push(updated[i]);
		}

		let final = [];
		zeros = 4 - newNumbers.length;
		for (let i = 0; i < zeros; i++)
		{
			final.push(0);
		}

		for (let i = 0; i < newNumbers.length; i++)
		{
			final.push(newNumbers[i]);
		}

		for (let row = 0; row < 4; row++)
		{
			table[row][col] = final[row];
		}
	}
	
	createTable();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveLeft()
{
	const oldTable = copyTable(table);
	for (let row = 0; row < 4; row++)
	{
		let rows = [];
		for (let col = 0; col < 4; col++)
		{
			rows.push(table[row][col]);
		}

		let updated = [];
		for (let i = 0; i < rows.length; i++)
		{
			if (rows[i] !== 0)
				updated.push(rows[i]);
		}

		while (updated.length < 4)
			updated.push(0);

		for (let i = 0; i < 3; i++)
		{
			if (updated[i] !== 0 && updated[i] == updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = [];
		for (let i = 0; i < updated.length; i++)
		{
			if (updated[i] !== 0)
				final.push(updated[i]);
		}
		
		while (final.length < 4)
			final.push(0);

		for (let col = 0; col < 4; col++)
		{
			table[row][col] = final[col];
		}
	}

	createTable();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

function moveRight()
{
	const oldTable = copyTable(table);
	for (let row = 0; row < 4; row++)
	{
		let rows = [];
		for (let col = 0; col < 4; col++)
		{
			rows.push(table[row][col]);
		}

		let numbers = [];
		for (let i = 0; i < 4; i++)
		{
			if (rows[i] !== 0)
				numbers.push(rows[i]);
		}

		let updated = [];
		let zeros = 4 - numbers.length;
		for (let i = 0; i < zeros; i++)
		{
			updated.push(0);
		}

		for (let i = 0; i < numbers.length; i++)
		{
			updated.push(numbers[i]);
		}

		for (let i = 3; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] == updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}
		
		let newNumbers = [];
		for (let i = 0; i < 4; i++)
		{
			if (updated[i] !== 0)
				newNumbers.push(updated[i]);
		}

		let final = [];
		zeros = 4 - newNumbers.length;
		for (let i = 0; i < zeros; i++)
		{
			final.push(0);
		}

		for (let i = 0; i < newNumbers.length; i++)
		{
			final.push(newNumbers[i]);
		}

		for (let col = 0; col < 4; col++)
		{
			table[row][col] = final[col];
		}
	}

	createTable();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, table))
		createRandom();
	if (checkLost())
		return ;
}

document.addEventListener("keydown", function(event) {
	//event.preventDefault();

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
