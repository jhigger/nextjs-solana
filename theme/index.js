import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
};

const theme = extendTheme({
	config,
	styles: {
		global: (props) => ({
			body: {
				bg: mode('gray.100')(props)
			}
		})
	}
});

export default theme;
