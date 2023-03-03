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
const product_response_dto_1 = require("../dto/product-response.dto");
const api_1 = require("../../constants/api");
const product_repository_1 = __importDefault(require("../repository/product.repository"));
const author_dto_1 = require("../dto/author.dto");
var ImageType;
(function (ImageType) {
    ImageType["THUMBNAIL"] = "thumbnail";
    ImageType["ORIGINAL"] = "original";
})(ImageType || (ImageType = {}));
function parseProductResponseDto(data, imageType = ImageType.THUMBNAIL) {
    const options = {
        picture: data.thumbnail,
    };
    if (imageType === ImageType.ORIGINAL) {
        const pictures = data.pictures;
        const picture = (pictures === null || pictures === void 0 ? void 0 : pictures.length) ? pictures[0].url : null;
        options.picture = picture;
    }
    return {
        author: author_dto_1.AuthorDto.parse({ name: api_1.AUTHOR_NAME, lastname: api_1.AUTHOR_LASTNAME }),
        item: product_response_dto_1.ProductItemDto.parse(Object.assign(Object.assign({}, data), { price: product_response_dto_1.ProductItemDto.shape.price.parse({
                currency: data.currency_id,
                amount: data.price,
                decimals: 0,
            }), picture: options.picture, free_shipping: data.shipping.free_shipping, sold_quantity: data.sold_quantity, description: data.title, category_path: data === null || data === void 0 ? void 0 : data.category_path })),
    };
}
;
exports.default = {
    listProducts(query, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_repository_1.default.getProducts(query, limit);
            return products.map((result) => parseProductResponseDto(result));
        });
    },
    getProductDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [product, description] = yield Promise.all([
                product_repository_1.default.getProductDetail(id),
                product_repository_1.default.getProductDescription(id),
            ]);
            const { path_from_root: category_path } = yield product_repository_1.default.getProductCategory(product.category_id);
            return parseProductResponseDto(Object.assign(Object.assign({}, product), { description,
                category_path }), ImageType.ORIGINAL);
        });
    }
};
