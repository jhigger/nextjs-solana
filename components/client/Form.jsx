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

function RadioCard(props) {
	const { getInputProps, getCheckboxProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label">
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
}

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
				title: `Form Submitted`,
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
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));

		reset();
	}

	const options = ['basic', 'premium', 'pixel', '1/1 artist'];

	const { field } = useController({
		name: 'paymentPlan',
		defaultValue: 'basic',
		control,
		rules: { required: 'Payment is required' }
	});

	const { getRootProps, getRadioProps } = useRadioGroup({ ...field });

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
								Discord ID
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

						<FormControl isInvalid={errors.discordUrl} isRequired>
							<FormLabel htmlFor="discordUrl">
								Discord URL
							</FormLabel>
							<Input
								id="discordUrl"
								variant="filled"
								type="text"
								{...register('discordUrl', {
									required: 'This is required'
								})}
							/>
							<FormErrorMessage>
								{errors.discordUrl && errors.discordUrl.message}
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

						<FormControl isInvalid={errors.paymentPlan} isRequired>
							<FormLabel htmlFor="paymentPlan">
								Payment Plan
							</FormLabel>
							<SimpleGrid
								columns={[1, 2]}
								spacing={4}
								{...getRootProps()}
							>
								{options.map((value) => {
									return (
										<RadioCard
											key={value}
											{...getRadioProps({ value })}
											type="radio"
											register={register}
										>
											{value}
										</RadioCard>
									);
								})}
							</SimpleGrid>
							<FormErrorMessage>
								{errors.paymentPlan &&
									errors.paymentPlan.message}
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
