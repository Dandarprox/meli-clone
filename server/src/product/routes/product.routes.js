"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
exports.productRouter = router;
router.get('/', product_controller_1.default.getProducts);
router.get('/items/:id', product_controller_1.default.getProductDetail);
