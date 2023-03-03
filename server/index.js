"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const product_routes_1 = require("./src/product/routes/product.routes");
const environment_util_1 = require("./src/utils/environment.util");
dotenv_1.default.config();
const serverPort = (0, environment_util_1.getRequiredEnvVar)('SERVER_PORT');
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)({
    origin: '*'
}));
// Routes
app.use('/api/v1', product_routes_1.productRouter);
// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
});
