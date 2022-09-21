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
	Stack,
	IconButton,
	Flex
} from '@chakra-ui/react';
import {RepeatIcon} from '@chakra-ui/icons';

const SubmissionTable = ({submission, handleRefresh}) => {
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
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>{submission?.communityName}</Td>
							<Td>{submission?.status?.name}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default SubmissionTable;
