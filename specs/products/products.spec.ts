import { describe, expect, test, beforeAll } from 'vitest';
import adminController from '../../controller/admin.controller';
import { faker } from '@faker-js/faker';
import productController from '../../controller/product.controller';

let token: string = '';

beforeAll(async () => {
    token = (await adminController.postAdminLoginJWTToken()).body.token;
});

describe('GET Products', () => {
    test('GET /products', async () => {
        const productsList = await productController.getAllProducts(token);

        expect(productsList.status).toEqual(200);
        expect(productsList.body[0]).toHaveProperty('id');
    });
});

describe('POST Products', () => {
    test('POST /products - create empty product', async () => {
        const productsList = await productController.postCreateNewProduct(token);

        expect(productsList.status).toEqual(201);
        expect(productsList.body).toHaveProperty('description', '');
        expect(productsList.body).toHaveProperty('price', '');
        expect(productsList.body).toHaveProperty('name', 'Product');
    });

    test('POST /products - create new product with defined properties', async () => {
        const data: { [key: string]: string } = {
            name: faker.word.adjective(),
            description: faker.lorem.paragraph(),
        };

        const productsList = await productController.postCreateNewProduct(token, data);

        expect(productsList.status).toEqual(201);
        expect(productsList.body).toHaveProperty('name', data.name);
        expect(productsList.body).toHaveProperty('description', data.description);
    });
});
