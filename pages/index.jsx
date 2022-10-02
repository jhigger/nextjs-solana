import { Container, Flex, Stack, Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import Form from '../components/client/Form';
import Header from '../components/client/Header';
import SubmissionTable from '../components/client/SubmissionTable';
import useSubmission from '../hooks/useSubmission';

export default function Home() {
	const { wallet, publicKey, connected } = useWallet();
	const { submission, isLoading, mutate } = useSubmission(
		publicKey?.toBase58()
	);

	return (
		<>
			<Head>
				<title>Utility Ape</title>
			</Head>
			<Flex as="main" minH="100vh" justify="center">
				<Container maxW="container.lg" py={4}>
					<Stack spacing={4}>
						<Header />
						{wallet && connected ? (
							isLoading || submission ? (
								<SubmissionTable
									submission={submission}
									isLoading={isLoading}
									refresh={mutate}
								/>
							) : (
								<Form publicKey={publicKey} refresh={mutate} />
							)
						) : (
							<Text fontSize="lg" align="center">
								Please connect your wallet first
							</Text>
						)}
					</Stack>
				</Container>
			</Flex>
		</>
	);
}
