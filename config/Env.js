'use strict';

const env = {
    securityHost: process.env.POC_SERVICE_SECURITY_HOST || "localhost",
    securityPort: process.env.POC_SERVICE_SECURITY_PORT || "3000",
    inventoryHost: process.env.POC_SERVICE_INVENTORY_HOST || "localhost",
    inventoryPort: process.env.POC_SERVICE_INVENTORY_PORT || "3020",
    auditHost: process.env.POC_SERVICE_AUDIT_HOST || "a9b0d2398538011e9a81b0666116d3a5-1531753782.us-east-2.elb.amazonaws.com",
    auditPort: process.env.POC_SERVICE_AUDIT_PORT || "18082",
    mongoDBHost: process.env.POC_MONGO_HOST || "cluster01-wsnjf.mongodb.net",
    mongoDBPort: process.env.POC_MONGO_PORT || "27017",
    mongoDBUser: process.env.POC_MONGO_USER || "MongoDBUser",
    mongoDBPass: process.env.POC_MONGO_PASS || "MongoDBUser",
    mongoDB: process.env.POC_MONGO_DB ||  "CatalogoDB"
};

module.exports = env;