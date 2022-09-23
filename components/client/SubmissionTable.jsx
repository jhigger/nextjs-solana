import {
	CheckIcon,
	ExternalLinkIcon,
	RepeatIcon,
	SmallCloseIcon,
	TimeIcon
} from '@chakra-ui/icons';
import {
	Center,
	Flex,
	Heading,
	IconButton,
	Link,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	TagLabel,
	TagLeftIcon,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue
} from '@chakra-ui/react';

const Pill = ({ status }) => {
	const variant = {
		Pending: { colorScheme: 'yellow', icon: TimeIcon },
		Approved: { colorScheme: 'green', icon: CheckIcon },
		Rejected: { colorScheme: 'red', icon: SmallCloseIcon }
	};

	return (
		<Tag
			size="lg"
			colorScheme={variant[status]?.colorScheme}
			borderRadius="full"
		>
			<TagLeftIcon boxSize={4} as={variant[status]?.icon} />
			<TagLabel>{status}</TagLabel>
		</Tag>
	);
};

const SubmissionTable = ({ submission, handleRefresh }) => {
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
							<Th>Payment Plan</Th>
							<Th textAlign="center">Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>{submission?.communityName}</Td>
							<Td>{submission?.paymentPlan}</Td>
							<Td>
								<Center>
									<Pill status={submission?.status?.name} />
								</Center>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default SubmissionTable;
