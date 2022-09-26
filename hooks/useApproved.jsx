import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export default () => {
	const url = `/api/submissions/status/2`;

	const { data, isValidating, error, mutate } = useSWR(url, fetcher, {
		refreshInterval: 5 * 60 * 1000, // 5 minute interval
		revalidateOnFocus: true
	});

	return {
		approved: data,
		isLoading: !data,
		isError: error,
		mutate
	};
};
