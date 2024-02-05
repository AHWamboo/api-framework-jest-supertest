import { describe, expect, test, beforeAll } from 'vitest';
import adminController from '../../controller/admin.controller';
import { faker } from '@faker-js/faker';
import customerController from '../../controller/customer.controller';

let token: string = '';

beforeAll(async () => {
    token = (await adminController.postAdminLoginJWTToken()).body.token;
});

describe('GET Costumers', () => {
    test('GET /costumers - get list of all customers', async () => {
        const customersList = await customerController.getAllCustomers(token);

        expect(customersList.status).toEqual(200);
        expect(customersList.body[0]).toHaveProperty('id');
    });
});

describe('POST Costumers', () => {
    test('POST /products - create new customer', async () => {
        const data: { [key: string]: string } = {
            email: faker.internet.email(),
        };

        const productsList = await customerController.postCreateNewCustomer(data, token);

        expect(productsList.status).toEqual(201);
        expect(productsList.body).toHaveProperty('email', data.email);
    });
});
