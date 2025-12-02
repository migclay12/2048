function copyTable(table)
{
	const tableCopy = [];
	for (let i = 0; i < GRID_SIZE; i++)
	{
		tableCopy[i] = [];
		for (let j = 0; j < GRID_SIZE; j++)
		{
			tableCopy[i][j] = table[i][j];
		}
	}
	return (tableCopy);
}

function equalTables(table1, table2)
{
	for (let i = 0; i < GRID_SIZE; i++)
	{
		for (let j = 0; j < GRID_SIZE; j++)
		{
			if (table1[i][j] !== table2[i][j])
				return (false);
		}
	}
	return (true);
}

function randomNumber() {
	return Math.random() < 0.5 ? 2 : 4;
}

