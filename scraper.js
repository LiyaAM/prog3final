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
            url: {
                selector: ".list-logo a",
                attr: "href",
            },
            reyting: {
                selector: ".list-rate div>.fl",
                attr: "style",
                convert: function (x) { // https://jsfiddle.net/g6qf4qsy/
                    var re = /width: (\d*\.?\d*)/i;
                    if (re.test(x)) {
                        var found = x.match(re);
                        console.log(found[1]);
                        return found[1];
                    } else {
                        return "";
                    }
                }
            },
            hours: {
                selector: ".list-time",
            }
        }
    }

}, (err, page) => {
    //console.log(err || page);
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        //console.error(err)
    })
});