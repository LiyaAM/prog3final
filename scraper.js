const scrapeIt = require("scrape-it");

var jsonfile = require('jsonfile')

var file = 'data1.json'

scrapeIt("https://www.list.am/", {
    // Fetch the articles
    articles: {
        listItem: ".td-overally" //"table.table tbody"
      , data: {
            // Get the article date and convert it into a Date object
        //     createdAt: {
        //         selector: ".copy"
        //     }
        // , title: "h3.td-overally"
        //     // Get the content
        //   , content: {
        //         selector: ".td-overally"
        //       , how: "html"
        //     }
            content: {
                selector: "h3", // #comp_532cdfe694f5c64e7122aec4c3440909 > div > table > tbody > tr > td
                how: "html"
            }
        }
    }

    // Fetch some other data from the page
  , title: ".t"//body > div.main.index > div.outer > div.container > div > div.promo > div > h2 > a

}, (err, page) => {
    console.log(err || page);
     jsonfile.writeFile(file, page,  {flag: 'a', spaces: 2}, function(err) {
        console.error(err)
    })
});