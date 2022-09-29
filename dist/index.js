"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize app
const app = (0, express_1.default)();
const port = process.env.PORT;
// Routes
app.get('/', (req, res) => {
    res.send("Testing");
});
app.listen(port, () => console.log(`Now running on port ${port}.`));
