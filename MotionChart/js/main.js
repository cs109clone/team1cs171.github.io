/**
 * Created by Billy on 2016-04-17.
 */

var csvUS;
console.log(csvUS);

//Call load data
loadData();

// Load JSON + CSV files
function loadData() {

    // Use the Queue.js library to read in a csv file
    queue()
        .defer(d3.csv, "data/stateInequality.csv")
        .await(function(error, csvUS){

            // Convert strings to numeric and create variables for US Data
            //console.log(csvUS);
            csvUS.forEach(function(d){

                // Convert numeric values to 'numbers'
                d.year                 = +d.year;
                d.statefip             = +d.statefip;
                d.realIncWage          = +d.realIncWage;
                d.gini                 = +d.gini;
                d.pctTechnicalWorker   = +d.pctTechnicalWorker;
                d.pctFemaleWorker = +d.pctFemaleWorker;
                d.unemployementRate    = +d.unemployementRate;
                d.realIncWageRat90_10  = +d.realIncWageRat90_10;
                d.realIncWageRat_cg_hs = +d.realIncWageRat_cg_hs;
                d.laborSupply_hl       = +d.laborSupply_hl;
                d.fmWageRate  =+d.fmWageRate;


            });

        

            //Pass in processed data here
      //      createVis(usMap, caMap, csvUS, csvCA);
        });

    console.log(csvUS);
};