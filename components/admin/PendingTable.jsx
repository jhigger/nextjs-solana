import {
	CheckIcon,
	CloseIcon,
	HamburgerIcon,
	RepeatIcon
} from '@chakra-ui/icons';
import {
	Center,
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import RejectReasonModal from './RejectReasonModal';

const PendingTable = ({ pending, handleRefresh }) => {
	const toast = useToast();

	const handleApprove = (address) => {
		handleUpdate(address, 2);
	};

	const handleReject = (address, rejectReason) => {
		handleUpdate(address, 3, rejectReason);
	};

	const handleUpdate = (address, statusId, rejectReason = '') => {
		const showToast = () => {
			return toast({
				title: statusId === 2 ? 'Approved' : 'Rejected',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/submissions/${address}`, {
			method: 'PUT',
			body: JSON.stringify({ statusId, rejectReason }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(() => {
				showToast();
				handleRefresh();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Stack
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			spacing={4}
		>
			<Heading as="h2" size="md" alignSelf="center">
				Pending Submissions
			</Heading>
			<Flex justify="end">
				<IconButton
					aria-label="Refresh"
					icon={<RepeatIcon />}
					onClick={handleRefresh}
				/>
			</Flex>
			<TableContainer w="full" h="full" overflowY>
				<Table variant="striped" colorScheme="gray" size="md">
					<Thead>
						<Tr>
							<Th>Community Name</Th>
							<Th>Submitted By</Th>
							<Th textAlign="center">Options</Th>
						</Tr>
					</Thead>
					<Tbody>
						{pending.map((row) => {
							return (
								<Tr key={row.address}>
									<Td>{row?.communityName}</Td>
									<Td>{row?.discordId}</Td>
									<Td>
										<Menu>
											<Center>
												<MenuButton
													as={IconButton}
													aria-label="Options"
													icon={<HamburgerIcon />}
													variant="ghost"
												/>
											</Center>
											<MenuList>
												<MenuItem
													icon={<CheckIcon />}
													onClick={() =>
														handleApprove(
															row.address
														)
													}
												>
													Approve
												</MenuItem>
												<RejectReasonModal
													icon={<CloseIcon />}
													handleReject={handleReject}
													address={row.address}
												/>
											</MenuList>
										</Menu>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default PendingTable;
