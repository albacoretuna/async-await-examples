/* This is the more complicated promise example.
 * output should be like:
    Issue titles:
    Validation message wrong when max value exceeded
    [New Docs] Remove entries under Old Docs for content that has been updated.
    Unclear how to use custom data from extended locales
    test,benchmark: fix lint errors on v6.x
*/

"use strict";

var request = require('request-promise');

var headers = {
    'User-Agent': 'YOUR-GITHUB-USERNAME'
};

var repos = [
    'scottwrobinson/camo',
    'facebook/react',
    'scottwrobinson/twentyjs',
    'moment/moment',
    'nodejs/node',
    'lodash/lodash'
];

var issueTitles = [];

var reqs = Promise.resolve();

repos.forEach(function(r) {
    var options = { url: 'https://api.github.com/repos/' + r, headers: headers };

    reqs = reqs.then(function() {
        return request.get(options);
    }).then(function(body) {
        var json = JSON.parse(body);

        var p = Promise.resolve();

        // Only make request if it has open issues
        if (json.has_issues) {
            var issuesOptions = { url: 'https://api.github.com/repos/' + r + '/issues', headers: headers };
            p = request.get(issuesOptions).then(function(ibody) {
                var issuesJson = JSON.parse(ibody);

                if (issuesJson[0]) {
                    issueTitles.push(issuesJson[0].title);
                }
            });
        }

        return p;
    });
});

reqs.then(function() {
    console.log('Issue titles:');
    issueTitles.forEach(function(t) {
        console.log(t);
    });
});
