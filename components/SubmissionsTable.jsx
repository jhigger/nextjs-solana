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
import {useEffect, useState} from 'react';

const SubmissionsTable = ({publicKey, refresh}) => {
	const [submissions, setSubmissions] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`http://localhost:3000/api/submissions/address/${publicKey?.toBase58()}`
			);
			const data = await res.json();
			setSubmissions(data);
		}
		fetchData();
	}, [refresh]);

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
				Your Submissions
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
						{submissions.map((row) => {
							return (
								<Tr key={row.id}>
									<Td>{row.project}</Td>
									<Td>{row.status_name}</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default SubmissionsTable;
