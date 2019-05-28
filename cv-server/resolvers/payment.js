import braintree from 'braintree';

const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.PAYMENT_MERCHANT_ID,
	publicKey: process.env.PAYMENT_PUBLIC_KEY,
	privateKey: process.env.PAYMENT_PRIVATE_KEY
});

export function getClientPaymentToken() {
	return new Promise((resolve, reject) => {
		gateway.clientToken.generate({}, (error, response) => {
			if (error) {
				return reject(error);
			}
			resolve(response.clientToken);
		});
	});
};
