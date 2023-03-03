"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../../configs/fetch");
exports.default = {
    getProducts(query, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchParams = new URLSearchParams({ q: query, limit: limit.toString() });
            const response = yield (0, fetch_1.meliFetch)(`/sites/MLA/search?q=${searchParams}`);
            if (!response.ok) {
                throw new Error('Error fetching products');
            }
            const { results } = yield response.json();
            if (!Array.isArray(results)) {
                throw new Error('Error fetching products');
            }
            return results;
        });
    },
    getProductDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, fetch_1.meliFetch)(`/items/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching product detail');
            }
            return response.json();
        });
    },
    getProductDescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, fetch_1.meliFetch)(`/items/${id}/description`);
            if (!response.ok) {
                throw new Error('Error fetching product description');
            }
            return response.json();
        });
    },
    getProductCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, fetch_1.meliFetch)(`/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error('Error fetching product category');
            }
            return response.json();
        });
    }
};
