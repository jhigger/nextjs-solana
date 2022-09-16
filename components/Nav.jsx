import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	Link,
	Stack,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react';

const NavLink = ({children}) => (
	<Link
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
	const {colorMode, toggleColorMode} = useColorMode();
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
					<Box>Logo</Box>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)}
							</Button>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
