import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import LoginPanel from '../../components/admin/LoginPanel';

const Login = () => {
	return (
		<>
			<Head>
				<title>Admin Login</title>
			</Head>
			<Flex as="main" minH="100vh" justify="center" align="center">
				<LoginPanel />
			</Flex>
		</>
	);
};

export default Login;
