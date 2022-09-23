import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.status.createMany({
		data: [{ name: 'Pending' }, { name: 'Approve' }, { name: 'Rejected' }]
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
