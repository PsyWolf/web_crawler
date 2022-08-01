# web_crawler

Given a URL, the crawler will scan the webpage for any images, continue to every link inside that page and scan it as well.
The crawling should stop once <depth> is reached. depth=3 means we can go as deep as 3 pages from the source URL (denoted by the <url> param), and depth=0 is just the first page.

run like this:

node index.js --url <url> --depth <depth>
