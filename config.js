const API_KEY = 'Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx';
// const HOST = 'https://api.yelp.com';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + ' ' + API_KEY
};

module.exports = { headers: headers };