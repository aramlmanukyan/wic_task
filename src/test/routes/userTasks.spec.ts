import chai from 'chai'
import server from '../utils/server.mock';

const expect = chai['expect'];

describe(`Get Queries`, () => {
    describe('#201', () => {
        it('should return user tasks', done => {
            server
                .get('/user_tasks')
                .end((err: any, res: any) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

    });

});
