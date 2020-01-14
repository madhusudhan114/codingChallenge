const request = require('request');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx'
};

function logError(error) {
    console.log(`Something went wrong. Please check the API response ${JSON.stringify(error.error)}`);
    process.exit();
}

async function fetch(options) {
    return new Promise( (resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) reject(err);
            else resolve(JSON.parse(body));
        });
    });
}

async function getBusinesses() {
    const options = {
        url: "https://api.yelp.com/v3/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5",
        method: 'GET',
        headers: headers
    };
    const results = await fetch(options);
    return results;
}

async function getReview(business) {
    const options = {
        url: "https://api.yelp.com/v3/businesses/{id}/reviews11",
        method: 'GET',
        headers: headers
    };
    options.url = options.url.replace('{id}', business.id);
    const results = await fetch(options);
    if (results.error) logError(results);
    business.reviews = results.reviews;
    return business;
}

async function getReviews(businesses) {
    const asyncReviews = businesses.map(item => Promise.resolve(getReview(item)));
    const allReviews = await Promise.all(asyncReviews);
    return allReviews;
}

async function getResults() {
    const results = await getBusinesses();
    if (results.error) logError(results);
    const businessesWithReviews = await getReviews(results.businesses);
    return businessesWithReviews;
}

function printResults(businesses) {
    businesses.forEach(element => {
        console.log(`\nBusiness Name: ${element.name} \nBusiness Address: ${element.location.display_address[0]} \nReview: ${element.reviews[0].text} \nReviewer Name: ${element.reviews[0].user.name}`);
    });
}

async function start() {
    const results = await getResults();
    await printResults(results);
}

start();