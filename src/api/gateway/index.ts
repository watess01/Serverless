import type { APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDb, getBySupplier } from "../../data/dynamodb";

interface ApiError extends Error {
  statusCode: number;
}

export async function handler(
  gateway: string,
  { awsRequestId }: Context
): Promise<APIGatewayProxyResult> {
  try {
    console.log("Process Gateway");

    const ret = await getBySupplier(gateway);
    console.log(ret);
    return {
      message: `Hello World from gateway ${JSON.stringify(ret)}`,
    };
  } catch (error: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
}
