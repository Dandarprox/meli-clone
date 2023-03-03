"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponseDto = exports.ProductItemDto = void 0;
const zod_1 = require("zod");
const author_dto_1 = require("./author.dto");
exports.ProductItemDto = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    price: zod_1.z.object({
        currency: zod_1.z.string(),
        amount: zod_1.z.number(),
        decimals: zod_1.z.number(),
    }),
    picture: zod_1.z.string(),
    condition: zod_1.z.string(),
    free_shipping: zod_1.z.boolean(),
    sold_quantity: zod_1.z.number(),
    description: zod_1.z.string(),
    category_path: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    })).optional()
});
exports.ProductResponseDto = zod_1.z.object({
    author: author_dto_1.AuthorDto,
    item: exports.ProductItemDto,
});
