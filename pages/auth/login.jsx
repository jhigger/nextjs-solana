import { Flex } from '@chakra-ui/react';
import LoginPanel from '../../components/admin/LoginPanel';

const Login = () => {
	return (
		<Flex as="main" minH="100vh" justify="center" align="center">
			<LoginPanel />
		</Flex>
	);
};

export default Login;
