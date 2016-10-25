
var fcoScraper = require("./fcoScraper");


 

fcoScraper.scrapeFCO().then((links) => {

   console.log('Done');

   process.exit(1);

});















//scrapeIt = require("scrape-it")

//scrapeIt("https://www.gov.uk/foreign-travel-advice", {
//  title: 'title',
//  headings: { listItem  : "h1,h2,h3,h4,h5" },
//  informations: { listItem  : "p" },
//  references: { listItem: 'a', data: { text: {}, url: { attr: "href" } } }
//}).then(page => {

//  console.log(page);
//  process.exit(1);

//});



//Explosion
//Shooting
//Travel Disruption
//Weather Warning
//Terrorism
//Shooting
//Kidnap
//Attack
//Canceled Flights

//es-AR,
//en-AU,
//de-AT,
//nl-BE,
//fr-BE,
//pt-BR,
//en-CA,
//fr-CA,
//es-CL,
//da-DK,
//fi-FI,
//fr-FR,
//de-DE,
//zh-HK,
//en-IN,
//en-ID,
//en-IE,
//it-IT,
//ja-JP,
//ko-KR,
//en-MY,
//es-MX,
//nl-NL,
//en-NZ,
//no-NO,
//zh-CN,
//pl-PL,
//pt-PT,
//en-PH,
//ru-RU,
//ar-SA,
//en-ZA,
//es-ES,
//sv-SE,
//fr-CH,
//de-CH,
//zh-TW,
//tr-TR,
//en-GB,
//en-US,
//es-US

//GET https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=Canceled%20Flights&count=10&safeSearch=Off&mkt=en-NZ&headlineCount=1 HTTP/1.1
//Host: api.cognitive.microsoft.com
//Ocp-Apim-Subscription-Key: c19e8d03b6fd454a92dc8f070c7eb94e
