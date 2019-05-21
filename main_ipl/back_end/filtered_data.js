let csvToJson = require('convert-csv-to-json');
//formatValueByType() convert the string having numbers to numbers
//fieldDelimiter() will consider (',') as defining the new object
function Convert_CSVtoJson(CSVFilePath){ return csvToJson.formatValueByType().fieldDelimiter(',').getJsonFromCsv(CSVFilePath);};

var matches_data=Convert_CSVtoJson('../front_end/csv/matches.csv'); //Converting the Matches CSV data to Json

var all_deliveries=Convert_CSVtoJson('../front_end/csv/deliveries.csv');//Converting the Deliveries CSV data to Json

function Get_match_ids(season){
    return matches_data.reduce((IDs,search)=>{ if(search['season']===season)IDs.push(search['id']);return IDs;},[]);
}

function matches_count_season(){
    return matches_data.reduce((matches,each_match)=>{
        if(matches.hasOwnProperty(each_match['season'])){
        matches[each_match['season']] = matches[each_match['season']]+1;
        }
        else
        {
          matches[each_match['season']]=1;
        }
         return matches;
    },{});    
}

function team_win_count_season(){
    return matches_data.reduce((team_count,each_winner)=>{
        if(each_winner['winner']!="0")
        {
            if(team_count.hasOwnProperty(each_winner['winner']))
            {
                if(team_count[each_winner['winner']].hasOwnProperty(each_winner['season']))
                {
                    team_count[each_winner['winner']][each_winner['season']]=team_count[each_winner['winner']][each_winner['season']]+1;
                }
                else
                {
                    team_count[each_winner['winner']][each_winner['season']]=1;
                }
            }
            else
            {
                team_count[each_winner['winner']]={"2008":0,"2009":0,"2010":0,"2011":0,"2012":0,"2013":0,"2014":0,"2015":0,"2016":0,"2017":0};
                team_count[each_winner['winner']][each_winner['season']]=1;
            }
        }        
         return team_count;
    },{});
}
function Extra_runs_team_2016(){
    var matches_2016=Get_match_ids(2016); //getting Matches IDs of 2016
    return all_deliveries.reduce((team_extra,each_extra)=>{
        if(matches_2016.includes(each_extra['match_id']))
        {
            if(team_extra.hasOwnProperty(each_extra['bowling_team']))
            {
                team_extra[each_extra['bowling_team']]=team_extra[each_extra['bowling_team']]+each_extra['extra_runs'];
               
            }
            else
            {
                team_extra[each_extra['bowling_team']]=each_extra['extra_runs'];
               
            }            
        }
        return team_extra;
    },{});    
}
function top_10_economy(){
    var matches_2015=Get_match_ids(2015);
    var Economy_bolwers=all_deliveries.reduce((bowler_economy,each_delivery)=>{
        if(matches_2015.includes(each_delivery['match_id']))
        {
            if(bowler_economy.hasOwnProperty(each_delivery['bowler']))
            {
                if(bowler_economy[each_delivery['bowler']].hasOwnProperty("Overs")&&bowler_economy[each_delivery['bowler']].hasOwnProperty("Runs")&&bowler_economy[each_delivery['bowler']].hasOwnProperty("Economy"))
                    {
                        bowler_economy[each_delivery['bowler']].Runs=bowler_economy[each_delivery['bowler']].Runs+each_delivery['total_runs'];
                        if(bowler_economy[each_delivery['bowler']].LastO!=each_delivery['over'])
                        {
                            bowler_economy[each_delivery['bowler']].Overs=bowler_economy[each_delivery['bowler']].Overs+1;
                            bowler_economy[each_delivery['bowler']].LastO=each_delivery['over'];
                        }
                        bowler_economy[each_delivery['bowler']].Economy=parseFloat(bowler_economy[each_delivery['bowler']].Runs/(bowler_economy[each_delivery['bowler']].Overs)).toFixed(2);
                    }
            }        
            else
            {
                bowler_economy[each_delivery['bowler']]={};
                bowler_economy[each_delivery['bowler']].Runs=each_delivery['total_runs'];
                bowler_economy[each_delivery['bowler']].LastO=each_delivery['over'];
                bowler_economy[each_delivery['bowler']].Overs=1;
                bowler_economy[each_delivery['bowler']].Economy=parseFloat(bowler_economy[each_delivery['bowler']].Runs/(bowler_economy[each_delivery['bowler']].Overs)).toFixed(2);           
            }        
        }
        return bowler_economy;
    },{});
    var Top_10_economy_bowlers = {}; var count=0;
    Object.keys(Economy_bolwers).sort(function(min, max){       
            return Economy_bolwers[min].Economy- Economy_bolwers[max].Economy;
        }).forEach(function(key) {
        if(count<=9)
            Top_10_economy_bowlers[key] = parseFloat(Economy_bolwers[key].Economy);     
            count++;
        }); 
    return Top_10_economy_bowlers;
}

var Json_data={
    matches_count_season:matches_count_season(),    
    team_win_count_season: team_win_count_season(),
    Extra_runs_team_2016: Extra_runs_team_2016(),
    Top_10_economy_bowlers:top_10_economy()
}

var fs = require('fs');
    fs.writeFile ("../front_end/allcharts_jsondata.json", JSON.stringify(Json_data,null,2), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );