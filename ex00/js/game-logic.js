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
	const oldTable = copyTable(gameState.table);
	gameState.mergedCells = [];
	
	for (let col = 0; col < GRID_SIZE; col++)
	{
		let column = [];
		for (let row = 0; row < GRID_SIZE; row++)
		{
			column.push(gameState.table[row][col]);
		}

		let updated = compactToStart(column);

		for (let i = 0; i < GRID_SIZE - 1; i++)
		{
			if (updated[i] !== 0 && updated[i] === updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = compactToStart(updated);

		for (let row = 0; row < GRID_SIZE; row++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[row];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				gameState.mergedCells.push({row: row, col: col});
			}
			gameState.table[row][col] = final[row];
		}
	}
	
	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, gameState.table))
		createRandom();
	if (checkLost())
		return ;
}

function moveDown()
{
	const oldTable = copyTable(gameState.table);
	gameState.mergedCells = [];
	
	for (let col = 0; col < GRID_SIZE; col++)
	{
		let column = [];
		for (let row = 0; row < GRID_SIZE; row++)
		{
			column.push(gameState.table[row][col]);
		}

		let updated = compactToEnd(column);

		for (let i = GRID_SIZE - 1; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] === updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}

		let final = compactToEnd(updated);

		for (let row = 0; row < GRID_SIZE; row++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[row];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				gameState.mergedCells.push({row: row, col: col});
			}
			gameState.table[row][col] = final[row];
		}
	}
	
	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, gameState.table))
		createRandom();
	if (checkLost())
		return ;
}

function moveLeft()
{
	const oldTable = copyTable(gameState.table);
	gameState.mergedCells = [];

	for (let row = 0; row < GRID_SIZE; row++)
	{
		let rows = [];
		for (let col = 0; col < GRID_SIZE; col++)
		{
			rows.push(gameState.table[row][col]);
		}

		let updated = compactToStart(rows);

		for (let i = 0; i < GRID_SIZE - 1; i++)
		{
			if (updated[i] !== 0 && updated[i] === updated[i + 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i + 1] = 0;
			}
		}

		let final = compactToStart(updated);

		for (let col = 0; col < GRID_SIZE; col++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[col];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				gameState.mergedCells.push({row: row, col: col});
			}
			gameState.table[row][col] = final[col];
		}
	}

	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, gameState.table))
		createRandom();
	if (checkLost())
		return ;
}

function moveRight()
{
	const oldTable = copyTable(gameState.table);
	gameState.mergedCells = [];

	for (let row = 0; row < GRID_SIZE; row++)
	{
		let rows = [];
		for (let col = 0; col < GRID_SIZE; col++)
		{
			rows.push(gameState.table[row][col]);
		}

		let updated = compactToEnd(rows);

		for (let i = GRID_SIZE - 1; i > 0; i--)
		{
			if (updated[i] !== 0 && updated[i] === updated[i - 1])
			{
				updated[i] = updated[i] * 2;
				updateScore(updated[i]);
				updated[i - 1] = 0;
			}
		}
		
		let final = compactToEnd(updated);

		for (let col = 0; col < GRID_SIZE; col++)
		{
			const oldValue = oldTable[row][col];
			const newValue = final[col];
			if (oldValue !== 0 && newValue !== 0 && newValue === oldValue * 2)
			{
				gameState.mergedCells.push({row: row, col: col});
			}
			gameState.table[row][col] = final[col];
		}
	}

	createTable();
	animateMergedCells();
	if (checkVictory())
		return ;
	if (!equalTables(oldTable, gameState.table))
		createRandom();
	if (checkLost())
		return ;
}

