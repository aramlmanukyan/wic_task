"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const server_mock_1 = __importDefault(require("../utils/server.mock"));
const expect = chai_1.default['expect'];
describe(`Get Queries`, () => {
    describe('#201', () => {
        it('should return user tasks', done => {
            server_mock_1.default
                .get('/user_tasks')
                .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
});
