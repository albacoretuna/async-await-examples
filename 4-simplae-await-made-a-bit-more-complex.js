/**
 * simple await made a bit more complex
 * I can't make this work! throws at last line
 */

var request = require('request-promise');


async function getCamoJson() {
    var options = {
        url: 'https://api.github.com/repos/scottwrobinson/camo',
        headers: {
            'User-Agent': 'YOUR-GITHUB-USERNAME'
        }
    };
    return await request.get(options);
}

var body = await getCamoJson();


/** error:
SyntaxError: /home/omid/dev/async-await-example/4-simplae-await-made-a-bit-more-complex.js: Unexpected token (19:17)
  17 | }
  18 |
> 19 | var body = await getCamoJson();
     |                  ^
  20 |
*/
