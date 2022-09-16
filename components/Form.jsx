import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';

const Form = ({publicKey, handleRefresh}) => {
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
				title: `Form Submitted`,
				status: 'success',
				isClosable: true
			});
		};

		fetch('http://localhost:3000/api/submit', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {'Content-type': 'application/json; charset=UTF-8'}
		})
			.then(() => {
				showToast();
				handleRefresh();
			})
			.catch((err) => console.log(err));

		reset();
	}

	return (
		<Flex
			p={8}
			shadow="md"
			bg={useColorModeValue('gray.50', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			justify="center"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl isReadOnly>
						<FormLabel htmlFor="address">Address</FormLabel>
						<Input
							id="address"
							variant="filled"
							type="text"
							{...register('address')}
							value={publicKey?.toBase58()}
						/>
					</FormControl>

					<FormControl isInvalid={errors.email} isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							id="email"
							variant="filled"
							type="email"
							{...register('email', {
								required: 'This is required'
							})}
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.discord} isRequired>
						<FormLabel htmlFor="discord">Discord Link</FormLabel>
						<Input
							id="discord"
							variant="filled"
							type="text"
							{...register('discord', {
								required: 'This is required'
							})}
						/>
						<FormErrorMessage>
							{errors.discord && errors.discord.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.project} isRequired>
						<FormLabel htmlFor="project">Project Name</FormLabel>
						<Input
							id="project"
							variant="filled"
							type="text"
							{...register('project', {
								required: 'This is required'
							})}
						/>
						<FormErrorMessage>
							{errors.project && errors.project.message}
						</FormErrorMessage>
					</FormControl>
					<Button
						mt={4}
						bg="purple.600"
						color="purple.100"
						isLoading={isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</Stack>
			</form>
		</Flex>
	);
};

export default Form;
