import prisma from '../../../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'GET') {
			// Process a GET request
			const { address } = req.query;
			const result = await prisma.submission.findFirst({
				where: { address },
				include: { status: true }
			});
			res.status(200).json(result);
		} else if (req.method === 'PUT') {
			const { address } = req.query;
			const { statusId, link, rejectReason } = req.body;
			const result = await prisma.submission.update({
				where: { address },
				data: { statusId, link, rejectReason, updatedAt: new Date() }
			});
			res.status(200).json(result);
		} else {
			// Handle any other HTTP method
			res.status(200).json({ name: 'Hello, world!' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
