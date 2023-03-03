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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const product_service_1 = __importDefault(require("../services/product.service"));
const Query = zod_1.z.object({
    q: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().optional().default(50),
});
exports.default = {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q: query, limit } = Query.parse(req.query);
            if (!query) {
                return res.status(400).send([]);
            }
            const products = yield product_service_1.default.listProducts(query, limit);
            return res.status(200).send(products);
        });
    },
    getProductDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send([]);
            }
            const product = yield product_service_1.default.getProductDetail(id);
            return res.status(200).send(product);
        });
    }
};
