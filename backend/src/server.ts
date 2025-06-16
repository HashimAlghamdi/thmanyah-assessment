import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import searchRoutes from "./routes/search";

export const buildServer = () => {
  const fastify = Fastify({ 
    logger: true,
    trustProxy: true // Required for rate limiting behind proxy/Lambda
  });

  // Register rate limiting
  fastify.register(import('@fastify/rate-limit'), {
    max: 100, // Maximum 100 requests
    timeWindow: '1 minute', // Per minute
    errorResponseBuilder: function (request, context) {
      return {
        code: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded, retry in ${Math.round(context.ttl / 1000)} seconds.`,
        date: Date.now(),
        expiresIn: Math.round(context.ttl / 1000)
      }
    }
  });

  fastify.register(prismaPlugin);
  fastify.register(searchRoutes);

  return fastify;
};
