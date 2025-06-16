"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedParsingJobService = void 0;
const rssParser_1 = require("./rssParser");
class FeedParsingJobService {
    constructor(prisma) {
        this.isRunning = false;
        this.prisma = prisma;
        this.rssParser = new rssParser_1.RSSParserService(prisma);
    }
    async parseNewPodcastFeeds() {
        if (this.isRunning) {
            console.log('Feed parsing job already running, skipping...');
            return;
        }
        this.isRunning = true;
        console.log('Starting feed parsing job for new podcasts...');
        try {
            // Get podcasts that have never been parsed
            const unparsedPodcasts = await this.prisma.podcast.findMany({
                where: {
                    feedUrl: { not: null },
                    lastParsed: null
                }
            });
            console.log(`Found ${unparsedPodcasts.length} unparsed podcasts`);
            for (const podcast of unparsedPodcasts) {
                if (podcast.feedUrl) {
                    try {
                        console.log(`Parsing feed for: ${podcast.name}`);
                        await this.rssParser.parsePodcastFeed(podcast.id, podcast.feedUrl);
                        // Add delay between requests to be respectful
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                    catch (error) {
                        console.error(`Failed to parse ${podcast.name}:`, error);
                    }
                }
            }
        }
        catch (error) {
            console.error('Feed parsing job failed:', error);
        }
        finally {
            this.isRunning = false;
            console.log('Feed parsing job completed');
        }
    }
    async parseSpecificPodcast(podcastId) {
        try {
            const podcast = await this.prisma.podcast.findUnique({
                where: { id: podcastId }
            });
            if (!podcast || !podcast.feedUrl) {
                console.log(`Podcast ${podcastId} not found or has no feed URL`);
                return false;
            }
            console.log(`On-demand parsing for podcast: ${podcast.name}`);
            await this.rssParser.parsePodcastFeed(podcast.id, podcast.feedUrl);
            return true;
        }
        catch (error) {
            console.error(`Failed to parse podcast ${podcastId}:`, error);
            return false;
        }
    }
    // Start background parsing for newly added podcasts
    startBackgroundParsing() {
        // Parse new podcasts every 5 minutes
        setInterval(async () => {
            await this.parseNewPodcastFeeds();
        }, 5 * 60 * 1000);
        console.log('Background feed parsing started (every 5 minutes)');
    }
    isJobRunning() {
        return this.isRunning;
    }
}
exports.FeedParsingJobService = FeedParsingJobService;
