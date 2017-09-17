const scrapeIt = require("scrape-it");

var jsonfile = require('jsonfile')

var file = 'data1.json'

scrapeIt("https://www.sas.am/", {
    // Fetch the articles
    articles: {
        listItem: ".table"
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
                selector
            }
        }
    }

    // Fetch some other data from the page
  , title: ".overflow h1"
  , avatar: {
        selector: ".logo img"
      , attr: "src"
    }
}, (err, page) => {
    console.log(err || page);
     jsonfile.writeFile(file, page,  {flag: 'a', spaces: 2}, function(err) {
        console.error(err)
    })
});