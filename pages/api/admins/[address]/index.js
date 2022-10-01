import prisma from '../../../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'GET') {
			// Process a GET request
			const { address } = req.query;
			const result = await prisma.admin.findFirst({
				where: { address }
			});
			res.status(200).json(result);
		} else if (req.method === 'DELETE') {
			// Process a DELETE request
			const { address } = req.query;
			const result = await prisma.admin.delete({
				where: { address }
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
