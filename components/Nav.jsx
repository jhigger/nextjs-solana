import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	IconButton,
	Link,
	Stack,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { Link as NextLink } from 'next/link';

const NavLink = ({ children }) => (
	<Link
		as={NextLink}
		px={2}
		py={1}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700')
		}}
		href={'#'}
	>
		{children}
	</Link>
);

export default function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { status } = useSession();

	return (
		<>
			<Box
				shadow="md"
				bg={useColorModeValue('gray.50', 'gray.900')}
				borderBottomWidth="1px"
				px={4}
			>
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Link as={NextLink} href="/">
						<Box>Logo</Box>
					</Link>
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
							{status === 'authenticated' && (
								<Button
									onClick={() => {
										signOut();
									}}
								>
									Logout
								</Button>
							)}
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
