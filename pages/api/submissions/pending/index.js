import prisma from '../../../../lib/prisma';

export default async (req, res) => {
	if (req.method === 'GET') {
		// Process a GET request
		const result = await prisma.submission.findMany({
			where: {statusId: 1},
			include: {status: true}
		});
		res.status(200).json(result);
	} else {
		// Handle any other HTTP method
		res.status(200).json({name: 'Hello, world!'});
	}
};
