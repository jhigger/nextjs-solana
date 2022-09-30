import { Box, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, ...rest }) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderWidth="1px"
			borderRadius="lg"
			shadow="lg"
			p={8}
			{...rest}
		>
			{children}
		</Box>
	);
};

export default Card;
