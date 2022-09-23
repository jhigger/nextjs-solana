import { EditIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
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

function LinkInput({ address, link, handleRefresh }) {
	const { handleSubmit, control } = useForm();
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const { field } = useController({
		name: 'link',
		defaultValue: link,
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

		fetch(
			`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/submissions/${address}`,
			{
				method: 'PUT',
				body: JSON.stringify(values),
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			}
		)
			.then((data) => {
				setLoading(false);
				showToast();
				handleRefresh();
			})
			.catch((err) => console.log(err));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputGroup minW="48">
				<Input
					id="link"
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
							aria-label="Update link"
							icon={<EditIcon />}
						/>
					)}
				</InputRightElement>
			</InputGroup>
		</form>
	);
}

const ApprovedTable = ({ approved, handleRefresh }) => {
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
					onClick={handleRefresh}
				/>
			</Flex>
			<TableContainer w="full" h="full" overflowY>
				<Table variant="striped" colorScheme="gray">
					<Thead>
						<Tr>
							<Th>Community Name</Th>
							<Th>Submitted By</Th>
							<Th textAlign="center">Link</Th>
						</Tr>
					</Thead>
					<Tbody>
						{approved.map((row) => {
							return (
								<Tr key={row.address}>
									<Td>{row?.communityName}</Td>
									<Td>{row?.discordId}</Td>
									<Td>
										<LinkInput
											address={row.address}
											link={row?.link}
											handleRefresh={handleRefresh}
										/>
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

export default ApprovedTable;
