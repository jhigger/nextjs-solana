import prisma from '../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'POST') {
			// Process a POST request
			const {
				address,
				discordId,
				communityName,
				discordServerUrl,
				twitterUrl,
				service
			} = req.body;
			await prisma.submission.create({
				data: {
					address,
					discordId,
					communityName,
					discordServerUrl,
					twitterUrl,
					service
				}
			});
			res.status(200).json({ message: 'Submitted' });
		} else {
			// Handle any other HTTP method
			res.status(200).json({ name: 'Hello, world!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
