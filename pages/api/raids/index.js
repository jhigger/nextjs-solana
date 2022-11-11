import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
	const session = await getSession({ req });

	try {
		if (req.method === 'GET') {
			// Process a GET request
			const result = await prisma.raid.findMany();
			res.status(200).json(result);
		} else if (req.method === 'PUT') {
			// Process a PUT request
			if (!session) {
				return res.status(401).json({ error: 'Unauthenticated user' });
			}

			const { signature, raided } = req.body;

			const result = await prisma.raid.update({
				where: { signature },
				data: {
					raided,
					updated_at: new Date()
				}
			});
			res.status(200).json(result);
		} else {
			// Handle any other HTTP method
			res.status(200).json({ name: 'Hello, world!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
