import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import AdminTable from '../components/admin/AdminTable';
import ApprovedTable from '../components/admin/ApprovedTable';
import PendingTable from '../components/admin/PendingTable';
import RejectedTable from '../components/admin/RejectedTable';
import Sidebar from '../components/admin/Sidebar';
import useAdmin from '../hooks/useAdmin';

const Admin = () => {
	const { status } = useSession();
	const { publicKey } = useWallet();
	const { admins: admin } = useAdmin(publicKey?.toBase58());

	useEffect(() => {
		if (status === 'unauthenticated') {
			signIn();
		} else if (admin === null) {
			signOut({ redirect: false });
		}
	}, [status, admin]);

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
