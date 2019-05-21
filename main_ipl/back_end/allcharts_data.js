fetch('./front_end/allcharts_jsondata.json').then(response => response.json()).then(function(data){ 
    matches_count_season(data["matches_count_season"]);
    team_win_count_season(data["team_win_count_season"]);
    Extra_runs_team_2016(data["Extra_runs_team_2016"]);
    Top_10_economy_bowlers(data["Top_10_economy_bowlers"]);    
})
function convert_data_chartdata(data){
    var property=Object.keys(data);
    return property.reduce((return_data,currentValue)=>{
    var final_data={};
    final_data["name"]=currentValue;
    final_data["y"]=data[currentValue];
    return_data.push(final_data);
    return return_data;
},[]);
}
function  matches_count_season(matches_count)
{
    var matches_count_data=convert_data_chartdata(matches_count);
    Highcharts.chart('matches_count_seasons', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number of matches in Every Season IPL'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Matches'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}'
        },
    
        "series": 
        [
            {
                "name": "Matches",
                "colorByPoint": true,
                "data": matches_count_data
                
            }
        ]
        
    });
}
function team_win_count_season(team_win_count)
{

    var team_series_data=Object.keys(team_win_count).map((team_winner)=>{
        var series_data={};
        series_data["name"]=team_winner;
        series_data["data"]=Object.values(team_win_count[team_winner]);
        return series_data;
    });
    Highcharts.chart('team_win_count', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Winning of every team in all IPL Seasons'
        },
        xAxis: {
            categories: ["2008","2009","2010","2011","2012","2014","2015","2016","2017","2018"]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Number of Matches'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: team_series_data
    });
}
function Extra_runs_team_2016(extraRuns_data)
{
    var Extra_runs_team=convert_data_chartdata(extraRuns_data);
    Highcharts.chart('Extra_runs_team', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Extra Runs Conceded per team in 2016 IPL Season'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Runs'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}'
        },
    
        "series": 
        [
            {
                "name": "Runs",
                "colorByPoint": true,
                "data": Extra_runs_team
                
            }
        ]
        
    });
}
function Top_10_economy_bowlers(top_10_economy_data)
{
    var Economy_data=convert_data_chartdata(top_10_economy_data);
    Highcharts.chart('Economy_data', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 Economy Bowlers in 2015 IPL Season'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Economy'
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}'
        },
    
        "series": 
        [
            {
                "name": "Economy",
                "colorByPoint": true,
                "data": Economy_data
                
            }
        ]
        
    });
}