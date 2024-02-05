import supertest from 'supertest';
import config from '../config/base.config';
import TestAgent from 'supertest/lib/agent';

class AdminController {
    request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    async postAdminLoginJWTToken() {
        return this.request.post('/token').send({
            username: process.env.VITE_ADMIN_USERNAME,
            password: process.env.VITE_ADMIN_PASSWORD,
        });
    }
}

export default new AdminController(supertest(config.jwtAuthUrl));
