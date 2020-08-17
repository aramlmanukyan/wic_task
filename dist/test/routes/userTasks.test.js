"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../app/server"));
describe('GET 201', () => {
    afterAll((done) => {
        server_1.default.close();
        done();
    });
});
