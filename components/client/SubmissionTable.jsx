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
	Spinner,
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

const SubmissionTable = ({ submission, isLoading, refresh }) => {
	const {
		discordId,
		communityName,
		discordUrl,
		twitterUrl,
		paymentPlan,
		status,
		link
	} = submission;

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
					onClick={refresh}
				/>
			</Flex>
			{isLoading ? (
				<Center>
					<Spinner alignSelf="center" />
				</Center>
			) : (
				<TableContainer w="full" h="full" overflowY>
					<Table variant="striped" colorScheme="gray">
						<Thead>
							<Tr>
								<Th>Discord ID</Th>
								<Th>Community Name</Th>
								<Th>Discord URL</Th>
								<Th>Twitter URL</Th>
								<Th>Payment Plan</Th>
								<Th textAlign="center">Status</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>
									<Link
										href={`discordapp.com/users/${discordId}`}
										isExternal
									>
										{discordId}
									</Link>
								</Td>
								<Td>{communityName}</Td>
								<Td>
									<Link href={discordUrl} isExternal>
										{discordUrl}
									</Link>
								</Td>
								<Td>
									<Link href={twitterUrl} isExternal>
										{twitterUrl}
									</Link>
								</Td>
								<Td>{paymentPlan}</Td>
								<Td>
									<Center>
										<Pill status={status?.name} />
									</Center>
								</Td>
							</Tr>
						</Tbody>
						<TableCaption>
							{link && (
								<Link href={link} isExternal>
									{link} <ExternalLinkIcon mx="2px" />
								</Link>
							)}
						</TableCaption>
					</Table>
				</TableContainer>
			)}
		</Stack>
	);
};

export default SubmissionTable;
