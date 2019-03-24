/* eslint-disable no-undef, no-console */
/** Import the dependencies for testing **/
const chai = require('chai');
const chaiHttp = require('chai-http');
let app = null;


/** Configure chai **/
chai.use(chaiHttp);
chai.should();

describe("Routing express - state services (UP)", () => {

    /** Exec before of run tests of the describe **/
    before(done => {
        try {
            // eslint-disable-next-line global-require
            app = require('../app.js');
            console.info('--> Successfully in prepare service - app.js \n');
            done();
        } catch (error) {
            console.error('--> Error in prepare service - app.js');
            process.exit(1);
        }
    });

});