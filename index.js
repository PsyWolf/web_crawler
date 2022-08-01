import { writeFile } from 'fs';

import crawl from './crawler.js';
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('url parameter is required');
    process.exit();
} 

const url = args[0];
let depth = 0;
if (args.length !== 1) {
    depth = args[1];
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




