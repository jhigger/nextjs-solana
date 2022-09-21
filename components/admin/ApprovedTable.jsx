import {RepeatIcon} from '@chakra-ui/icons';
import {
	Flex,
	Heading,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useToast,
	IconButton,
	InputGroup,
	Input,
	InputRightElement
} from '@chakra-ui/react';
import {useForm, useController} from 'react-hook-form';
import {EditIcon} from '@chakra-ui/icons';

function LinkInput({address, link, handleRefresh}) {
	const {
		handleSubmit,
		formState: {isSubmitting},
		control
	} = useForm();

	const toast = useToast();

	const {field} = useController({
		name: 'link',
		defaultValue: link,
		control
	});

	const onSubmit = (values) => {
		const showToast = () => {
			return toast({
				title: 'Link updated',
				status: 'info',
				isClosable: true
			});
		};

		fetch(`http://localhost:3000/api/submissions/${address}`, {
			method: 'PUT',
			body: JSON.stringify(values),
			headers: {'Content-type': 'application/json; charset=UTF-8'}
		})
			.then((data) => {
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
					<IconButton
						size="sm"
						isLoading={isSubmitting}
						type="submit"
						colorScheme="purple"
						aria-label="Update link"
						icon={<EditIcon />}
					/>
				</InputRightElement>
			</InputGroup>
		</form>
	);
}

const ApprovedTable = ({approved, handleRefresh}) => {
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
