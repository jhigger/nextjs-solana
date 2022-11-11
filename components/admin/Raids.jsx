import {
	CheckIcon,
	CloseIcon,
	ExternalLinkIcon,
	HamburgerIcon,
	RepeatIcon
} from '@chakra-ui/icons';
import {
	Center,
	Flex,
	Heading,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuItem,
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
import { FaTwitter } from 'react-icons/fa';
import useRaid from '../../hooks/useRaid';
import Card from '../Card';

const Raids = () => {
	const { data, isLoading, mutate: refresh } = useRaid();
	const toast = useToast();
	const [loading, setLoading] = useState(false);

	const handleUpdate = (signature, raided) => {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: 'Updated raid.',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/raids`, {
			method: 'PUT',
			body: JSON.stringify({ signature, raided }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then((res) => {
				console.log(res);
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
					Paid Raids
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
									<Th>TX Signature</Th>
									<Th>Address</Th>
									<Th>Payment</Th>
									<Th>Twitter Post</Th>
									<Th>Raided?</Th>
									<Th textAlign="center">Options</Th>
								</Tr>
							</Thead>
							<Tbody>
								{data.map((row) => {
									const address = row?.address;
									const shortAddress =
										address.slice(0, 4) +
										'...' +
										address.slice(-4);

									const signature = row?.signature;
									const shortSignature =
										signature.slice(0, 4) +
										'...' +
										signature.slice(-4);
									return (
										<Tr key={row.signature}>
											<Td>
												<Link
													href={`//solscan.io/tx/${signature}`}
													isExternal
												>
													{shortSignature}{' '}
													<ExternalLinkIcon mx="2px" />
												</Link>
											</Td>
											<Td>{shortAddress}</Td>
											<Td>{row?.payment} SOL</Td>
											<Td>
												<Link
													href={`//${row?.tweet_url}`}
													isExternal
												>
													<IconButton
														aria-label="Twitter URL"
														icon={<FaTwitter />}
														variant="ghost"
													/>
												</Link>
											</Td>
											<Td>
												{row?.raided ? 'Yes' : 'No'}
											</Td>
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
														<MenuItem
															icon={<CheckIcon />}
															onClick={() =>
																handleUpdate(
																	signature,
																	true
																)
															}
														>
															Is raided
														</MenuItem>
														<MenuItem
															icon={<CloseIcon />}
															onClick={() =>
																handleUpdate(
																	signature,
																	false
																)
															}
														>
															Is not raided
														</MenuItem>
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

export default Raids;
