import {Container, Flex, Stack, SimpleGrid} from '@chakra-ui/react';
import {useWallet} from '@solana/wallet-adapter-react';
import Head from 'next/head';
import Form from '../components/Form';
import Header from '../components/Header';
import SubmissionsTable from '../components/SubmissionsTable';
import {useState} from 'react';

export default function Home() {
	const {publicKey} = useWallet();
	const [refresh, toggleRefresh] = useState(false);

	const handleRefresh = () => {
		toggleRefresh((prev) => !prev);
	};

	return (
		<>
			<Head>
				<title>Nextjs + Solana</title>
			</Head>
			<Flex as="main" minH="100vh" align="center" justify="center">
				<Container maxW="container.lg" py={4}>
					<Stack spacing={4}>
						<Header />
						{publicKey !== null && (
							<SimpleGrid columns={[1, null, 2]} spacing={4}>
								<Form
									publicKey={publicKey}
									handleRefresh={handleRefresh}
								/>
								<SubmissionsTable
									publicKey={publicKey}
									refresh={refresh}
								/>
							</SimpleGrid>
						)}
					</Stack>
				</Container>
			</Flex>
		</>
	);
}
