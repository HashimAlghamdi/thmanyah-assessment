import { FastifyInstance } from "fastify";
import axios from "axios";

export default async function (fastify: FastifyInstance) {
  fastify.post("/search", async (req, res) => {
    const { term } = req.body as { term: string };

    try {
      // Search for podcasts only
      const podcastsResponse = await axios.get(
        "https://itunes.apple.com/search",
        {
          params: {
            term,
            media: "podcast",
            attribute: "titleTerm", // More specific search for podcast titles
          },
        }
      );

      const podcasts = podcastsResponse.data.results || [];

      // Save podcasts to database
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

      // Transform to clean API response with only necessary fields
      const cleanPodcasts = savedPodcasts
        .filter(Boolean)
        .map((podcast) => ({
          id: podcast.id,
          title: podcast.name,
          artistName: podcast.artistName,
          image: podcast.artworkUrl600,
        }));

      // Return only what frontend needs
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
