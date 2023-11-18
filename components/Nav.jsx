import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Flex,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	useColorMode,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import logo from '../assets/logo.png';
import { dropDownItems, homeLink, links } from '../links';

const NavLink = ({ href, children, ...rest }) => (
	<NextLink href={href.toLowerCase()} passHref>
		<Button
			isExternal
			as={Link}
			colorscheme="gray"
			color={useColorModeValue('black', 'white')}
			bg="none"
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.100', 'gray.700')
			}}
			{...rest}
		>
			{children}
		</Button>
	</NextLink>
);

const Logo = () => (
	<Link href={homeLink} filter={useColorModeValue('invert(100%)')}>
		<Image src={logo} alt="Logo" width="163px" height="40px" />
	</Link>
);

export default function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

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
						<Stack direction={'row'} spacing={2}>
							{links.map((item) => {
								return (
									<NavLink href={item.href}>
										{item.text}
									</NavLink>
								);
							})}
							<Menu isOpen={isOpen}>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									onMouseEnter={onOpen}
									onMouseLeave={onClose}
								>
									Utilities
								</MenuButton>
								<MenuList
									onMouseEnter={onOpen}
									onMouseLeave={onClose}
								>
									{dropDownItems.map((item) => {
										return (
											<MenuItem
												as={NavLink}
												href={item.href}
											>
												{item.text}
											</MenuItem>
										);
									})}
								</MenuList>
							</Menu>

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
