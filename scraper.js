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
                       var t = x.substr(10,13);
                       var a = t.split(" ");
                       var a_1 = a[0].split(":");
                       var a_11 = a_1[0];
                       var a_12 = a_1[1];
                       var b_1 = a[2]? a[2].split(":"): "";
                       var b_11 = b_1[0];
                       var b_12 = b_1[1];
                       var arr = [];
                       arr.push(a_11,a_12,b_11,b_12);
                       return arr;
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