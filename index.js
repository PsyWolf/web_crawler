import { writeFile } from 'fs';

import crawl from './crawler.js';
const args = process.argv.slice(2);

const writeToJson = () => {
    writeFile("output.json", JSON.stringify(res), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

if (args.length === 0) {
    console.error('url parameter is required');
    process.exit();
} 

const url = new URL(args[0]).toString();
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
    console.log(`image count: ${res.length}`);
    if (links) {
        links.forEach(async link => {
            await startCrawl(link, maxDepth, currDepth + 1).then(writeToJson);
        });
    }
}

startCrawl(url, depth).then(writeToJson);

