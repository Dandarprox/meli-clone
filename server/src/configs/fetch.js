"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meliFetch = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const api_1 = require("../constants/api");
function meliFetch(...args) {
    const [url, init] = args;
    return (0, node_fetch_1.default)(`${api_1.MELI_BASE_URL}${url}`, init);
}
exports.meliFetch = meliFetch;
