import supertest from 'supertest';
import config from '../config/base.config';
import TestAgent from 'supertest/lib/agent';

class ProductController {
    request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    async getAllProducts(token: string) {
        return this.request.get('/products').auth(token, { type: 'bearer' });
    }

    async postCreateNewProduct(token: string, data?: { [key: string]: string }) {
        return this.request.post('/products').send(data).auth(token, { type: 'bearer' });
    }
}

export default new ProductController(supertest(config.baseUrl));
