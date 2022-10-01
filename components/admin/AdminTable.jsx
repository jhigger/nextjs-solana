import { EditIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Box,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
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
import { useForm } from 'react-hook-form';
import useAdmin from '../../hooks/useAdmin';
import Card from '../Card';

const AddressInput = ({ refresh }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset
	} = useForm();
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const onSubmit = ({ address }) => {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: 'Whitelist updated',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/admins`, {
			method: 'POST',
			body: JSON.stringify({ address }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(() => {
				showToast();
				refresh();
				reset();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box w="full">
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl isInvalid={errors.address} isRequired>
					<InputGroup>
						<Input
							id="address"
							variant="flushed"
							type="text"
							{...register('address', {
								required: 'This is required'
							})}
							placeholder="Enter address here"
						/>
						<InputRightElement>
							{loading ? (
								<Spinner size="sm" />
							) : (
								<IconButton
									size="sm"
									type="submit"
									colorScheme="purple"
									aria-label="Update bot link"
									icon={<EditIcon />}
								/>
							)}
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>
						{errors.address && errors.address.message}
					</FormErrorMessage>
				</FormControl>
			</form>
		</Box>
	);
};

const AdminTable = () => {
	const { admins, isLoading, refresh } = useAdmin();
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const handleDelete = (address) => {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: 'Whitelist updated',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/admins/${address}`, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(() => {
				showToast();
				refresh();
				reset();
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
					Admin Whitelist
				</Heading>
				<Flex justify="space-between" gap={4}>
					<AddressInput refresh={refresh} />
					<IconButton
						aria-label="Refresh"
						icon={<RepeatIcon />}
						onClick={refresh}
					/>
				</Flex>
				{!admins || isLoading ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					<TableContainer w="full" h="full" overflowY>
						<Table variant="striped" colorScheme="gray" size="md">
							<Thead>
								<Tr>
									<Th>Wallet Address</Th>
									<Th textAlign="center">Options</Th>
								</Tr>
							</Thead>
							<Tbody>
								{admins.map((row) => {
									return (
										<Tr key={row.address}>
											<Td>{row.address}</Td>
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
															onClick={() =>
																handleDelete(
																	row.address
																)
															}
														>
															Delete
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

export default AdminTable;
