import { HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Button,
	Center,
	Flex,
	Heading,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuList,
	Spinner,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCopy, FaDiscord, FaTwitter } from 'react-icons/fa';
import useStatus from '../../hooks/useStatus';
import Card from '../Card';
import ApproveBotLinkModal from './ApproveBotLinkModal';
import RejectReasonModal from './RejectReasonModal';

const PendingTable = () => {
	const { data, isLoading, mutate: refresh } = useStatus(1);
	const toast = useToast();
	const [loading, setLoading] = useState(false);

	const handleCopy = (id) => {
		navigator.clipboard.writeText(id);
		return toast({
			title: 'Discord ID Copied',
			status: 'info',
			isClosable: true
		});
	};

	const handleApprove = (address, botLink) => {
		handleUpdate(address, 2, { botLink });
	};

	const handleReject = (address, rejectReason) => {
		handleUpdate(address, 3, { rejectReason });
	};

	const handleUpdate = (address, statusId, update = {}) => {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: statusId === 2 ? 'Approved' : 'Rejected',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/submissions/${address}`, {
			method: 'PUT',
			body: JSON.stringify({ statusId, ...update }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(() => {
				showToast();
				refresh();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Card>
			<Stack spacing={4}>
				<Heading as="h2" size="md" alignSelf="center">
					Pending Submissions
				</Heading>
				<Flex justify="end">
					<IconButton
						aria-label="Refresh"
						icon={<RepeatIcon />}
						onClick={refresh}
					/>
				</Flex>
				{!data || isLoading ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					<TableContainer w="full" h="full" overflowY>
						<Table variant="striped" colorScheme="gray" size="md">
							<Thead>
								<Tr>
									<Th>Discord ID</Th>
									<Th>Community Name</Th>
									<Th>Discord Server</Th>
									<Th>Twitter </Th>
									<Th>Service</Th>
									<Th textAlign="center">Options</Th>
								</Tr>
							</Thead>
							<Tbody>
								{data.map((row) => {
									return (
										<Tr key={row.address}>
											<Td>
												<Button
													rightIcon={<FaCopy />}
													variant="link"
													onClick={() =>
														handleCopy(
															row?.discordId
														)
													}
												>
													{row?.discordId}
												</Button>
											</Td>
											<Td>{row?.communityName}</Td>
											<Td>
												<Link
													href={`//${row?.discordServerUrl}`}
													isExternal
												>
													<IconButton
														aria-label="Discord server URL"
														icon={<FaDiscord />}
														variant="ghost"
													/>
												</Link>
											</Td>
											<Td>
												<Link
													href={`//${row?.twitterUrl}`}
													isExternal
												>
													<IconButton
														aria-label="Twitter URL"
														icon={<FaTwitter />}
														variant="ghost"
													/>
												</Link>
											</Td>
											<Td>{row?.service}</Td>
											<Td>
												<Menu>
													<Center>
														<MenuButton
															as={IconButton}
															aria-label="Options"
															icon={
																loading ? (
																	<Spinner size="sm" />
																) : (
																	<HamburgerIcon />
																)
															}
															variant="ghost"
														/>
													</Center>
													<MenuList>
														<ApproveBotLinkModal
															handleApprove={
																handleApprove
															}
															address={
																row.address
															}
														/>
														<RejectReasonModal
															handleReject={
																handleReject
															}
															address={
																row.address
															}
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
				)}
			</Stack>
		</Card>
	);
};

export default PendingTable;
