"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const search_1 = __importDefault(require("./routes/search"));
const buildServer = () => {
    const fastify = (0, fastify_1.default)({
        logger: true,
        trustProxy: true // Required for rate limiting behind proxy/Lambda
    });
    // Register rate limiting
    fastify.register(Promise.resolve().then(() => __importStar(require('@fastify/rate-limit'))), {
        max: 100, // Maximum 100 requests
        timeWindow: '1 minute', // Per minute
        errorResponseBuilder: function (request, context) {
            return {
                code: 429,
                error: 'Too Many Requests',
                message: `Rate limit exceeded, retry in ${Math.round(context.ttl / 1000)} seconds.`,
                date: Date.now(),
                expiresIn: Math.round(context.ttl / 1000)
            };
        }
    });
    fastify.register(prisma_1.default);
    fastify.register(search_1.default);
    return fastify;
};
exports.buildServer = buildServer;
