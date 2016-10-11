"use strict";

const request = require('request-promise');

const headers = {
    'User-Agent': 'scottwrobinson'
};

const repos = [
    'scottwrobinson/camo',
    'facebook/react',
    'scottwrobinson/twentyjs',
    'moment/moment',
    'nodejs/node',
    'lodash/lodash'
];

const issueTitles = [];

async function main() {

    let reqs = repos.map(async function(r) {
        let options = { url: 'https://api.github.com/repos/' + r, headers: headers };
        let body = await request.get(options);
        let json = JSON.parse(body);
        if (json.has_issues) {
            let issuesOptions = { url: 'https://api.github.com/repos/' + r + '/issues', headers: headers };
            let ibody = await request.get(issuesOptions);
            let issuesJson = JSON.parse(ibody);

            if (issuesJson[0]) {
                issueTitles.push(issuesJson[0].title);
                console.log(JSON.stringify('issueTitles inside main', issueTitles));
            }
        }
    });

    await Promise.all(reqs);
    
    console.log(JSON.stringify(issueTitles));
}

main();
