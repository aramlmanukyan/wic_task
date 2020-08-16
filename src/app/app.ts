import express from 'express';
import getData from './controllers/getData.controller';

class App {
    public express: any;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();

        router.get('/get_data', getData.companiesData)
            .get('/get_data/:searchStr', getData.companiesData)
            .get('/users_tasks', getData.getUsersAndTasks)
            .get('/by_post_count', getData.getUsersByPostCount);

        this.express.use('/', router);
    }
}

export default new App().express;