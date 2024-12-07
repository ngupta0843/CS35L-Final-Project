const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);  // Add chaiHttp as middleware

const base_url = "http://localhost:8088/users"; // Assuming your base URL

it('should get a list of users', function(done) {
    // Log the request to make sure the API is being hit correctly
    console.log("Testing GET /users route");

    chai.request(base_url)
        .get('/getUserList')  // Assuming the route to fetch users is `/users`
        .end(function (err, res) {
            if (err) {
                console.log("Error:", err);
                done(err);  // If an error occurs, pass it to done
                return;
            }
            try {
                // Assert that the response body is an array of users
                expect(res.body).to.be.an('array');
                // Assert that each item in the array has 'name' and 'email' properties
                res.body.forEach(user => {
                    expect(user).to.have.property('name');
                    expect(user).to.have.property('email');
                });
                // Check the response status code
                expect(res).to.have.status(200);
                done();  // Signal the completion of the test
            } catch (assertionError) {
                console.log("Assertion Error:", assertionError);
                done(assertionError);  // Pass assertion errors to done
            }
        });
});


it('should get the current user', function(done) {
    // Log the request to make sure the API is being hit correctly
    console.log("Testing GET /users route");

    chai.request(base_url)
        .get('/currentUser?id=aditya@gmail.com')  // Assuming the route to fetch users is `/users`
        .end(function (err, res) {
            if (err) {
                console.log("Error:", err);
                done(err);  // If an error occurs, pass it to done
                return;
            }

            try {

                    expect(res.body).to.have.property('email');
                
                // Check the response status code
                expect(res).to.have.status(200);
                done();  // Signal the completion of the test
            } catch (assertionError) {
                console.log("Assertion Error:", assertionError);
                done(assertionError);  // Pass assertion errors to done
            }
        });
});


// it('should send frend request', function(done) {
//     // Log the request to make sure the API is being hit correctly
//     console.log("Testing GET /users route");

//     chai.request(base_url)
//         .get('/sendFriendRequest?cur_user=aditya@gmail.com&req_user=caroline@gmail.com')  // Assuming the route to fetch users is `/users`
//         .end(function (err, res) {
//             if (err) {
//                 console.log("Error:", err);
//                 done(err);  // If an error occurs, pass it to done
//                 return;
//             }
//             try {
//                 // Check the response status code
//                 expect(res).to.have.status(201);
//                 done();  // Signal the completion of the test
//             } catch (assertionError) {
//                 console.log("Assertion Error:", assertionError);
//                 done(assertionError);  // Pass assertion errors to done
//             }
//         });
// });

