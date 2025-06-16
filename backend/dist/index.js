"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const start = async () => {
    const server = (0, server_1.buildServer)();
    try {
        await server.listen({ port: 3001 });
        console.log("🚀 Server listening on http://localhost:3001");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
