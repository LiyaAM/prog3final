google.charts.load('45', { packages: ['corechart', 'table', 'timeline'] });

//google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
$.ajax({
    url: "/restaurants",
    dataType: "json",
    success: function (jsonData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'title');
    data.addColumn('number', 'rating');
   
    for (var i = 0; i < jsonData.length; i++) {
        if(parseInt(jsonData[i].rating)>0 && parseInt(jsonData[i].rating)<=100){
            data.addRow([
                jsonData[i].title,
                parseInt(jsonData[i].rating),
            ]);
       }
    }
    
    var options = {
          title: 'Liya',
          colors: ['#e91e63'],
          legend: { position: 'none' },
        };
    //console.log(data.toJSON());
    // Instantiate and draw the chart.
    var chart = new google.visualization.Histogram(document.getElementById('chart_div0'));
        chart.draw(data, options);
}
});
};
function drawColumnChart() {
    $.ajax({
        url: "/restaurants",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('date', 'hours');
            data.addColumn('date', 'hours');

            for (var i = 0; i < jsonData.length; i++) {
               if(jsonData[i].hours != "24"){
                   if( parseInt(jsonData[i].hours[0]) > parseInt(jsonData[i].hours[2]) ){
                       var a = new Date(2014, 10, 16, parseInt(jsonData[i].hours[2]), (jsonData[i].hours[3]));
                    }
                    else{
                        var a = new Date(2014, 10, 15, parseInt(jsonData[i].hours[2]), (jsonData[i].hours[3]));
                    }
                data.addRow([
                    jsonData[i].title,
                    new Date(2014, 10, 15, parseInt(jsonData[i].hours[0]), (jsonData[i].hours[1])),
                    new Date(a)
                    
                   // jsonData[i].hours,
                ]);
                }
            }

    var options = {
        height: 450,
      };

    var chart = new google.visualization.Timeline(document.getElementById('chart_div1'));
    chart.draw(data, options);
}
    });
}

function drawTable() {
    $.ajax({
        url: "/restaurants",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'menu');
            data.addColumn('string', 'url');
            data.addColumn('string', 'rating');
            //data.addColumn('arr', 'hours');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].menu,
                    jsonData[i].url,
                    jsonData[i].rating,
                   // jsonData[i].hours,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3); // Apply formatter to 3rd column
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawColumnChart();
    drawAreaChart();
    drawRegionsMap();
    drawTable();
});
