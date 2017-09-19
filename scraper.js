const scrapeIt = require("scrape-it");

var jsonfile = require('jsonfile')

var file = 'data1.json'

scrapeIt("https://www.menu.am/am/home.html", {
    // Fetch the articles
    restaurants: {
        listItem: ".item", //"table.table tbody"
        data: {
          title: ".list-title",
          menu: ".restType",
          url:{
                selector: ".list-logo a",
                attr: "href",
          } ,
          reyting:{
                selector: ".list-rate div>.fl",
                attr: "style",
          }
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
            // content: {
            //     selector: "h3", // #comp_532cdfe694f5c64e7122aec4c3440909 > div > table > tbody > tr > td
            //     how: "html"
            // }
        }
    }

}, (err, page) => {
    console.log(err || page);
     jsonfile.writeFile(file, page,  {flag: 'w', spaces: 2}, function(err) {
        console.error(err)
    })
});