import { ExternalLinkIcon, RepeatIcon } from '@chakra-ui/icons';
import {
    Flex, Heading, IconButton, Link, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react';

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
					<TableCaption>
						{submission?.link && (
							<Link href={submission?.link} isExternal>
								{submission?.link} <ExternalLinkIcon mx="2px" />
							</Link>
						)}
					</TableCaption>
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
