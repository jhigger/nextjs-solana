import { Flex, Heading } from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Card from '../Card';

const Header = () => {
	return (
		<Card
			as={Flex}
			justify="space-between"
			align="center"
			direction={['column', 'row']}
			gap={4}
		>
			<Heading as="h1">Client Portal</Heading>
			<WalletMultiButton />
		</Card>
	);
};

export default Header;
