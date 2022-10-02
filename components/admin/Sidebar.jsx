import { CheckIcon, CloseIcon, TimeIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	CloseButton,
	Container,
	Drawer,
	DrawerContent,
	Flex,
	Icon,
	IconButton,
	Spacer,
	Stack,
	useColorModeValue,
	useDisclosure
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { HiUserGroup } from 'react-icons/hi';

const LinkItems = [
	{ name: 'Pending', icon: TimeIcon },
	{ name: 'Approved', icon: CheckIcon },
	{ name: 'Rejected', icon: CloseIcon },
	{ name: 'Admins', icon: HiUserGroup }
];

export default function Sidebar({ tabs }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tab, setTab] = useState(0);

	const handleTabChange = (n) => {
		setTab(n);
	};

	return (
		<>
			<SidebarContent
				onClose={onClose}
				display={{ base: 'none', md: 'block' }}
				tab={tab}
				handleTabChange={handleTabChange}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent
						onClose={onClose}
						handleTabChange={handleTabChange}
					/>
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 48 }} p="4">
				<Container maxW="fit-content" py={4}>
					{tabs[tab]}
				</Container>
			</Box>
		</>
	);
}

const SidebarContent = ({ onClose, tab, handleTabChange, ...rest }) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 48 }}
			pos="fixed"
			h="full"
			mt={{ base: 'full', md: '-68px' }}
			pt={{ base: 'full', md: '68px' }}
			zIndex={1}
			{...rest}
		>
			<Flex alignItems="center" m="8" justifyContent="space-between">
				<CloseButton
					display={{ base: 'flex', md: 'none' }}
					onClick={onClose}
				/>
			</Flex>
			<Flex direction="column" h="80%">
				<Stack spacing={4}>
					{LinkItems.map((link, i) => (
						<NavItem
							key={link.name}
							icon={link.icon}
							onClick={() => {
								onClose();
								handleTabChange(i);
							}}
							borderRight={tab === i ? '2px' : ''}
						>
							{link.name}
						</NavItem>
					))}
				</Stack>
				<Spacer />
				<NavItem onClick={signOut} icon={FiLogOut}>
					Logout
				</NavItem>
			</Flex>
		</Box>
	);
};

const NavItem = ({ icon, children, ...rest }) => {
	return (
		<Button
			leftIcon={<Icon as={icon} />}
			colorScheme="gray"
			variant="ghost"
			borderRadius={0}
			{...rest}
		>
			{children}
		</Button>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FiMenu />}
			/>
		</Flex>
	);
};
