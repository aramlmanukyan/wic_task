import chai from 'chai'
import server from '../utils/server.mock';

const expect = chai['expect'];

describe(`Get Queries`, () => {
    describe('#201', () => {
        it('should return unique companies', done => {
            server
                .get('/get_data')
                .end((err: any, res: any) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

    });

});
