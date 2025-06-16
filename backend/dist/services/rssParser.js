"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSSParserService = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser = new rss_parser_1.default({
    customFields: {
        feed: ['title', 'description', 'link'],
        item: [
            'title',
            'contentSnippet',
            'content',
            'pubDate',
            'link',
            'guid',
            'enclosure',
            ['itunes:duration', 'duration']
        ]
    }
});
class RSSParserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async parsePodcastFeed(podcastId, feedUrl) {
        var _a, _b, _c, _d;
        try {
            console.log(`Parsing RSS feed for podcast ${podcastId}: ${feedUrl}`);
            const feed = await parser.parseURL(feedUrl);
            let episodesAdded = 0;
            for (const item of feed.items) {
                if (!item.title || !item.guid)
                    continue;
                try {
                    // Create episode with upsert to avoid duplicates
                    await this.prisma.episode.upsert({
                        where: { guid: item.guid },
                        update: {
                            title: item.title,
                            description: item.contentSnippet || item.content || '',
                            pubDate: item.pubDate ? new Date(item.pubDate) : null,
                            duration: ((_a = item.itunes) === null || _a === void 0 ? void 0 : _a.duration) || item.duration,
                            enclosureUrl: (_b = item.enclosure) === null || _b === void 0 ? void 0 : _b.url,
                            link: item.link,
                        },
                        create: {
                            guid: item.guid,
                            title: item.title,
                            description: item.contentSnippet || item.content || '',
                            pubDate: item.pubDate ? new Date(item.pubDate) : null,
                            duration: ((_c = item.itunes) === null || _c === void 0 ? void 0 : _c.duration) || item.duration,
                            enclosureUrl: (_d = item.enclosure) === null || _d === void 0 ? void 0 : _d.url,
                            link: item.link,
                            podcastId: podcastId,
                        },
                    });
                    episodesAdded++;
                }
                catch (error) {
                    console.error(`Error saving episode ${item.title}:`, error);
                }
            }
            // Update podcast lastParsed timestamp
            await this.prisma.podcast.update({
                where: { id: podcastId },
                data: { lastParsed: new Date() },
            });
            console.log(`Successfully parsed ${episodesAdded} episodes for podcast ${podcastId}`);
            return episodesAdded;
        }
        catch (error) {
            console.error(`Error parsing RSS feed for podcast ${podcastId}:`, error);
            throw error;
        }
    }
    async parseAllPodcastFeeds() {
        const podcasts = await this.prisma.podcast.findMany({
            where: {
                feedUrl: { not: null },
                OR: [
                    { lastParsed: null },
                    { lastParsed: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } // 24 hours ago
                ]
            }
        });
        console.log(`Found ${podcasts.length} podcasts to parse`);
        for (const podcast of podcasts) {
            if (podcast.feedUrl) {
                try {
                    await this.parsePodcastFeed(podcast.id, podcast.feedUrl);
                    // Add delay to avoid overwhelming RSS servers
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                catch (error) {
                    console.error(`Failed to parse podcast ${podcast.id}:`, error);
                }
            }
        }
    }
    async searchEpisodes(searchTerm, limit = 20) {
        const searchTermLower = searchTerm.toLowerCase();
        const episodes = await this.prisma.episode.findMany({
            where: {
                OR: [
                    { title: { contains: searchTermLower } },
                    { description: { contains: searchTermLower } }
                ]
            },
            include: {
                podcast: true
            },
            orderBy: { pubDate: 'desc' },
            take: limit
        });
        return episodes.map(episode => {
            var _a;
            return ({
                id: episode.id,
                title: episode.title,
                description: episode.description,
                podcastName: episode.podcast.name,
                artistName: episode.podcast.artistName,
                releaseDate: (_a = episode.pubDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
                duration: episode.duration,
                episodeUrl: episode.link,
                artworkUrl: episode.podcast.artworkUrl600,
                podcastId: episode.podcast.itunesId,
            });
        });
    }
}
exports.RSSParserService = RSSParserService;
