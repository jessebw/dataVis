google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart(){
	$.ajax({
		url: "js/mockDataPie.json",
		dataType: "json",

		success: function(pieData){

			// var data = google.visualization.arrayToDataTable([
			// 	    ['Task', 'Hours per Day'],
   //        			['Work',     11],
   //        			['Eat',      2],
   //       			['Commute',  2],
   //        			['Watch TV', 2],
   //        			['Sleep',    7]
			// 	]);

			var data = new google.visualization.DataTable();

				// data.addColumn('string', 'Year');
				// data.addColumn('number', 'Births');
				// data.addColumn('number', 'Deaths');
				// data.addColumn('number', 'Marriages')

				for (var i = 0; i < pieData.length; i++) {
					data.addRow([pieData[i].leftHanded, pieData[i].rightHanded, pieData[i].ambidextrous, pieData[i].hasNoHands]);
			} 

			var options = {
          		title: 'Dexterity of Yoobee Class'
        	};

        	var chart = new google.visualization.PieChart(document.getElementById('pieChart'));

        	chart.draw(data, options);

		},
		error: function(){
			console.log("statData");
		}
	});
}



function drawChart(){

	$.ajax({
		url:  "js/data.json",
		dataType: "json",
		success: function(statData){

			var data = new google.visualization.DataTable();

				data.addColumn('string', 'Year');
				data.addColumn('number', 'Births');
				data.addColumn('number', 'Deaths');
				data.addColumn('number', 'Marriages')

				for (var i = 0; i < statData.length; i++) {
					data.addRow([statData[i].Year, statData[i].Births, statData[i].Deaths, statData[i].Marriages]);
			} /*/data*/

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

		 	} /*/options*/

			var chart = new google.visualization.BarChart(document.getElementById('chartLocation'));

			chart.draw(data, options);
				},
		error: function(){
			alert("Something went wrong, Can't connect to server.");
		}
	});

 } /*/drawChart*/