"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_js_1 = __importDefault(require("../../app/server.js"));
chai_1.default.use(chai_http_1.default);
exports.default = chai_1.default.request(server_js_1.default);
