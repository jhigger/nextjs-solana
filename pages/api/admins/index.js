import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ error: 'Unauthenticated user' });
	}

	try {
		if (req.method === 'GET') {
			// Process a GET request
			const result = await prisma.admin.findMany();
			res.status(200).json(result);
		} else if (req.method === 'POST') {
			// Process a POST request
			const { address } = req.body;
			const result = await prisma.admin.create({
				data: { address }
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
