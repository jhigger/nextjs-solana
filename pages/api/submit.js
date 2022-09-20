import prisma from '../../lib/prisma';

export default async (req, res) => {
	if (req.method === 'POST') {
		// Process a POST request
		const {address, email, discord, project} = req.body;
		await prisma.submission.create({
			data: {address, email, discord, project}
		});
		res.status(200).send({message: 'Submitted'});
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
