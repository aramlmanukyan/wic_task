import chai from  'chai';
import chaiHttp from'chai-http';

import server from '../../app/server.js';

chai.use(chaiHttp);
export default chai.request(server);