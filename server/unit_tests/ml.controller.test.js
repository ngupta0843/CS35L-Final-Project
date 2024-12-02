const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const { callgpt } = require('../controllers/ml/ml.controllers');  // Adjust the path as necessary

jest.setTimeout(90000);  // Increase the timeout for async operations

describe('callgpt Controller', () => {
    let execMock;

    beforeEach(() => {
        // Mock exec to avoid calling the actual Python script
        execMock = sinon.stub(require('child_process'), 'exec');
        //cd 
    });

    afterEach(() => {
        // Restore the mock after each test
        sinon.restore();
    });

    it('should return 200 with the result of the Python script on success', (done) => {
        const req = httpMocks.createRequest({
            body: {
                indata: 'biceps, triceps, shoulders',
                type: 'w',
            }
        });
        const res = httpMocks.createResponse();

        // Mock the behavior of exec for successful execution (mocking stdout)
        execMock.callsArgWith(2, null, 'biceps, triceps, shoulders', null);

        // Override the res.json method to track when it's called
        const jsonSpy = sinon.spy(res, 'json');

        // Call the controller function
        callgpt(req, res);

        // We use `setImmediate` to ensure the response processing happens in the next event loop
        setImmediate(() => {
            // Now that the response is processed, check that res.json was called with the expected data
            expect(jsonSpy.calledOnce).toBe(true); // Ensure json was called once
            expect(res.statusCode).toBe(200);
            expect(jsonSpy.calledWith({ result: 'biceps, triceps, shoulders' })).toBe(true);
            done();  // Indicate that the test is complete
        });
    });

    // Other test cases here...
});
