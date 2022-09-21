import prisma from '../../../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'GET') {
			// Process a GET request
			const {status} = req.query;
			const result = await prisma.submission.findMany({
				where: {statusId: Number(status)},
				include: {status: true}
			});
			res.status(200).json(result);
		} else {
			// Handle any other HTTP method
			res.status(200).json({name: 'Hello, world!'});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
