exports.lambdaHandler = async (event) => {
  // (optional) fetch method and querystring
  const method = "A METHOD"; //event.requestContext.http.method;
  const queryParam = event.queryStringParameters.myCustomParameter;
  console.log(`Received ${method} request with ${queryParam}`)

  // retrieve signature and payload
  const webhookSignature = event.headers.SignatureHeader;
  const webhookPayload = JSON.parse(event.body);

  try {
    //validateSignature(webhookSignature); // throws if invalid signature
    handleEvent(webhookPayload); // throws if processing error
  } catch (error) {
    console.error(error)
    return {
      statusCode: 400,
      body: `Cannot process event: ${error}`,
    }
  }

  return {
    statusCode: 200, // default value
    body: JSON.stringify({
      received: true,
    }),
  };
};

const handleEvent = async (webhookPayload) => {
  console.log(JSON.stringify(webhookPayload));
}