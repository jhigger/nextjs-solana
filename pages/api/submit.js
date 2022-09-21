import prisma from '../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'POST') {
			// Process a POST request
			const {
				address,
				discordId,
				communityName,
				discordUrl,
				twitterUrl,
				paymentPlan
			} = req.body;
			await prisma.submission.create({
				data: {
					address,
					discordId,
					communityName,
					discordUrl,
					twitterUrl,
					paymentPlan
				}
			});
			res.status(200).json({message: 'Submitted'});
		} else {
			// Handle any other HTTP method
			res.status(200).json({name: 'Hello, world!'});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
