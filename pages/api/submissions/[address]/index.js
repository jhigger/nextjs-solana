import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async (req, res) => {
	const session = await getSession({ req });

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
			// Process a PUT request
			if (!session) {
				return res.status(401).json({ error: 'Unauthenticated user' });
			}

			const { address } = req.query;
			const { statusId, botLink, rejectReason } = req.body;
			const result = await prisma.submission.update({
				where: { address },
				data: { statusId, botLink, rejectReason, updatedAt: new Date() }
			});
			res.status(200).json(result);
		} else if (req.method === 'DELETE') {
			// Process a DELETE request
			if (!session) {
				return res.status(401).json({ error: 'Unauthenticated user' });
			}

			const { address } = req.query;
			const result = await prisma.submission.delete({
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
