import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
};

const colors = {
	gray: {
		50: '#F0F2F4',
		100: '#D6DAE1',
		200: '#BCC3CD',
		300: '#A1ABBA',
		400: '#8793A6',
		500: '#6C7C93',
		600: '#576375',
		700: '#414A58',
		800: '#2B323B',
		900: '#16191D'
	}
};

const styles = {
	global: (props) => ({
		body: {
			bg: mode('gray.50', 'gray.900')(props)
		}
	})
};

const theme = extendTheme({
	config,
	colors,
	styles
});

export default theme;
