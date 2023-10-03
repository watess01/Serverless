import type { APIGatewayProxyResult, Context } from "aws-lambda";

interface ApiError extends Error {
  statusCode: number;
}

export async function handler(
  gateway: string,
  { awsRequestId }: Context
): Promise<APIGatewayProxyResult> {
  try {
    console.log("Process Supplier");

    return {
      message: `Hello World from gateway ${gateway}`,
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
