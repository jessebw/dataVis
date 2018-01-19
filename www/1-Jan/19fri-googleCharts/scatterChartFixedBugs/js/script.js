google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
	$.ajax({
		url:"js/peopleInfo.json",
		dataType:"json",
		success:function(dataFromServer){

			var data = new google.visualization.DataTable();
			data.addColumn('number', 'Age');
			data.addColumn('number', 'Income');
			for (var i = 0; i < dataFromServer.length; i++){
				data.addRow([dataFromServer[i].age, dataFromServer[i].annual_income]);
			} /* /data */

			var options = {
				title: "Age vs Annual Income",
				hAxis:{
					title: "Age",
					ticks: [20, 40, 60, 80, 100]
				},
				vAxis:{
					title: "Annual Income",
					ticks: [25000, 50000, 75000, 100000]
				},
				legend: 'none'
			} /*/options*/

			var chart = new google.visualization.ScatterChart(document.getElementById('chartLocation'));
			google.visualization.events.addListener(chart, 'select', clickEvent);
			chart.draw(data, options);

			function clickEvent(){
				var tableRow = chart.getSelection()[0].row;
				chart.setSelection();
				var personData = dataFromServer[tableRow];
				if (personData){
					document.getElementById('name').innerText = personData.first_name + " " + personData.last_name;
					document.getElementById("avatarImage").src = personData.avatar;
					document.getElementById("email").innerText = "Email: " + personData.email;
					document.getElementById("company").innerText= "Company: " + personData.company;
					document.getElementById("jobTitle").innerText = "Job title: " + personData.job_title;
					document.getElementById("age").innerText = "Age: " + personData.age;
					document.getElementById("gender").innerText = "Gender: " + personData.gender;
				}
			}

		},
		error:function(error){
			console.log(error);
			alert("Cannot connect to server.");
		}
	})
}
