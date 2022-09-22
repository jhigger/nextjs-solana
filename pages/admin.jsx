import { Container, Flex, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ApprovedTable from '../components/admin/ApprovedTable';
import LoginPanel from '../components/admin/LoginPanel';
import PendingTable from '../components/admin/PendingTable';

const admin = () => {
	const [pending, setPending] = useState([]);
	const [approved, setApproved] = useState([]);

	const [refresh, toggleRefresh] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = (value) => {
		setLoggedIn(value);
	};

	const handleRefresh = () => {
		toggleRefresh((prev) => !prev);
	};

	const handleFetchPending = async () => {
		const res = await fetch(
			`http://localhost:3000/api/submissions/status/1`
		);
		const data = await res.json();
		setPending(data);
	};

	const handleFetchApproved = async () => {
		const res = await fetch(
			`http://localhost:3000/api/submissions/status/2`
		);
		const data = await res.json();
		setApproved(data);
	};

	useEffect(() => {
		handleFetchPending();
		handleFetchApproved();
	}, [refresh]);

	return (
		<>
			<Head>
				<title>Admin Dashboard</title>
			</Head>
			<Flex as="main" minH="100vh" justify="center">
				{loggedIn ? (
					<Container maxW="container.xl" py={4}>
						<SimpleGrid columns={[1, 2]} spacing={4}>
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
				) : (
					<Container maxW="xs" py={4}>
						<LoginPanel handleLogin={handleLogin} />
					</Container>
				)}
			</Flex>
		</>
	);
};

export default admin;
