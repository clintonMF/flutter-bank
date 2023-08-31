let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

// assertion style 
chai.use(chaiHttp);
chai.should();

describe('account endpoints', () => {
    /** 
     * test the GET endpoint
    */
    describe('GET /api/v1/account/', () => {
        it("Should return a list of accounts", (done) =>{
            chai.request(server)
                .get("/api/v1/accounts")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
                });
        });
        it("Should not get all accounts", (done) =>{
            chai.request(server)
                .get("/api/v1/account")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("Route does not exist");
                done();
                });
        });
    });
   /**
    * test the POST endpoint
    */
   
    describe('POST /api/v1/accounts', () => {
        it("It should create a new account", (done) =>{
            const userInput = {
                "firstName": "daniel",
                "lastName": "mekwunye",
                "dob": "2003-07-10",
                "accountType": "savings",
                "accountBalance": 6000,
            };
            chai.request(server)
                .post("/api/v1/accounts/")
                .send(userInput)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('lastName').eq("mekwunye");
                    res.body.should.have.property('firstName').eq("daniel");
                    res.body.should.have.property('accountType').eq("savings");
                    res.body.should.have.property('accountBalance').eq(6000);
                    res.body.should.have.property('accountNumber');
                done();
                });
        });
        it("it should not create new task", (done) =>{
            const userInput = {
                "lastName": "mekwunye",
                "dob": "2003-07-10",
                "accountType": "savings",
                "accountBalance": 50000
            };
            chai.request(server)
                .post("/api/v1/accounts/")
                .send(userInput)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("msg").eq('"firstName" is required');
                done();
            });
        });
    });
    /**
     * test the GET by account number endpoint
    */
    describe('GET /api/v1/accounts/:accountNUmber', () => {
        it("It should return the account details", (done) =>{
            const accountNumber = 2116360114;
            chai.request(server)
                .get("/api/v1/accounts/"+accountNumber)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('accountType');
                    res.body.should.have.property('accountBalance');
                    res.body.should.have.property('accountNumber');
                    done();
                });
        });
        it("It Should not get the account details", (done) =>{
            const accountNumber = 2116360;
            chai.request(server)
            .get("/api/v1/accounts/"+accountNumber)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property("msg").eq("Account 2116360 not found");
            done();
            });
        });
    });
})
