import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default () => {
	const url = `/api/raids`;

	const { data, isValidating, error, mutate } = useSWR(url, fetcher, {
		refreshInterval: 5 * 60 * 1000, // 5 minute interval
		revalidateOnFocus: true
	});

	return {
		data,
		isLoading: isValidating,
		isError: error,
		mutate
	};
};