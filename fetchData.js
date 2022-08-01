import axios from 'axios';

async function fetchData(url){
    // console.log(`Crawling data...`);
    let response = await axios(url)//.catch((err) => console.log(`Couldn't load data. ${url}`));

    if(!response || response.status !== 200){
        //console.log(`Error occurred while fetching data`);
        return;
    }
    return response;
}

export default fetchData;