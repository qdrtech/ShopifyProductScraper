const xml2js = require('xml2js');
const request = require('request');

let Shopify = {};

Shopify.parseSitemap = function(url, callback){
    request({
        method: 'get',
        url: `https://${url}/sitemap_products_1.xml`,
        gzip: true,
        headers:{
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.35"
        }
    }, (err, res, body) => {
        if(err) return callback(err, null);
		if (body.indexOf('Please try again in a couple minutes by refreshing the page') > -1) {

            return callback('Temp Ban Occured.', null);
        }else if (body.indexOf('http://www.sitemaps.org/schemas') > -1) {

			const parsed = xml2js.parseString(body, (error, result) => {

				if (err || result == undefined) return callback(error, true);

				let products = result['urlset']['url'];
				products.shift()
				return callback(null, products);

			});

		} else {
			return callback('Invalid Shopify Site.', null);
		}
    })
}

module.exports = Shopify;