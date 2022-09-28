import { Container, Flex } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import ApprovedTable from '../components/admin/ApprovedTable';
import PendingTable from '../components/admin/PendingTable';
import Sidebar from '../components/admin/Sidebar';
import useApproved from '../hooks/useApproved';
import usePending from '../hooks/usePending';

const Admin = () => {
	const { status } = useSession();
	const {
		pending,
		loading: loadingPending,
		mutate: refreshPending
	} = usePending();
	const {
		approved,
		loading: loadingApproved,
		mutate: refreshApproved
	} = useApproved();

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
				<Sidebar
					tabs={[
						<PendingTable
							pending={pending}
							isLoading={loadingPending}
							handleRefresh={handleRefresh}
						/>,
						<ApprovedTable
							approved={approved}
							isLoading={loadingApproved}
							handleRefresh={handleRefresh}
						/>,
						<></>
					]}
				/>
			</>
		);
};

export default Admin;
