 
// var statData = [
// 	{
// 		Year: "2013",
// 		Births: 58719, 
// 		Deaths: 29568,
// 		Marrages: 19237,

// 	},
// 	{
// 		Year: "2014",
// 		Births: 57243, 
// 		Deaths: 31062,
// 		Marrages: 20235,
// 	},
// 	{
// 		Year: "2015",
// 		Births: 61038, 
// 		Deaths: 31608,
// 		Marrages: 19947,
// 	},
// 	{
// 		Year: "2016",
// 		Births: 59430, 
// 		Deaths: 31179,
// 		Marrages: 20235,
// 	}
// ];

// var data = new google.visualization.DataTable();
// data.addColumn('string', 'Year');
// data.addColumn('number', 'Births');
// data.addColumn('number', 'Deaths');
// data.addColumn('number', 'Marriages')

 google.charts.load('current', {packages: ['corechart']});
 google.charts.setOnLoadCallback(drawChart);

 function drawChart(){

 	// console.log("Packages loaded");

 	// var data = google.visualization.arrayToDataTable([
 	// 		['Year', 'Birth', 'Deaths', 'Marriages'], 
 	// 		['2013', 58719, 29568, 19237],
 	// 		['2014', 57243, 31062, 20235],
 	// 		['2015', 61038, 31608, 19947],
 	// 		['2016', 59430, 31179, 20235]
 	// 	]);

 	var options = {
 		title: 'Births, Deaths and Marrages from New Zealand',
 		subtitle: 'over the last 4 years',
 		hAxis:{
 			title: 'Number',
 			minValue: 0,
 		},
 		vAxis:{
 			title: 'Year'
 		},	
 		animation: {
 			startup: true,
 			duration: 2000,
 			easing: 'out'
 		}

 	}


var statData = [
	{
		Year: "2013",
		Births: 58719, 
		Deaths: 29568,
		Marrages: 19237,

	},
	{
		Year: "2014",
		Births: 57243, 
		Deaths: 31062,
		Marrages: 20235,
	},
	{
		Year: "2015",
		Births: 61038, 
		Deaths: 31608,
		Marrages: 19947,
	},
	{
		Year: "2016",
		Births: 59430, 
		Deaths: 31179,
		Marrages: 20235,
	}
];

var data = new google.visualization.DataTable();
data.addColumn('string', 'Year');
data.addColumn('number', 'Births');
data.addColumn('number', 'Deaths');
data.addColumn('number', 'Marriages')

for (var i = 0; i < statData.length; i++) {
	data.addRow([statData[i].Year, statData[i].Births, statData[i].Deaths, statData[i].Marriages]);
}


 	var chart = new google.visualization.BarChart(document.getElementById('chartLocation'));
 	chart.draw(data, options);

 }