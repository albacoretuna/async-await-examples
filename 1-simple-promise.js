// this is the first example that uses a simple promise approach
var request = require('request-promise');

var options = {
    url: 'https://api.github.com/repos/scottwrobinson/camo',
    headers: {
        'User-Agent': 'YOUR-GITHUB-USERNAME'
    }
};

request.get(options).then(function(body) {
    var json = JSON.parse(body);
    console.log('Camo has', json.stargazers_count, 'stars!');
});

// output should be like: Camo has 1,000,000 stars!
// number of stars might be a bit less though :p
