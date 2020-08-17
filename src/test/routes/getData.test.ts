import server from '../../app/server';
import request from 'supertest';

describe('GET 201',  ()=> {

    it("should return unique companies", async done => {
        const isArrayUnique = (arr: any) => Array.isArray(arr) && new Set(arr).size === arr.length;
        const res = await request(server).get("/get_data");

        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Array));
        expect(isArrayUnique(res.body)).toBeTruthy();
        done();
    });

    it("should return company names that includes 'Robel'", async done => {
        const elemsContain = (arr: any[], str: string) => {
            let result: boolean = true;
            arr.forEach((elem: string)=>{
                if(!elem.includes(str)){
                    result = false;
                    return
                }
            });
            return result;
        };

        const res = await request(server).get("/get_data/Robel");

        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.any(Array));
        expect(elemsContain(res.body, 'Robel')).toBeTruthy();
        done();

    });

    it("should return user names and emails", async done => {
        const res = await request(server).get("/by_post_count");

        expect(res.status).toBe(201);
        done();
    });

    it("should return user tasks", async done => {
        const res = await request(server).get("/users_tasks");

        expect(res.status).toBe(201);
        done();
    });


    afterAll((done) => {
        server.close();
        done();
    });

});

