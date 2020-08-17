"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../app/server"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET 201', () => {
    it("should return unique companies", async (done) => {
        const isArrayUnique = (arr) => Array.isArray(arr) && new Set(arr).size === arr.length;
        const res = await supertest_1.default(server_1.default).get("/get_data");
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Array));
        expect(isArrayUnique(res.body)).toBeTruthy();
        done();
    });
    it("should return company names that includes 'Robel'", async (done) => {
        const elemsContain = (arr, str) => {
            let result = true;
            arr.forEach((elem) => {
                if (!elem.includes(str)) {
                    result = false;
                    return;
                }
            });
            return result;
        };
        const res = await supertest_1.default(server_1.default).get("/get_data/Robel");
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Array));
        expect(elemsContain(res.body, 'Robel')).toBeTruthy();
        done();
    });
    it("should return user names and emails", async (done) => {
        const res = await supertest_1.default(server_1.default).get("/by_post_count");
        expect(res.status).toBe(201);
        done();
    });
    it("should return user tasks", async (done) => {
        const res = await supertest_1.default(server_1.default).get("/users_tasks");
        expect(res.status).toBe(201);
        done();
    });
    afterAll((done) => {
        server_1.default.close();
        done();
    });
});
