import { CloseIcon } from '@chakra-ui/icons';
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

const RejectReasonModal = ({ handleReject, address }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef(null);
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm();
	const { ref, ...rest } = register('rejectReason', {
		required: 'This is required'
	});

	const onSubmit = ({ rejectReason }) => {
		onClose();
		handleReject(address, rejectReason);
	};

	return (
		<>
			<MenuItem icon={<CloseIcon />} onClick={onOpen}>
				Reject
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
					<ModalHeader>Reject submission</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody pb={6}>
							<FormControl
								isInvalid={errors.rejectReason}
								isRequired
							>
								<FormLabel htmlFor="rejectReason">
									Reason
								</FormLabel>
								<Input
									id="rejectReason"
									variant="filled"
									type="text"
									{...rest}
									placeholder="Message"
									ref={(e) => {
										ref(e);
										initialRef.current = e; // you can still assign to ref
									}}
								/>
								<FormErrorMessage>
									{errors.rejectReason &&
										errors.rejectReason.message}
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

export default RejectReasonModal;
