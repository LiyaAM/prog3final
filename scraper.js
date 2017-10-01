const scrapeIt = require("scrape-it");

var jsonfile = require('jsonfile')

var file = 'data1.json'

scrapeIt("https://www.menu.am/am/home.html", {
    // Fetch the articles
    restaurants: {
        listItem: ".item", //"table.table tbody"
        data: {
            title: ".list-title a",
            menu: ".restType",
            url: {
                selector: ".list-logo a",
                attr: "href",
                convert: function(x){
                    return "https://www.menu.am" + x;
                }
            },
            rating: {
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
                convert: function (x) { // https://jsfiddle.net/g6qf4qsy/
                    if(x.length != 6){
                        return x.substr(10,13);
                    }
                    else{
                       return x.substr(-6,2);
                    }
                }
            }
        }
    }

}, (err, page) => {
    //console.log(err || page);
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        //console.error(err)
    })
});