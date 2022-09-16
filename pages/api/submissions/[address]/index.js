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
		const statement = `
			SELECT sub.*, stat.name AS status_name
			FROM Submission sub JOIN Status stat
			ON sub.statusId = stat.id
			WHERE address = ?`;
		const result = await db.get(statement, req.query.address);
		res.status(200).json({...result});
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
