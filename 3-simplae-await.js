/**
  * a simple await example
  */

var request = require('request-promise');

var options = {
    url: 'https://api.github.com/repos/scottwrobinson/camo',
    headers: {
        'User-Agent': 'YOUR-GITHUB-USERNAME'
    }
};
console.log('Running 3-simple-await.js');
async function main() {
    var body = await request.get(options);
    console.log('Body:', body);
}
main();
