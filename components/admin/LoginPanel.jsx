import {
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

const LoginPanel = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset
	} = useForm();

	const toast = useToast();
	const router = useRouter();

	const onSubmit = (values) => {
		const { username, password } = values;

		signIn('credentials', {
			username,
			password,
			callbackUrl: `${
				router.query.callbackUrl
					? router.query.callbackUrl
					: window.location.origin
			}`
		})
			.then((res) => {
				return toast({
					title: `Logged In`,
					status: 'success',
					isClosable: true
				});
				reset();
			})
			.catch((error) => {
				return toast({
					title: `Incorrect Credentials`,
					status: `Error: ${error}`,
					isClosable: true
				});
			});
	};

	return (
		<Container maxW="xs">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack
					p={8}
					shadow="md"
					bg={useColorModeValue('gray.50', 'gray.900')}
					borderWidth="1px"
					borderRadius="lg"
					spacing={4}
				>
					<Heading as="h1" align="center">
						Login
					</Heading>

					<FormControl isInvalid={errors.username} isRequired>
						<Input
							placeholder="Username"
							id="username"
							type="text"
							{...register('username', {
								required: 'This is required'
							})}
						/>
						<FormErrorMessage>
							{errors.username && errors.username}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.password} isRequired>
						<Input
							placeholder="Password"
							id="password"
							type="password"
							{...register('password', {
								required: 'This is required'
							})}
						/>
						<FormErrorMessage>
							{errors.password && errors.password}
						</FormErrorMessage>
					</FormControl>
					<Button
						colorScheme="purple"
						isLoading={isSubmitting}
						type="submit"
					>
						Login
					</Button>
				</Stack>
			</form>
		</Container>
	);
};

export default LoginPanel;
