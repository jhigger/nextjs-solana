import { Container, Flex, SimpleGrid } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ApprovedTable from '../components/admin/ApprovedTable';
import PendingTable from '../components/admin/PendingTable';

const Admin = () => {
	const { status } = useSession();

	const [pending, setPending] = useState([]);
	const [approved, setApproved] = useState([]);

	const [refresh, toggleRefresh] = useState(false);

	const handleRefresh = () => {
		toggleRefresh((prev) => !prev);
	};

	const handleFetchPending = async () => {
		const res = await fetch(
			`${process.env.VERCEL_URL}/api/submissions/status/1`
		);
		const data = await res.json();
		setPending(data);
	};

	const handleFetchApproved = async () => {
		const res = await fetch(
			`${process.env.VERCEL_URL}/api/submissions/status/2`
		);
		const data = await res.json();
		setApproved(data);
	};

	useEffect(() => {
		if (status === 'authenticated') {
			handleFetchPending();
			handleFetchApproved();
		}
	}, [refresh]);

	useEffect(() => {
		if (status === 'unauthenticated') {
			signIn();
		}
	}, [status]);

	if (status === 'authenticated')
		return (
			<>
				<Head>
					<title>Admin Dashboard</title>
				</Head>
				<Flex as="main" minH="100vh" justify="center">
					<Container maxW="container.xl" py={4}>
						<SimpleGrid columns={[1, 1, 1, 2]} spacing={4}>
							<PendingTable
								pending={pending}
								handleRefresh={handleRefresh}
							/>
							<ApprovedTable
								approved={approved}
								handleRefresh={handleRefresh}
							/>
						</SimpleGrid>
					</Container>
				</Flex>
			</>
		);
};

export default Admin;
