import { Container, Flex } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import ApprovedTable from '../components/admin/ApprovedTable';
import PendingTable from '../components/admin/PendingTable';
import useApproved from '../hooks/useApproved';
import usePending from '../hooks/usePending';

const Admin = () => {
	const { status } = useSession();
	const { pending, mutate: refreshPending } = usePending();
	const { approved, mutate: refreshApproved } = useApproved();

	const handleRefresh = () => {
		refreshPending();
		refreshApproved();
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			signIn();
		}
	}, [status]);

	if (status === 'authenticated')
		return (
			<>
				<Head>
					<meta name="robots" content="noindex,nofollow" />
					<title>Admin Dashboard</title>
				</Head>
				<Flex as="main" minH="100vh" justify="center">
					<Container maxW="container.xl" py={4}>
						{pending && (
							<PendingTable
								pending={pending}
								handleRefresh={handleRefresh}
							/>
						)}
						{approved && (
							<ApprovedTable
								approved={approved}
								handleRefresh={handleRefresh}
							/>
						)}
					</Container>
				</Flex>
			</>
		);
};

export default Admin;
