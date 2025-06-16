import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildServer } from "./server";

let server: ReturnType<typeof buildServer> | null = null;

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!server) {
    server = buildServer();
    await server.ready();
  }
  let url = event.path;
  if (event.queryStringParameters) {
    const params = new URLSearchParams();
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
  const response = await server.inject({
    method: event.httpMethod as any,
    url: url,
    headers: event.headers,
    payload: event.body || undefined,
  });

  return {
    statusCode: response.statusCode,
    headers: {
      ...(response.headers as { [key: string]: string }),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://itunes.apple.com;",
    },
    body: response.body,
  };
};
