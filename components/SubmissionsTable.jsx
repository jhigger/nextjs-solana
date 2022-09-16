import {
	useColorModeValue,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Heading,
	Stack
} from '@chakra-ui/react';

const SubmissionsTable = ({submission}) => {
	return (
		<Stack
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			spacing={4}
		>
			<Heading as="h2" size="md" align="center">
				Your Submission
			</Heading>
			<TableContainer w="full" h="full" overflowY>
				<Table variant="striped" colorScheme="gray">
					<Thead>
						<Tr>
							<Th>Project Name</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>{submission?.project}</Td>
							<Td>{submission?.status_name}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default SubmissionsTable;
