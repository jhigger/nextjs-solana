import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

export default (address) => {
	const [statusCode, setStatusCode] = useState(200);
	const [error, setError] = useState(null);

	const { signMessage } = useWallet();

	const sign = async () => {
		try {
			// Encode anything as bytes
			const message = 'Sign this message to authenticate.';
			const encodedMessage = new TextEncoder().encode(message);

			// Sign the bytes using the wallet
			const signedMessage = await signMessage(encodedMessage, 'utf8');
			const publicKeyStr = address;

			const data = {
				publicKeyStr,
				encodedSignedMessage: bs58.encode(signedMessage),
				message
			};

			const res = await fetch('/api/sign', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			});

			setStatusCode(res?.status);
		} catch (error) {
			setError(error);
		}

		return {
			statusCode,
			error
		};
	};

	return {
		sign
	};
};
