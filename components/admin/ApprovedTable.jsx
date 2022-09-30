import { EditIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Button,
	Center,
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Spinner,
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
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { FaCopy, FaDiscord, FaTwitter } from 'react-icons/fa';
import useStatus from '../../hooks/useStatus';

const LinkInput = ({ address, botLink, refresh }) => {
	const { handleSubmit, control } = useForm();
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const { field } = useController({
		name: 'botLink',
		defaultValue: botLink,
		control
	});

	const onSubmit = (values) => {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: 'Link updated',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`/api/submissions/${address}`, {
			method: 'PUT',
			body: JSON.stringify(values),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then((data) => {
				showToast();
				refresh();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputGroup minW="48">
				<Input
					id="botLink"
					variant="flushed"
					{...field}
					type="text"
					placeholder="Enter Link"
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
		</form>
	);
};

const ApprovedTable = () => {
	const { data, isLoading, mutate: refresh } = useStatus(2);
	const toast = useToast();

	const handleCopy = (id) => {
		navigator.clipboard.writeText(id);
		return toast({
			title: 'Discord ID Copied',
			status: 'info',
			isClosable: true
		});
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
				Approved Submissions
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
					<Table variant="striped" colorScheme="gray">
						<Thead>
							<Tr>
								<Th>Discord ID</Th>
								<Th>Community Name</Th>
								<Th>Discord Server</Th>
								<Th>Twitter </Th>
								<Th>Service</Th>
								<Th textAlign="center">Bot Link</Th>
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
													handleCopy(row?.discordId)
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
											<LinkInput
												address={row.address}
												botLink={row?.botLink}
												refresh={refresh}
											/>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</Stack>
	);
};

export default ApprovedTable;
