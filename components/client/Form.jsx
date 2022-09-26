import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	SimpleGrid,
	Stack,
	useColorModeValue,
	useRadio,
	useRadioGroup,
	useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';

const RadioCard = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label" isdisabled={props.isdisabled}>
			<Input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					bg: 'purple.400',
					color: 'white',
					borderColor: 'purple.400'
				}}
				_focus={{
					boxShadow: 'outline'
				}}
				px={5}
				py={3}
			>
				{props.children}
			</Box>
		</Box>
	);
};

const Services = ({ name, control, register }) => {
	const options = [
		{
			name: 'Engagement Bot',
			disabled: false
		},
		{
			name: 'Security Bot',
			disabled: true
		},
		{
			name: 'NFT Tools',
			disabled: true
		}
	];

	const { field } = useController({
		name,
		defaultValue: options[0].name,
		control,
		rules: { required: 'Services is required' }
	});

	const { getRootProps, getRadioProps } = useRadioGroup({ ...field });

	return (
		<>
			<FormLabel htmlFor={name}>Services</FormLabel>
			<SimpleGrid
				columns={[1, options.length]}
				spacing={4}
				{...getRootProps()}
			>
				{options.map(({ name, disabled }) => {
					return (
						<RadioCard
							key={name}
							{...getRadioProps({ value: name })}
							type="radio"
							register={register}
							isdisabled={disabled ? 'true' : undefined}
						>
							{name}
							{disabled && <Box>(coming soon)</Box>}
						</RadioCard>
					);
				})}
			</SimpleGrid>
		</>
	);
};

const Form = ({ publicKey, refresh }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		control
	} = useForm();

	const toast = useToast();
	const [loading, setLoading] = useState(false);

	function onSubmit(values) {
		setLoading(true);
		const showToast = () => {
			return toast({
				title: `Ape Application has been submitted!`,
				status: 'success',
				isClosable: true
			});
		};

		fetch(`/api/submit`, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(() => {
				showToast();
				refresh();
				reset();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
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
			<Container maxW="container.sm">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<Input
							id="address"
							variant="filled"
							type="text"
							{...register('address')}
							value={publicKey?.toBase58()}
							hidden
						/>

						<FormControl isInvalid={errors.discordId} isRequired>
							<FormLabel htmlFor="discordId">
								Your Discord ID
							</FormLabel>
							<Input
								id="discordId"
								variant="filled"
								type="text"
								{...register('discordId', {
									required: 'This is required',
									pattern: {
										value: /^.{3,32}#[0-9]{4}$/,
										message:
											'Your Discord ID should look like Username#1234. You will be contacted through this account to be verified.'
									}
								})}
							/>
							<FormErrorMessage>
								{errors.discordId && errors.discordId.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={errors.communityName}
							isRequired
						>
							<FormLabel htmlFor="communityName">
								Community Name
							</FormLabel>
							<Input
								id="communityName"
								variant="filled"
								type="text"
								{...register('communityName', {
									required: 'This is required'
								})}
							/>
							<FormErrorMessage>
								{errors.communityName &&
									errors.communityName.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={errors.discordServerUrl}
							isRequired
						>
							<FormLabel htmlFor="discordServerUrl">
								Discord Server URL
							</FormLabel>
							<Input
								id="discordServerUrl"
								variant="filled"
								type="text"
								{...register('discordServerUrl', {
									required: 'This is required'
								})}
							/>
							<FormErrorMessage>
								{errors.discordServerUrl &&
									errors.discordServerUrl.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.twitterUrl} isRequired>
							<FormLabel htmlFor="twitterUrl">
								Twitter URL
							</FormLabel>
							<Input
								id="twitterUrl"
								variant="filled"
								type="text"
								{...register('twitterUrl', {
									required: 'This is required'
								})}
							/>
							<FormErrorMessage>
								{errors.twitterUrl && errors.twitterUrl.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl isInvalid={errors.service} isRequired>
							<Services
								name={'service'}
								control={control}
								register={register}
							/>
							<FormErrorMessage>
								{errors.service && errors.service.message}
							</FormErrorMessage>
						</FormControl>

						<Button
							bg="purple.600"
							color="purple.100"
							_hover={{ bg: 'purple.500' }}
							isLoading={loading}
							type="submit"
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Container>
		</Flex>
	);
};

export default Form;
