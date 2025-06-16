"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const search_1 = __importDefault(require("./routes/search"));
const buildServer = () => {
    const fastify = (0, fastify_1.default)({ logger: true });
    fastify.register(prisma_1.default);
    fastify.register(search_1.default);
    return fastify;
};
exports.buildServer = buildServer;
