const Shopify = require('./services/shopify.service');

Shopify.parseSitemap("www.unconditional.uk.com", (err, body) => {
    console.log("err", err);
    console.log("body", body);
});