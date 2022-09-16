import {Flex, Heading, useColorModeValue, Spacer} from '@chakra-ui/react';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';

const Header = () => {
	return (
		<Flex
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
		>
			<Heading as="h1">Client Portal</Heading>
			<Spacer />
			<WalletMultiButton />
		</Flex>
	);
};

export default Header;
