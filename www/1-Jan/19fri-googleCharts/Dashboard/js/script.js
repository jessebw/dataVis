google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard(){

    $.ajax({
        url: "js/peopleInfo.json",
        dataType: "json",
        success:function(dataFromJSON){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Age');
            data.addColumn('number', 'Income');
            data.addColumn('string', 'Gender');

            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([
                    dataFromJSON[i].first_name + ' ' + dataFromJSON[i].last_name,
                    dataFromJSON[i].age,
                    dataFromJSON[i].annual_income,
                    dataFromJSON[i].gender
                ]);
            };

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
                    colors: ['black'],
                    backgroundColor: {
                        fill:'transparent'
                    },
                    hAxis:{
                        title: "Age",
                        ticks: [20, 40,60,80,100],
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'black'
                        }
                    },
                    vAxis: {
                        title: "Annual Income",
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'black'
                        }
                    }
                },
                view:{
                    columns: [1, 2]
                }
            });

            var tableChart = new google.visualization.ChartWrapper({
                    chartType: 'Table',
                    containerId: 'chart2',
                    options:{
                        colors: ['black']
                    }
            });

            var incomeRangeSlider = new google.visualization.ControlWrapper({
                controlType: 'NumberRangeFilter',
                containerId: 'control1',
                options: {
                    filterColumnLabel: 'Income',
                    ui: {
                        labelStacking: "vertical"
                    }
                }
            });

            var genderPicker = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'control2',
                options:{
                    filterColumnLabel: 'Gender',
                    ui: {
                        allowMultiple: false,
                        allowTyping: false,
                        labelStacking: "vertical"
                    }
                }
            });

            dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart, tableChart]);
            dashboard.draw(data);
            drawPie(dataFromJSON);

            google.visualization.events.addListener(incomeRangeSlider, 'statechange', function(){

                var range = incomeRangeSlider.getState();
                var view = new google.visualization.DataView(data);
                view.setRows(data.getFilteredRows([
                {
                    column: 2,
                    minValue: range.lowValue, 
                    maxValue: range.highValue
                }
                ]));
                console.log(view);
                var filteredRows = view.ol;
                var newData = [];
                for (var i = 0; i < filteredRows.length; i++) {
                    newData.push(dataFromJSON[filteredRows[i]]);
                };
                drawPie(newData);
            });


        },
        error:function(errorFromJSON){
            console.log("Something has gone wrong");
            console.log(errorFromJson);
            alert("error!!!!!!!!!");
        }
    })

};

function drawPie(data){
    var dataGender = new google.visualization.DataTable();
    dataGender.addColumn('string', 'Gender');
    dataGender.addColumn('number', 'Count');

    var male = 0, female = 0;
    for (var i = 0; i < data.length; i++) {
        if(data[i].gender == "Male"){
            male++;
        } else if (data[i].gender == "Female"){
            female++;
        }
    }

    dataGender.addRow(["Male", male]);
    dataGender.addRow(["Female", female])

    var options = {
        title: "Male and Female Split",
        backgroundColor: {
            fill: 'transparent'
        }
    };

var pie = new google.visualization.PieChart(document.getElementById('chart3'));

pie.draw(dataGender, options);

}





















