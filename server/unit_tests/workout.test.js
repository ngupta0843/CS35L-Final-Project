const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const base_url = "http://localhost:8088/api/workouts"; // Base URL of your API
chai.use(chaiHttp);  // Add chaiHttp as middleware

// Mock data for testing
const mockWorkout = {
    userId: "user123",
    date: "2024-12-06",
    workout: { type: "Push-up", sets: 3, reps: 15 }
};

// Helper to clean up the database (if necessary)
const cleanDatabase = async () => {
    // Implement a database cleanup function if needed, e.g. deleting mock entries
};

describe('Workout API Tests', () => {
    beforeEach(cleanDatabase);  // Clean database before each test, if needed

    // Test for adding a workout
    it('should add a workout successfully', (done) => {
        chai.request(base_url)
            .post('/add')
            .send(mockWorkout)
            .end((err, res) => {
                if (err) {
                    console.log("Error:", err);
                    done(err);  // Pass error to done()
                    return;
                }

                // Log the response for debugging
                console.log("Response Body:", res.body);

                try {
                    expect(res.status).to.equal(201); // Expect status 201 (Created)
                    expect(res.body).to.have.property('message').that.equals('Workout added successfully');
                    expect(res.body).to.have.property('workoutLog');
                    expect(res.body.workoutLog).to.have.property('userId').that.equals(mockWorkout.userId);
                    expect(res.body.workoutLog.workouts).to.be.an('array').with.lengthOf(1);
                    done();
                } catch (assertionError) {
                    console.log("Assertion Error:", assertionError);
                    done(assertionError);
                }
            });
    });

    // Test for getting workouts by date
    it('should get workouts for a specific date', (done) => {
        chai.request(base_url)
            .post('/add')  // Add a workout first for the test
            .send(mockWorkout)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                const userId = mockWorkout.userId;
                const date = mockWorkout.date;

                chai.request(base_url)
                    .get(`/${userId}/${date}`)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        console.log("Response Body:", res.body);

                        try {
                            expect(res.status).to.equal(200); // Status should be 200 OK
                            expect(res.body).to.have.property('userId').that.equals(userId);
                            expect(res.body).to.have.property('date').that.equals(date);
                            expect(res.body.workouts).to.be.an('array').with.lengthOf(1);
                            done();
                        } catch (assertionError) {
                            console.log("Assertion Error:", assertionError);
                            done(assertionError);
                        }
                    });
            });
    });

    // Test for deleting a workout
    it('should delete a specific workout', (done) => {
        // First, add a workout to delete
        chai.request(base_url)
            .post('/add')
            .send(mockWorkout)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                const workoutId = res.body.workoutLog.workouts[0]._id;

                chai.request(base_url)
                    .delete(`/${workoutId}`)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        console.log("Response Body:", res.body);

                        try {
                            expect(res.status).to.equal(200); // Expect status 200 (OK)
                            expect(res.body).to.have.property('message').that.equals('Workout deleted successfully');
                            expect(res.body.workoutLog.workouts).to.be.an('array').with.lengthOf(0); // No workouts left
                            done();
                        } catch (assertionError) {
                            console.log("Assertion Error:", assertionError);
                            done(assertionError);
                        }
                    });
            });
    });

    // Test for adding workout without required fields
    it('should return an error when required fields are missing', (done) => {
        const incompleteWorkout = { userId: "user123", date: "2024-12-06" };  // Missing 'workout' field

        chai.request(base_url)
            .post('/add')
            .send(incompleteWorkout)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                console.log("Response Body:", res.body);

                try {
                    expect(res.status).to.equal(400); // Bad Request
                    expect(res.body).to.have.property('message').that.equals('User email, date, and workout are required.');
                    done();
                } catch (assertionError) {
                    console.log("Assertion Error:", assertionError);
                    done(assertionError);
                }
            });
    });

    // Test for getting workouts on a date with no workouts
    it('should return an error when no workouts are found for a specific date', (done) => {
        const userId = "user123";
        const date = "2024-12-06";  // No workouts added for this user on this date

        chai.request(base_url)
            .get(`/${userId}/${date}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                console.log("Response Body:", res.body);

                try {
                    expect(res.status).to.equal(404); // Not Found
                    expect(res.body).to.have.property('message').that.equals('No workouts found for this date.');
                    done();
                } catch (assertionError) {
                    console.log("Assertion Error:", assertionError);
                    done(assertionError);
                }
            });
    });

});
