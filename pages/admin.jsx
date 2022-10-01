import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import AdminTable from '../components/admin/AdminTable';
import ApprovedTable from '../components/admin/ApprovedTable';
import PendingTable from '../components/admin/PendingTable';
import RejectedTable from '../components/admin/RejectedTable';
import Sidebar from '../components/admin/Sidebar';

const Admin = () => {
	const { status } = useSession();

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
						<PendingTable />,
						<ApprovedTable />,
						<RejectedTable />,
						<AdminTable />
					]}
				/>
			</>
		);
};

export default Admin;
