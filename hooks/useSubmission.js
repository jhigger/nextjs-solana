import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default (address) => {
	const url = address ? `/api/submissions/${address}` : null;
	const { data, isValidating, error, mutate } = useSWR(url, fetcher);

	return {
		submission: data,
		isLoading: isValidating,
		isError: error,
		mutate
	};
};
