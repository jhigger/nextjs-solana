import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { username, password } = credentials;

				if (username !== 'admin' || password !== 'admin') {
					throw new Error('Invalid credentials');
				}

				return { authenticated: true };
			}
		})
	],
	pages: { signIn: '/auth/login' }
});
