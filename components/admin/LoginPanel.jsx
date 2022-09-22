import {
    Button,
    FormControl,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const LoginPanel = ({handleLogin}) => {
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting},
		reset
	} = useForm();

	const toast = useToast();

	function onSubmit(values) {
		const showToast = () => {
			return toast({
				title: `Logged In`,
				status: 'info',
				isClosable: true
			});
		};

		if (values.user === 'admin' && values.pass === 'admin') {
			showToast();
			reset();
			handleLogin(true);
			return;
		}

		return toast({
			title: `Incorrect Credentials`,
			status: 'error',
			isClosable: true
		});
	}

	return (
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

				<FormControl isInvalid={errors.user} isRequired>
					<Input
						placeholder="Username"
						id="user"
						type="text"
						{...register('user', {
							required: 'This is required'
						})}
					/>
					{/* <FormErrorMessage>
					{errors.user && errors.user}
				</FormErrorMessage> */}
				</FormControl>

				<FormControl isInvalid={errors.pass} isRequired>
					<Input
						placeholder="Password"
						id="pass"
						type="password"
						{...register('pass', {
							required: 'This is required'
						})}
					/>
					{/* <FormErrorMessage>
					{errors.pass && errors.pass}
				</FormErrorMessage> */}
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
	);
};

export default LoginPanel;
