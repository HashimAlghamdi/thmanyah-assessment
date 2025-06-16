import { buildServer } from "./server";

const start = async () => {
  const server = buildServer();
  
  // Use PORT environment variable or default to 3001
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || "0.0.0.0";
  
  try {
    await server.listen({ port, host });
    console.log(`🚀 Server listening on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
