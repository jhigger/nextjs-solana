import {Container, Flex, Stack} from '@chakra-ui/react';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import LoginPanel from '../components/admin/LoginPanel';
import SubmissionsTable from '../components/admin/SubmissionsTable';

const admin = () => {
	const [submissions, setSubmissions] = useState([]);
	const [refresh, toggleRefresh] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = (value) => {
		setLoggedIn(value);
	};

	const handleRefresh = () => {
		toggleRefresh((prev) => !prev);
	};

	const handleFetch = async () => {
		const res = await fetch(
			`http://localhost:3000/api/submissions/pending`
		);
		const data = await res.json();
		setSubmissions(data);
	};

	useEffect(() => {
		handleFetch();
	}, [refresh]);

	return (
		<>
			<Head>
				<title>Admin Dashboard</title>
			</Head>
			<Flex as="main" minH="100vh" justify="center">
				{loggedIn ? (
					<Container maxW="container.lg" py={4}>
						<Stack spacing={4}>
							<SubmissionsTable
								submissions={submissions}
								handleRefresh={handleRefresh}
							/>
						</Stack>
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
