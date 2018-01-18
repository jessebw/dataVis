google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
	$.ajax({
		url:"js/piesDataSmall.json",
		dataType:"json",
		success:function(dataFromServer){

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'country');
			data.addColumn('number', 'like');
			for (var i = 0; i < dataFromServer.length; i++){
				data.addRow([dataFromServer[i].country, dataFromServer[i].like]);
			} /* /data */


			var options = {
          		title: 'Pie eating nations.',
          		pieHole: 0.5,
        	};

			var chart = new google.visualization.PieChart(document.getElementById('chartLocation'));
			google.visualization.events.addListener(chart, 'select', clickEvent);
			chart.draw(data, options);

			function clickEvent(){
				var tableRow = chart.getSelection()[0].row;
				var pieData = dataFromServer[tableRow];
				if (pieData){
					document.getElementById('name').innerText = "Country: " + pieData.country;
					document.getElementById("pop").innerText = "% " + pieData.like;
					document.getElementById("msg").innerText = "Eat too many pies...";
				}
			}

		},
		error:function(error){
			console.log(error);
			alert("Cannot connect to server.");
		}
	})
}


