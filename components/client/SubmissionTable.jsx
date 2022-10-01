import {
	CheckIcon,
	ExternalLinkIcon,
	RepeatIcon,
	SmallCloseIcon,
	TimeIcon
} from '@chakra-ui/icons';
import {
	Box,
	Button,
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
	Text,
	Th,
	Tr,
	useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import Card from '../Card';

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

const BotLink = ({ botLink }) => {
	return (
		<Heading as="h3" size="md" align="center">
			<Box>Your Submission was Approved!</Box>
			<Box bg="green.500" p={4} m={4} color="white">
				<Link href={`//${botLink}`} isExternal>
					Click here to Add your Bot <ExternalLinkIcon mx="2px" />
				</Link>
			</Box>
		</Heading>
	);
};

const RejectReason = ({ submission }) => {
	return (
		<Tr>
			<Th borderBottomColor="red.500">Reason for rejection:</Th>
			<Td borderBottomColor="red.500">{submission?.rejectReason}</Td>
		</Tr>
	);
};

const VerticalTable = ({ submission, refresh }) => {
	const [loading, setLoading] = useState(false);

	const handleReapply = (address) => {
		setLoading(true);
		fetch(`/api/submissions/${address}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(() => {
				refresh();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	return (
		<TableContainer w="full" h="full" overflowY>
			<Table>
				<Tbody>
					<Tr>
						<Th>Status</Th>
						<Td>
							<Pill status={submission?.status?.name} />
						</Td>
					</Tr>
					{submission?.status?.name === 'Rejected' && (
						<RejectReason submission={submission} />
					)}
					<Tr>
						<Th>Your Discord ID</Th>
						<Td>{submission?.discordId}</Td>
					</Tr>
					<Tr>
						<Th>Community Name</Th>
						<Td>{submission?.communityName}</Td>
					</Tr>
					<Tr>
						<Th>Discord Server URL</Th>
						<Td>
							<Link
								href={`//${submission?.discordServerUrl}`}
								isExternal
							>
								{submission?.discordServerUrl}
							</Link>
						</Td>
					</Tr>
					<Tr>
						<Th>Twitter URL</Th>
						<Td>
							<Link
								href={`//${submission?.twitterUrl}`}
								isExternal
							>
								{submission?.twitterUrl}
							</Link>
						</Td>
					</Tr>
					<Tr>
						<Th>Service</Th>
						<Td>{submission?.service}</Td>
					</Tr>
				</Tbody>
				{submission?.status?.name === 'Pending' && (
					<TableCaption>
						<Text color="white" fontSize="lg">
							Please allow us 24 to 48 hours to review.
							<br /> Join https://discord.gg/utilityape if you'd
							like to receive a quicker response.
						</Text>
					</TableCaption>
				)}
				{submission?.status?.name === 'Rejected' && (
					<TableCaption>
						<Button
							bg="purple.600"
							color="purple.100"
							_hover={{ bg: 'purple.500' }}
							isLoading={loading}
							onClick={() => handleReapply(submission.address)}
						>
							Reapply
						</Button>
					</TableCaption>
				)}
			</Table>
		</TableContainer>
	);
};

const SubmissionTable = ({ submission, isLoading, refresh }) => {
	return (
		<Card>
			<Stack spacing={4}>
				{submission?.status?.name !== 'Approved' && (
					<Heading as="h2" size="md" align="center">
						Your Submission
					</Heading>
				)}
				<Flex justify="end">
					<IconButton
						aria-label="Refresh"
						icon={<RepeatIcon />}
						onClick={refresh}
					/>
				</Flex>
				{submission?.botLink && (
					<BotLink
						botLink={
							'https://discord.com/oauth2/authorize?client_id=941695193046978581&redirect_uri=http://dashboard.botsondisplay.com:5000/login&response_type=code&scope=identify%20guilds'
						}
					/>
				)}
				{isLoading ? (
					<Center>
						<Spinner />
					</Center>
				) : (
					<VerticalTable submission={submission} refresh={refresh} />
				)}
			</Stack>
		</Card>
	);
};

export default SubmissionTable;
