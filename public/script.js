google.charts.load('45', { packages: ['corechart', 'table'] });

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
            data.addColumn('number', 'rating');
            //data.addColumn('string', 'hours');

            for (var i = 0; i < jsonData.length; i++) {
                if(parseInt(jsonData[i].rating)>90 && parseInt(jsonData[i].rating)<100){
                data.addRow([
                    jsonData[i].title,
                    parseInt(jsonData[i].rating),
                   // jsonData[i].hours,
                ]);
                }
            }

    var options = {
        title: '',
        hAxis: { title: '', titleTextStyle: { color: 'red' } }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
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
            data.addColumn('string', 'hours');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].menu,
                    jsonData[i].url,
                    jsonData[i].rating,
                    jsonData[i].hours,
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
    drawPieChart();
    drawColumnChart();
    drawAreaChart();
    drawRegionsMap();
    drawTable();
});
