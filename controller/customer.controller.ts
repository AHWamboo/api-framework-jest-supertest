import supertest from 'supertest';
import config from '../config/base.config';
import TestAgent from 'supertest/lib/agent';

class CustomerController {
    request: TestAgent;

    constructor(request: TestAgent) {
        this.request = request;
    }

    async getAllCustomers(token: string) {
        return this.request.get('/customers').auth(token, { type: 'bearer' });
    }

    async postCreateNewCustomer(data: { [key: string]: string }, token: string) {
        return this.request.post('/customers').send(data).auth(token, { type: 'bearer' });
    }
}

export default new CustomerController(supertest(config.baseUrl));
