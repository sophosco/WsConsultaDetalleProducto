'use strict';

const env = {
    securityHost: process.env.POC_SERVICE_SECURITY_HOST || "localhost",
    securityPort: process.env.POC_SERVICE_SECURITY_PORT || "3000",
    inventoryHost: process.env.POC_SERVICE_INVENTORY_HOST || "ec2-3-17-205-42.us-east-2.compute.amazonaws.com",
    inventoryPort: process.env.POC_SERVICE_INVENTORY_PORT || "3020",
    auditHost: process.env.POC_SERVICE_AUDIT_HOST || "ec2-3-17-205-42.us-east-2.compute.amazonaws.com",
    auditPort: process.env.POC_SERVICE_AUDIT_PORT || "3030"
};

module.exports = env;