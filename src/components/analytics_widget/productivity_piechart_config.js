const productivityPieChart =  {
    chart: {
        plotBackgroundColor: "transparent",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: "transparent"
    },
    title: {
        text: 'Your Productivity Levels (Today)',
        style: {
            color: "white"
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: 'white'
                }
            }
        }
    },
    series: [{
        name: 'Productivity',
        colorByPoint: true,
        data: [{
            name: 'Productive',
            y: []
        }, {
            name: 'Unproductive',
            y: [],
            sliced: true,
            selected: true
        }]
    }]
};

export { productivityPieChart };