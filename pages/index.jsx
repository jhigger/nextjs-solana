import { Container, Flex, Stack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Form from '../components/client/Form';
import Header from '../components/client/Header';
import SubmissionTable from '../components/client/SubmissionTable';

export default function Home() {
	const { publicKey } = useWallet();
	const [address, setAddress] = useState('');
	const [submission, setSubmission] = useState(null);
	const [refresh, toggleRefresh] = useState(false);

	const handleRefresh = () => {
		toggleRefresh((prev) => !prev);
	};

	const handleFetch = async () => {
		if (!publicKey) return;
		const res = await fetch(`/api/submissions/${address}`);
		const data = await res.json();
		if (!data) return setSubmission(null);
		setSubmission(data);
	};

	useEffect(() => {
		setAddress(publicKey?.toBase58());
	}, [publicKey]);

	useEffect(() => {
		handleFetch();
	}, [address, refresh]);

	return (
		<>
			<Head>
				<title>Client Portal</title>
			</Head>
			<Flex as="main" minH="100vh" justify="center">
				<Container maxW="container.lg" py={4}>
					<Stack spacing={4}>
						<Header />
						{publicKey !== null && (
							<>
								{submission ? (
									<SubmissionTable
										submission={submission}
										handleRefresh={handleRefresh}
									/>
								) : (
									<Form
										publicKey={publicKey}
										handleRefresh={handleRefresh}
									/>
								)}
							</>
						)}
					</Stack>
				</Container>
			</Flex>
		</>
	);
}
