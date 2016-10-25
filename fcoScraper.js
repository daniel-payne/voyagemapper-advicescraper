var scrapeIt = require("scrape-it")


var sqlCommands = require('./sqlCommands.js')

var rootSite = 'https://www.gov.uk';
var rootPage = '/foreign-travel-advice';

exports.scrapeFCO = function () {

  return extractLinksFromPage(rootSite, rootPage).then((links) => {

    var sequence = Promise.resolve();

    links.forEach(function (link) {

      sequence = sequence.then(function () {
        return extractInformationFromPage(rootSite, link);
      });

    });

    return sequence;

  });

}

function extractInformationFromPage(rootSite, rootPage) {

  return scrapeIt(rootSite + rootPage, {
    title:  'title',
    informations: { listItem  : "p, p+ul li" },
  }).then((data) => {

    var pageInformation = [];

    data.informations.forEach((item) => {

      let newInformation = item.toString();

      if (newInformation !== '[object Object]') {

        let oldIndex = -1;

        pageInformation.some( (item, index) => {

          if (newInformation.indexOf(item) > -1){
             oldIndex = index;
             return true;
          }

          return false;
        })

        if (oldIndex === -1){
          pageInformation.push(newInformation);
        } else {
          pageInformation[oldIndex] = newInformation;
        }
   
      }

    });

    var pageText = pageInformation.join(' ');

    pageText = pageText.replace(/([a-z]|\)) (The |You |There |In [a-z]|the FCO advise against )/g, '$1. $2')

    pageText = pageText.replace(/([a-z]|.) (see natural disasters|see terrorism|see landmines|see natural disasters|see winter sports|see consular assistance|see political situation|see crime and local travel|see crime)/gi, '$1. $2.') 

    pageText = pageText.replace(/ in the area to which. the FCO advise against /g, ' in the area to which the FCO advise against ')

    console.log(rootSite + rootPage)
    //console.log(pageInformation.join('\n'))

    return sqlCommands.processQuery('Risk.PostDocument', [

        { name: 'Source',      value: rootSite + rootPage          },
        { name: 'Title',       value: data.title                   },
        { name: 'Text',        value: pageText                     } 

    ]);

  });

}

function extractLinksFromPage(rootSite, rootPage){

  return scrapeIt(rootSite + rootPage, {
    links: { listItem: 'a', data: { text: {}, url: { attr: "href" } } }
  }).then( (data) => {

    var rootPageLinks = [];

    data.links.forEach((item) => {

      if (item.url.indexOf(rootPage) > -1 ){

        if ((item.url.indexOf('email-signup') === -1 ) && (item.url.indexOf('.atom') === -1 ) ){
          rootPageLinks.push( item.url );
        }

      }

    });

    return rootPageLinks;

  });

}

