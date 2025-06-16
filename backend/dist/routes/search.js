"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const axios_1 = __importDefault(require("axios"));
const rssParser_1 = require("../services/rssParser");
const feedParsingJob_1 = require("../services/feedParsingJob");
async function default_1(fastify) {
    const rssParser = new rssParser_1.RSSParserService(fastify.prisma);
    const feedParsingJob = new feedParsingJob_1.FeedParsingJobService(fastify.prisma);
    fastify.post("/search", async (req, res) => {
        const { term } = req.body;
        try {
            // Search for podcasts using iTunes API
            const podcastsResponse = await axios_1.default.get("https://itunes.apple.com/search", {
                params: {
                    term,
                    media: "podcast",
                    attribute: "titleTerm",
                    limit: 20,
                },
            });
            const podcasts = podcastsResponse.data.results || [];
            // Save podcasts to database and trigger RSS parsing for new ones
            const savedPodcasts = await Promise.all(podcasts.map(async (p) => {
                try {
                    const savedPodcast = await fastify.prisma.podcast.upsert({
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
                    // Trigger RSS parsing for new podcasts (non-blocking)
                    if (savedPodcast && p.feedUrl && !savedPodcast.lastParsed) {
                        feedParsingJob.parseSpecificPodcast(savedPodcast.id).catch(err => {
                            console.error(`Background parsing failed for ${savedPodcast.name}:`, err);
                        });
                    }
                    return savedPodcast;
                }
                catch (err) {
                    fastify.log.error(err);
                    return null;
                }
            }));
            // Search episodes from our own database using RSS-parsed data
            const episodes = await rssParser.searchEpisodes(term, 30);
            // Return structured response with both podcasts and episodes
            res.send({
                podcasts: savedPodcasts.filter(Boolean),
                episodes: episodes,
                searchTerm: term,
            });
        }
        catch (error) {
            fastify.log.error(error);
            res.status(500).send({
                error: "Search failed",
                podcasts: [],
                episodes: [],
                searchTerm: term
            });
        }
    });
    // Add endpoint to manually trigger RSS parsing
    fastify.post("/parse-feeds", async (req, res) => {
        try {
            if (feedParsingJob.isJobRunning()) {
                return res.status(429).send({
                    error: "Feed parsing job is already running",
                    isRunning: true
                });
            }
            // Start parsing in background
            feedParsingJob.parseNewPodcastFeeds().catch(err => {
                console.error('Manual feed parsing failed:', err);
            });
            res.send({
                message: "Feed parsing started",
                isRunning: true
            });
        }
        catch (error) {
            fastify.log.error(error);
            res.status(500).send({ error: "Failed to start feed parsing" });
        }
    });
    // Add endpoint to check parsing status
    fastify.get("/parse-status", async (req, res) => {
        const totalPodcasts = await fastify.prisma.podcast.count();
        const parsedPodcasts = await fastify.prisma.podcast.count({
            where: { lastParsed: { not: null } }
        });
        const totalEpisodes = await fastify.prisma.episode.count();
        res.send({
            isRunning: feedParsingJob.isJobRunning(),
            totalPodcasts,
            parsedPodcasts,
            totalEpisodes,
            unparsedPodcasts: totalPodcasts - parsedPodcasts
        });
    });
}
