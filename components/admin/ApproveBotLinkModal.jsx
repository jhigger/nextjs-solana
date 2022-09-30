import { CheckIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	MenuItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

const ApproveBotLinkModal = ({ handleApprove, address }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef(null);
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();
	const { ref, ...rest } = register('botLink', {
		required: 'This is required'
	});

	const onSubmit = ({ botLink }) => {
		onClose();
		handleApprove(address, botLink);
	};

	return (
		<>
			<MenuItem icon={<CheckIcon />} onClick={onOpen}>
				Approve
			</MenuItem>
			<Modal
				initialFocusRef={initialRef}
				blockScrollOnMount={true}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				motionPreset="slideInBottom"
				size="xl"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Approve submission</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody pb={6}>
							<FormControl isInvalid={errors.botLink} isRequired>
								<FormLabel htmlFor="botLink">
									Bot Link
								</FormLabel>
								<Input
									id="botLink"
									variant="filled"
									type="text"
									{...rest}
									placeholder="Enter link"
									ref={(e) => {
										ref(e);
										initialRef.current = e; // you can still assign to ref
									}}
								/>
								<FormErrorMessage>
									{errors.botLink && errors.botLink.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} type="submit">
								Continue
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ApproveBotLinkModal;
