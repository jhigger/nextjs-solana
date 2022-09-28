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
import { useState } from 'react';

const LoginPanel = () => {
	const [loading, setLoading] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset
	} = useForm();

	const toast = useToast();
	const router = useRouter();

	const onSubmit = (values) => {
		setLoading(true);
		const { username, password } = values;

		signIn('credentials', {
			username,
			password,
			callbackUrl: `${
				router.query.callbackUrl
					? router.query.callbackUrl
					: window.location.origin
			}`,
			redirect: false
		})
			.then((res) => {
				reset();
				if (!res.ok) {
					return toast({
						title: res.error,
						status: 'error',
						isClosable: true
					});
				}

				router.push(res.url);
				toast({
					title: `Logged In`,
					status: 'success',
					isClosable: true
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
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
							{errors.username && errors.username.message}
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
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>

					<Button
						colorScheme="purple"
						isLoading={loading}
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
