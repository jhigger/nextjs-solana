import { Button, Container, Heading, Stack, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSignature from '../../hooks/useSignature';
import Card from '../Card';

const LoginPanel = () => {
	const [loading, setLoading] = useState(false);
	const { publicKey } = useWallet();
	const { handleSubmit } = useForm();
	const { status } = useSession();
	const { sign } = useSignature();

	const toast = useToast();
	const router = useRouter();

	const onSubmit = async () => {
		setLoading(true);
		const address = publicKey?.toBase58();
		const { statusCode } = await sign();

		if (statusCode === 200) {
			signIn('credentials', {
				address,
				callbackUrl: `${
					router.query.callbackUrl
						? router.query.callbackUrl
						: window.location.origin
				}`,
				redirect: false
			})
				.then((res) => {
					if (!res.ok) {
						return toast({
							title: res.error,
							status: 'error',
							isClosable: true
						});
					}

					router.push(res.url);
					toast({
						title: `Logged In`,
						status: 'success',
						isClosable: true
					});
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
			return toast({
				title: `Error verifying wallet, please try again`,
				status: 'error',
				isClosable: true
			});
		}
	};

	if (status === 'authenticated') {
		return null;
	}

	return (
		<Card>
			<Container maxW="max">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<Heading as="h1" align="center">
							Admin
						</Heading>
						<WalletMultiButton />
						<Button
							colorScheme="purple"
							isLoading={loading}
							type="submit"
							hidden={!publicKey}
						>
							Login
						</Button>
					</Stack>
				</form>
			</Container>
		</Card>
	);
};

export default LoginPanel;
