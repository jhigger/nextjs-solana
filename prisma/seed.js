const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
	await prisma.status.createMany({
		data: [
			{ id: 1, name: 'Pending' },
			{ id: 2, name: 'Approved' },
			{ id: 3, name: 'Rejected' }
		]
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
