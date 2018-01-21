const visitedSitesPieChart = {
    chart: {
        plotBackgroundColor: "transparent",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: "transparent"
    },
    title: {
        text: 'Your Top Visited Sites (Today)',
        style: {
            color: "white"
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                distance: -70
            }
        }
    },
    series: [{
        name: 'Visit Duration',
        colorByPoint: true,
        data: []
    }]
};

export { visitedSitesPieChart };