import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Nav from '../components/Nav';
import theme from '../theme';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider = dynamic(
	() => import('../providers/WalletConnectionProvider'),
	{
		ssr: false
	}
);

function MyApp({Component, pageProps}) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<WalletConnectionProvider>
				<Nav />
				<Component {...pageProps} />
			</WalletConnectionProvider>
		</ChakraProvider>
	);
}

export default MyApp;
