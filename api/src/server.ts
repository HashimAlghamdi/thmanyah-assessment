import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import searchRoutes from "./routes/search";

export const buildServer = () => {
  const fastify = Fastify({ logger: true });

  fastify.register(prismaPlugin);
  fastify.register(searchRoutes);

  return fastify;
};
