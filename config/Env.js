'use strict';

const env = {
    securityHost: process.env.POC_SERVICE_SECURITY_HOST || "ec2-3-17-205-42.us-east-2.compute.amazonaws.com",
    securityPort: process.env.POC_SERVICE_SECURITY_PORT || "9443",
    inventoryHost: process.env.POC_SERVICE_INVENTORY_HOST || "ec2-3-17-205-42.us-east-2.compute.amazonaws.com",
    inventoryPort: process.env.POC_SERVICE_INVENTORY_PORT || "8080",
    auditHost: process.env.POC_SERVICE_AUDIT_HOST || "ec2-3-17-205-42.us-east-2.compute.amazonaws.com",
    auditPort: process.env.POC_SERVICE_AUDIT_PORT || "7443"
};

module.exports = env;