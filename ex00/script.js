const table = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
]

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

function updateScore()
{
	const score = document.querySelector("#score-value");
	const scoreValue = 0;

	score.innerHTML = scoreValue;
}

function randomNumber() {
    return Math.random() < 0.5 ? 2 : 4;
}

function createRandom()
{
	const freeCells = [];
	const cells = document.querySelectorAll(".grid-container .num");

	cells.forEach(cell => {
		if (cell.textContent.trim() === "")
			freeCells.push(cell);
	});

	if (freeCells.length > 0)
	{
		const randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
		randomCell.textContent = randomNumber();
	}
}

createTable();
updateScore();
createRandom();
createRandom();
console.table(table);
