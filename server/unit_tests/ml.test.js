const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const base_url = "http://localhost:8088/ml"; // Assuming BASE_URL is set in your .env
chai.use(chaiHttp);  // Add chaiHttp as middleware

const orderBody = {
    "indata": "I would like to make an exercise routine to train my biceps, triceps, and shoulders.",
    "type": "w"
};

it('calling callgpt', function(done) {
    // Log the request body to ensure it's sent correctly
    console.log("Request Body Sent: ", orderBody);

    chai.request(base_url)
        .post('/')
        .send(orderBody)
        .end(function (err, res) {
            if (err) {
                console.log("Error:", err);
                done(err);  // If error occurs, pass it to done
                return;
            }

            // Log the response to ensure we see what was returned
            console.log("Response Body:", res.body);

            try {
                //assert that the response body has a property called 'result'
                expect(res.body).to.have.property('result');
                // Other assertions can go here if needed
                done();  // Signal the completion of the test
            } catch (assertionError) {
                console.log("Assertion Error:", assertionError);
                done(assertionError);  // Call done with the assertion error
            }
        });
});
