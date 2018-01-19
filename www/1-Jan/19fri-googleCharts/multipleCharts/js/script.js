google.charts.load('current', {packages: ['corechart', 'controls' , 'geochart']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard(){
	$.ajax({
		url:"js/peopleInfo.json",
		dataType:"json",
		success:function(dataFromJSON){

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Name');
			data.addColumn('number', 'Age');
			data.addColumn('number', 'Income');
			data.addColumn('string', 'Gender');

			for (var i = 0; i < dataFromJSON.length; i++){
				data.addRow([
					dataFromJSON[i].first_name + ' ' + dataFromJSON[i].last_name,
					dataFromJSON[i].age,
					dataFromJSON[i].annual_income,
					dataFromJSON[i].gender
				]);
			}

			var dashboard = new google.visualization.Dashboard(
				document.getElementById('dashboard'));

			var scatterChart = new google.visualization.ChartWrapper({
				chartType: 'ScatterChart',
				containerId: 'chart1',
				options: {
					width: '100%',
					height: '100%',
					legend: 'none',
					title: 'Age vs Annual Income',
					pointSize: 10,
					pointShape: {
						type: 'star',
						sides: 5
					},
					backgroundColor:{
						fill: 'transparent'
					}
				},
				view:{
					columns: [1, 2]
				}
			});

			var incomeRangeSlider = new google.visualization.ControlWrapper({
				controlType: 'NumberRangeFilter',
				containerId: 'control1',
				options:{
					filterColumnLabel: 'Income',
					ui: {
						labelStacking: 'vertical'
					}
				}

			});

			var optionPicker = new google.visualization.ControlWrapper({
				controlType: 'CategoryFilter',
				containerId: 'control2',
				options:{
					filterColumnLabel: 'Gender',
					ui: {
						allowMultiple: false,
						allowTyping: false,
						labelStacking: 'vertical',
					}
				}
			});

			// var pieChart = new google.visualization.PieChart({
			// 	controlType: 'PieChart',
			// 	containerId: 'chart2',
			// 	options: {
			// 		columns: [2, 3]
			// 	}
			// })

			var tableChart = new google.visualization.ChartWrapper({
				chartType: 'Table',
				containerId: 'tableChart'
			});

			var sankeyChart = new google.visualization.ChartWrapper({
				chartType: 'GeoChart',
				containerId: 'chart3',
				options: {
					columns: [1, ,2, 3]

				}

			});

			dashboard.bind([incomeRangeSlider, optionPicker], [scatterChart, tableChart, sankeyChart]);
			dashboard.draw(data);

			
			

		},
		error:function(error){
			console.log(error);
			alert("Cannot connect to server.");
		}
	})
}

























			// var data = new google.visualization.DataTable();
			// data.addColumn('number', 'Age');
			// data.addColumn('number', 'Income');
			// for (var i = 0; i < dataFromServer.length; i++){
			// 	data.addRow([dataFromServer[i].age, dataFromServer[i].annual_income]);
			// } /* /data */

			// var options = {
			// 	title: "Age vs Annual Income",
			// 	hAxis:{
			// 		title: "Age",
			// 		ticks: [20, 40, 60, 80, 100]
			// 	},
			// 	vAxis:{
			// 		title: "Annual Income",
			// 		ticks: [25000, 50000, 75000, 100000]
			// 	},
			// 	legend: 'none'
			// } /*/options*/

			// var chart = new google.visualization.ScatterChart(document.getElementById('chartLocation'));
			// google.visualization.events.addListener(chart, 'select', clickEvent);
			// chart.draw(data, options);

			// function clickEvent(){
			// 	var tableRow = chart.getSelection()[0].row;
			// 	chart.setSelection();
			// 	var personData = dataFromServer[tableRow];
			// 	if (personData){
			// 		document.getElementById('name').innerText = personData.first_name + " " + personData.last_name;
			// 		document.getElementById("avatarImage").src = personData.avatar;
			// 		document.getElementById("email").innerText = "Email: " + personData.email;
			// 		document.getElementById("company").innerText= "Company: " + personData.company;
			// 		document.getElementById("jobTitle").innerText = "Job title: " + personData.job_title;
			// 		document.getElementById("age").innerText = "Age: " + personData.age;
			// 		document.getElementById("gender").innerText = "Gender: " + personData.gender;
			// 	}
			// }