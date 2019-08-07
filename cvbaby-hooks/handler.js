// import braintree from 'braintree';

// const braintreeEnv = process.env.CVBABY_ENV === 'prod' ? 'Production' : 'Sandbox';
// const gateway = braintree.connect({
//   environment: braintree.Environment[braintreeEnv],
//   merchantId: process.env.PAYMENT_MERCHANT_ID,
//   publicKey: process.env.PAYMENT_PUBLIC_KEY,
//   privateKey: process.env.PAYMENT_PRIVATE_KEY
// });

export const handlerBraintree = function(event, context, callback) {
  console.log('event.body:', event.body);
  console.log('typeof event.body:', typeof event.body);
  return callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*', // TODO: Change this
      'Access-Control-Allow-Credentials': true
    },
    statusCode: 200,
    body: 'Hello, Braintree'
  });
};
