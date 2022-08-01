import { writeFile } from 'fs';

import crawl from './crawler.js';
import grab from './grab.js';

// "https://blog.logrocket.com/node-js-web-scraping-tutorial/";
const url = grab('--url'); 
const depth = grab('--depth');

if (url === -1) {
    console.error('url parameter is required');
}

if (depth === -1) {
    depth = 0;
}

let res = [];

const startCrawl = async (url, maxDepth, currDepth = 0) => {
    if (maxDepth < currDepth) {
        return;
    }
    let { links, results } = await crawl(url, currDepth);
    if (results) {
        res = res.concat(results);
    }
    if (links) {
        links.forEach(async link => {
            await startCrawl(link, maxDepth, currDepth + 1);
        });
    }
}




startCrawl(url, depth).then(() => {
    writeFile("output.json", JSON.stringify(res), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
});




