import { FastifyInstance } from "fastify";
import axios from "axios";

export default async function (fastify: FastifyInstance) {
  fastify.post("/search", async (req, res) => {
    const { term } = req.body as { term: string };

    const result = await axios.get("https://itunes.apple.com/search", {
      params: {
        term,
        media: "podcast",
      },
    });

    const podcasts = result.data.results;

    const saved = await Promise.all(
      podcasts.map(async (p: any) => {
        try {
          return await fastify.prisma.podcast.upsert({
            where: { itunesId: p.trackId },
            update: {},
            create: {
              itunesId: p.trackId,
              name: p.collectionName,
              artistName: p.artistName,
              artworkUrl600: p.artworkUrl600,
              feedUrl: p.feedUrl,
            },
          });
        } catch (err) {
          fastify.log.error(err);
          return null;
        }
      })
    );

    res.send(saved.filter(Boolean));
  });
}
