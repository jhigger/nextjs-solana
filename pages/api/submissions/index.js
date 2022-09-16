const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
	return sqlite.open({
		filename: 'data/mydb.sqlite',
		driver: sqlite3.Database
	});
}

export default async (req, res) => {
	if (req.method === 'GET') {
		// Process a GET request
		const db = await openDb();
		const statement = 'SELECT * FROM Submission';
		const result = await db.all(statement);
		res.status(200).json(result);
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
