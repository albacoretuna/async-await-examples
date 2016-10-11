/** complex-await
 * Turning our complex promise to complex await
 * Works but is slow, as it makes requests one after the other
 */

"use strict";

var request = require('request-promise');

var headers = {
    'User-Agent': 'scottwrobinson'
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

async function main() {
    for (let i = 0; i < repos.length; i++) {
        let options = { url: 'https://api.github.com/repos/' + repos[i], headers: headers };
        let body = await request.get(options);
        let json = JSON.parse(body);

        if (json.has_issues) {
            let issuesOptions = { url: 'https://api.github.com/repos/' + repos[i] + '/issues', headers: headers };
            let ibody = await request.get(issuesOptions);
            let issuesJson = JSON.parse(ibody);

            if (issuesJson[0]) {
                issueTitles.push(issuesJson[0].title);
            }
        }
    }

    console.log('Issue titles:');
    issueTitles.forEach(function(t) {
        console.log(t);
    });
}

main();
