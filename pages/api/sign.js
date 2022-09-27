import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import { sign } from 'tweetnacl';

export default async (req, res) => {
	try {
		if (req.method === 'POST') {
			// Process a POST request
			const { publicKeyStr, encodedSignedMessage, message } = req.body;
			const encodedMessage = new TextEncoder().encode(message);
			const publicKey = new PublicKey(publicKeyStr);
			const signature = bs58.decode(encodedSignedMessage);

			// Verify that the bytes were signed using the private key that matches the known public key
			if (
				!sign.detached.verify(
					encodedMessage,
					signature,
					publicKey.toBytes()
				)
			) {
				res.status(401).json({ message: 'Invalid signature!' });
			}

			res.status(200).json({ message: 'Wallet verified' });
		} else {
			// Handle any other HTTP method
			res.status(200).json({ name: 'Hello, world!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
