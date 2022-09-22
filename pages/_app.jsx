import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Nav from '../components/Nav';
import theme from '../theme';
import { SessionProvider } from 'next-auth/react';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider = dynamic(
	() => import('../providers/WalletConnectionProvider'),
	{
		ssr: false
	}
);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<ChakraProvider resetCSS theme={theme}>
				<WalletConnectionProvider>
					<Nav />
					<Component {...pageProps} />
				</WalletConnectionProvider>
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
