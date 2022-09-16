const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
	return sqlite.open({
		filename: 'data/mydb.sqlite',
		driver: sqlite3.Database
	});
}

export default async (req, res) => {
	if (req.method === 'POST') {
		// Process a POST request
		const db = await openDb();
		const statement =
			'INSERT INTO Submission (address, email, discord, project, statusId) VALUES (?,?,?,?,?)';
		const values = [
			req.body.address,
			req.body.email,
			req.body.discord,
			req.body.project,
			1
		];
		await db.run(statement, values);
		res.status(200).send({message: 'Submitted'});
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
