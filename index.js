const axios = require('axios')

const sitesToScrape = ['http://whoistobias.me', 'https://isitchristmas.com/']
const wordsToScrapeFor = ['script', 'meta', 'json', 'strong']

let resultsObject = initResultsObject(sitesToScrape, wordsToScrapeFor)

async function findWords() {
    sitesToScrape.forEach(async (site, index) => {
        try {
            const response = await axios.get(site)

            wordsToScrapeFor.forEach(word => {
                resultsObject[site][word] += occurrences(response.data, word)
            })
            if (index === sitesToScrape.length - 1) {
                console.log(resultsObject)
            }
        } catch (err) {
            console.log(err)
        }
    })

}


function occurrences(string, subString, allowOverlapping = false) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function initResultsObject(sites, words) {
    const empty = {}
    sites.forEach(site => {
        empty[site] = {}
        words.forEach(word => {
            empty[site][word] = 0
        })
    })
    return empty
}



findWords()