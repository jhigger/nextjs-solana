import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Flex,
	IconButton,
	Link,
	Stack,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import logo from '../assets/logo.png';

const NavLink = ({ href, children, ...rest }) => (
	<NextLink href={href.toLowerCase()} passHref>
		<Link
			as={Button}
			colorscheme="gray"
			bg={bg}
			color="white"
			_hover={{
				textDecoration: 'none',
				bg: 'gray.500'
			}}
			{...rest}
		>
			{children}
		</Link>
	</NextLink>
);

const Logo = () => (
	<NextLink href="/" passHref>
		<Link filter={useColorModeValue('invert(100%)')}>
			<Image src={logo} alt="Logo" width="163px" height="40px" />
		</Link>
	</NextLink>
);

export default function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			shadow="lg"
			bg={useColorModeValue('white', 'gray.800')}
			borderBottomWidth="1px"
			px={4}
			pos="relative"
			zIndex={2}
		>
			<Container maxW="container.lg">
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Logo />
					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<IconButton
								aria-label="Change color mode"
								icon={
									colorMode === 'light' ? (
										<MoonIcon />
									) : (
										<SunIcon />
									)
								}
								onClick={toggleColorMode}
							/>
						</Stack>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
