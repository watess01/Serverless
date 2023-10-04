import type { APIGatewayProxyResult, Context } from "aws-lambda";
import { processSupplier } from "../../functions/process-supplier";

interface ApiError extends Error {
  statusCode: number;
}

/** this is the API handler for Supplier
 It is the API that is exposed to the outside world.
 Its only job is to handle the interaction with the outside world and business logic
 Note it is a wrapper around the function processSupplier
**/
export async function handler(
  event: any,
  { awsRequestId }: Context
): Promise<APIGatewayProxyResult> {
  try {
    return await processSupplier(event);
  } catch (error: unknown) {
    // handle exceptions withouth exposing internal details
    console.error(`Process Supplier..error:${JSON.stringify(error)}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing supplier",
      }),
    };
  }
}
