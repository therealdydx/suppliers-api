import { NextApiRequest, NextApiResponse } from "next";
const { default: handler } = require('@/pages/api/suppliers');
import fs from "fs";
import path from "path";

// create a mock request
const imagePath = path.join(process.cwd(), 'public', 'rundoo.png')
const imageData = fs.readFileSync(imagePath).toString('base64');
const mockRequest = {
    method: "POST",
    body: {
        email: "test@example.com",
        logo: {
            data: imageData,
            type: "image/jpeg",
        },
        address: {
            country: "USA",
            state: "California",
            city: "Los Angeles",
            street: "123 Main Street",
            zipcode: "90012",
        },
    },
} as NextApiRequest;

// construct the api response
const mockResponse = {
    json: jest.fn(), // simulate as json
    status: jest.fn(), // set HTTP status code
} as unknown as NextApiResponse;

// create the suppliers API test
describe("/api/suppliers", () => {
    test("creates a new supplier with logo file", async () => {
        await handler(mockRequest, mockResponse);
  
        // check that status code is '200' and object properties
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                email: "test@example.com",
                logo: {
                    data: imageData,
                    type: "image/jpeg",
                },
                address: {
                    country: "USA",
                    state: "California",
                    city: "Los Angeles",
                    street: "123 Main Street",
                    zipcode: "90012",
                },
            })
        );
    });
});