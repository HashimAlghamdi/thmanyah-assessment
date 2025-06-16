"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const axios_1 = __importDefault(require("axios"));
async function default_1(fastify) {
    fastify.post("/search", async (req, res) => {
        const { term } = req.body;
        try {
            // Search for podcasts only
            const podcastsResponse = await axios_1.default.get("https://itunes.apple.com/search", {
                params: {
                    term,
                    media: "podcast",
                    attribute: "titleTerm", // More specific search for podcast titles
                },
            });
            const podcasts = podcastsResponse.data.results || [];
            // Save podcasts to database
            const savedPodcasts = await Promise.all(podcasts.map(async (p) => {
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
                }
                catch (err) {
                    fastify.log.error(err);
                    return null;
                }
            }));
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
        }
        catch (error) {
            fastify.log.error(error);
            res.status(500).send({
                error: "فشل في البحث",
                podcasts: [],
            });
        }
    });
}
