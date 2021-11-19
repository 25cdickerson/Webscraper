// This is a data scraper to check for slurs against women in the most popular rap songs of today
// This is used to collect data for my DLM 110 paper

// init
const puppeteer = require('puppeteer');
process.setMaxListeners(Infinity);

// function to count occurences in strings
function countOccurences(string, word) {
    return string.split(word).length - 1;
}

// global variables
var totalB = 0;
var totalH = 0;
var totalC = 0;
var totalS = 0;
var totalP = 0;
var totalG = 0;
var totalA = 0;
var totalW = 0;
var totalD = 0;
var totalT = 0;

async function scrape (url, lyrics, title, i){
    //Opens window
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    // Uses XPATH to retrieve title data
    const [el] = await page.$x(title)
    const txt = await el.getProperty('textContent')
    const titleTxt = await txt.jsonValue();
    console.log("title: ", titleTxt);


    // Uses XPATH to retrieve lyric data
    const [el1] = await page.$x(lyrics)
    const txt1 = await el1.getProperty('textContent');
    const rawTxt = await txt1.jsonValue();

    // Check for slurs against women
    // B-Word
    var countB = countOccurences(rawTxt,"bitch") + countOccurences(rawTxt, "Bitch");
    console.log("B-Word Count:", countB);
    totalB = totalB + countB;

    // H-Word
    var countH = countOccurences(rawTxt, "hoe") + countOccurences(rawTxt, "Hoe");
    console.log("H-Word Count:", countH);
    totalH = totalH + countH;

    // C-Word
    var countC = countOccurences(rawTxt, "cunt") + countOccurences(rawTxt, "Cunt");
    console.log("C-Word Count:", countC);
    totalC = totalC + countC;

    // S-Word
    var countS = countOccurences(rawTxt, "slut") + countOccurences(rawTxt, "Slut");
    console.log("S-Word Count:", countS);
    totalS = totalS + countS;

    // P-word
    var countP = countOccurences(rawTxt, "pussy") + countOccurences(rawTxt, "pussies") + countOccurences(rawTxt, "Pussy") + countOccurences(rawTxt, "Pussies");
    console.log("P-Word Count:", countP);
    totalP = totalP + countP;

    // "Girl" count
    var countG = countOccurences(rawTxt, "girl") + countOccurences(rawTxt, "Girl");
    console.log("Girl Count: ", countG);
    totalG = totalG + countG;

    // A-Word
    var countA = countOccurences(rawTxt, "ass") + countOccurences(rawTxt, "Ass");
    console.log("A-Word Count: ", countA);
    totalA = totalA + countA;

    // W-Word
    var countW = countOccurences(rawTxt, "whore") + countOccurences(rawTxt, "Whore");
    console.log("W-Word Count: ", countW);
    totalW = totalW + countW;

    // D-Word
    var countD = countOccurences(rawTxt, "dyke") + countOccurences(rawTxt, "Dyke");
    console.log("D-Word Count: ", countD);
    totalD = totalD + countD;

    // T-Word
    var countT = countOccurences(rawTxt, "thot") + countOccurences(rawTxt, "Thot");
    console.log("T-Word Count: ", countT);
    totalT = totalT + countT;


    console.log("\nTotals After {" + i + "}");
    console.log("Totals:")
    console.log("B-Word Total:", totalB);
    console.log("H-Word Total:", totalH);
    console.log("C-Word Total:", totalC);
    console.log("S-Word Total:", totalS);
    console.log("P-Word Total:", totalP);
    console.log("Girl Total:", totalG);
    console.log("A-Word Total: ",totalA);
    console.log("W-Word Total: ",totalW);
    console.log("D-Word Total: ",totalD);
    console.log("T-Word Total: ",totalT);
    console.log("\n");

    browser.close();
}

// Array of Top 25 Rap songs according to billboard
var link = ['https://lyricsondemand.com/l/lilnasxlyrics/industrybabylyrics.html', 'https://thelyricsland.com/escape-plan-lyrics/', 'https://www.lyricsondemand.com/d/drakelyrics/way2sexylyrics.html', 'https://www.lyricsondemand.com/d/drakelyrics/knifetalklyrics.html', 'https://www.lyricsondemand.com/n/nardowicklyrics/whowantsmokelyrics.html', 'https://www.lyricsondemand.com/b/babykeemlyrics/familytieslyrics.html', 'https://lyricsondemand.com/b/blxstlyrics/chosenlyrics.html', 'https://www.lyricsondemand.com/m/meekmilllyrics/sharinglocationslyrics.html', 'https://www.lyricsondemand.com/d/drakelyrics/fairtradelyrics.html', 'https://www.lyricsondemand.com/y/youngthuglyrics/bubblylyrics.html', 'https://www.lyricsondemand.com/l/lattolyrics/bigenergylyrics.html', 'https://www.lyricsondemand.com/k/kanyewestlyrics/hurricanelyrics.html', 'http://www.lyricsondemand.com/n/nlechoppalyrics/jumpinlyrics.html', 'https://lyricsondemand.com/t/travisscottlyrics/mafialyrics.html', 'https://www.lyricsondemand.com/d/drakelyrics/girlswantgirlslyrics.html', 'http://www.lyricsondemand.com/y/yungbleulyrics/baddestlyrics.html', 'http://www.lyricsondemand.com/0/42dugglyrics/maybachlyrics.html', 'https://lyricsondemand.com/g/gunnalyrics/tooeasylyrics.html', 'https://lyricsondemand.com/k/kanyewestlyrics/praisegodlyrics.html', 'https://letra-lyric.blogspot.com/2021/11/super-gremlin-kodak-black-lyrics.html'];

// XPATH of the lyrics corresponding to each song
var lyrics = ['//*[@id="ldata"]/div[4]', '//*[@id="4584-tab-0"]', '//*[@id="sbmtlyr"]', '//*[@id="ldata"]/div[4]', '//*[@id="sbmtlyr"]', '//*[@id="ldata"]/div[4]', '//*[@id="ldata"]/div[3]', '//*[@id="sbmtlyr"]', '//*[@id="sbmtlyr"]', '//*[@id="ldata"]/div[4]', '//*[@id="sbmtlyr"]', '//*[@id="ldata"]/div[4]', '//*[@id="sbmtlyr"]', '//*[@id="sbmtlyr"]', '//*[@id="sbmtlyr"]', '//*[@id="sbmtlyr"]', '//*[@id="ldata"]/div[3]', '//*[@id="ldata"]/div[3]', '//*[@id="sbmtlyr"]', '//*[@id="post-body-6990340868353828742"]/div[4]'];

// XPATH of the titles correspoinding to each song
var title = ['//*[@id="ldata"]/a[2]', '//*[@id="post-4580"]/div[1]/header/h1', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="ldata"]/a[2]', '//*[@id="Blog1"]/div[1]/div/div/div/div[1]/h3'];

console.log("loading content (may take awhile)");

// Goes through the array of songs and scrapes them
for(i=0; i < link.length; i++){
    console.log("start scrape: {" + i + "}");
    scrape(link[i], lyrics[i], title[i], i);
}