import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildServer } from "./server";

let server: ReturnType<typeof buildServer> | null = null;

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Initialize server once and reuse it (Lambda container reuse)
  if (!server) {
    server = buildServer();
    await server.ready();
  }

  // Build the URL with query parameters
  let url = event.path;
  if (event.queryStringParameters) {
    const params = new URLSearchParams();
    // Convert API Gateway query params to URLSearchParams format
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    const queryString = params.toString();
    if (queryString) {
      url += "?" + queryString;
    }
  }

  // Inject the request into Fastify server
  const response = await server.inject({
    method: event.httpMethod as any,
    url: url,
    headers: event.headers,
    payload: event.body || undefined, // Convert null to undefined
  });

  // Return API Gateway compatible response with CORS headers
  return {
    statusCode: response.statusCode,
    headers: {
      ...response.headers as { [key: string]: string },
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: response.body,
  };
};
