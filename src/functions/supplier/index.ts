import type { APIGatewayProxyResult, Context } from "aws-lambda";

interface ApiError extends Error {
  statusCode: number;
}

export async function handler(
  supplier: string,
  { awsRequestId }: Context
): Promise<APIGatewayProxyResult> {
  try {
    console.log("Process Supplier");

    return {
      message: `Hello World from Supplier ${supplier}`,
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
