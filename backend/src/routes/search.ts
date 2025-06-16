import { FastifyInstance } from "fastify";
import axios from "axios";

export default async function (fastify: FastifyInstance) {
  const searchSchema = {
    body: {
      type: 'object',
      required: ['term'],
      properties: {
        term: { 
          type: 'string', 
          minLength: 1, 
          maxLength: 100,
          pattern: '^[a-zA-Z0-9\\s\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF-_.]+$'
        }
      },
      additionalProperties: false
    }
  };

  fastify.post("/search", { schema: searchSchema }, async (req, res) => {
    const { term } = req.body as { term: string };
    const sanitizedTerm = term.trim().substring(0, 100);

    try {
      const podcastsResponse = await axios.get(
        "https://itunes.apple.com/search",
        {
          params: {
            term: sanitizedTerm,
            media: "podcast",
            attribute: "titleTerm",
          },
        }
      );

      const podcasts = podcastsResponse.data.results || [];
      const savedPodcasts = await Promise.all(
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
      const cleanPodcasts = savedPodcasts
        .filter(Boolean)
        .map((podcast) => ({
          id: podcast.id,
          title: podcast.name,
          artistName: podcast.artistName,
          image: podcast.artworkUrl600,
        }));
      res.send({
        podcasts: cleanPodcasts,
      });
    } catch (error) {
      fastify.log.error(error);
      res.status(500).send({
        error: "فشل في البحث",
        podcasts: [],
      });
    }
  });
}
