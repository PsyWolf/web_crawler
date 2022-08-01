import { load } from 'cheerio';

import fetchData from './fetchData.js';

const usedLinks = [];
const results = [];

// crawls through a given url, save the img src into the results array and returns all the links in the page
// will skip urls it already crawled
const crawl = async (url, currDepth = 0) => {
    if (usedLinks.indexOf(url) !== -1) {
        console.log(`this url was already crawled. url: ${url}`);
        return[[], []];
    }
    console.log(`current depth: ${currDepth}`);
    usedLinks.push(url);
    let links = [];
    await fetchData(url).then((res) => {
        if (!res) return;
        const html = res.data;
        getImages(html, url, currDepth);
        links = getLinks(html, url);
    });
    return {links, results};
};

// gets the src of all <img> tag in a given html
// save the results into the results array
const getImages = (html, url, currDepth) => {
    const $ = load(html);
    $(`img`).each(function() {
        let imgSrc = $(this).attr('src');
        results.push({ 
            imageUrl: imgSrc,
            sourceUrl: url,
            depth: currDepth
        });
    });
}

// returns a list of the links it found within given html in all <a> tags
const getLinks = (html, url) => {
    const $ = load(html);
    const links = [];
    $(`a`).each(function() {
        let link = $(this).attr('href');
        if (link && link.indexOf('#') !== 0) {
            if (!link.startsWith('http')) {
                link = new URL(link, url).toString();
            }
            links.push(link);
        }
        
    });
    return links;
}

export default crawl;

