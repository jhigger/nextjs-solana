import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default (address) => {
	const url = address ? `/api/submissions/${address}` : null;

	const { data, isValidating, error, mutate } = useSWR(url, fetcher, {
		refreshInterval: 5 * 60 * 1000, // 5 minute interval
		revalidateOnFocus: false
	});

	return {
		submission: data,
		isLoading: isValidating,
		isError: error,
		mutate
	};
};
