import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

export default NextAuth({
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { address } = credentials;
				const admin = await prisma.admin.findUnique({
					where: { address }
				});

				if (!admin) {
					throw new Error('Account is not admin!');
				}

				return admin;
			}
		})
	],
	pages: { signIn: '/auth/login' },
	secret: process.env.NEXT_PUBLIC_SECRET
});
