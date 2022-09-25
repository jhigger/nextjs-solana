import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default (address) => {
	const url = address ? `/api/submissions/${address}` : null;

	const { data, isValidating, error, mutate } = useSWR(url, fetcher, {
		// 5 minute interval
		refreshInterval: 5 * 60 * 1000
	});

	return {
		submission: data,
		isLoading: isValidating,
		isError: error,
		mutate
	};
};
