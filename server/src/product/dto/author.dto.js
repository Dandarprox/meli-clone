"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorDto = void 0;
const zod_1 = require("zod");
exports.AuthorDto = zod_1.z.object({
    name: zod_1.z.string(),
    lastname: zod_1.z.string(),
});
