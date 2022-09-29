import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default (status) => {
	const url = `/api/submissions/status/${status}`;

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
