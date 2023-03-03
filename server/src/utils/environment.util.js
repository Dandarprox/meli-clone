"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredEnvVar = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    SERVER_PORT: zod_1.z.string(),
});
function getRequiredEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
exports.getRequiredEnvVar = getRequiredEnvVar;
