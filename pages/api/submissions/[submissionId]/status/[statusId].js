const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
	return sqlite.open({
		filename: 'data/mydb.sqlite',
		driver: sqlite3.Database
	});
}

export default async (req, res) => {
	const {submissionId, statusId} = req.query;
	if (req.method === 'PUT') {
		// Process a PUT request
		const db = await openDb();
		const statement = 'UPDATE Submission SET statusId = ? WHERE id = ?';
		const values = [statusId, submissionId];
		await db.run(statement, values);
		res.status(200).send({message: 'Confirmed'});
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
