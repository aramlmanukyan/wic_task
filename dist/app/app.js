"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getData_controller_1 = __importDefault(require("./controllers/getData.controller"));
class App {
    constructor() {
        this.express = express_1.default();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express_1.default.Router();
        router.get('/get_data', getData_controller_1.default.companiesData)
            .get('/get_data/:searchStr', getData_controller_1.default.companiesData)
            .get('/users_tasks', getData_controller_1.default.getUsersAndTasks)
            .get('/by_post_count', getData_controller_1.default.getUsersByPostCount);
        this.express.use('/', router);
    }
}
exports.default = new App().express;
