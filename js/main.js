/**
 * Created by eaofxr on 4/14/16.
 */
// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2000, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
        $('.navbar-toggle:visible').click();
    }
});

//Call load data
loadData();

// Load JSON + CSV files
function loadData() {

    // Use the Queue.js library to read in three files
    queue()
        .defer(d3.json, "data/us.json")
        .defer(d3.csv, "data/stateInequality.csv")
        .defer(d3.csv, "data/caInequality.csv")
        .await(function(error, usMap, csvUS, csvCA){

            // Convert strings to numeric and create variables for US Data
            //console.log(csvUS);
            csvUS.forEach(function(d){

                // Convert numeric values to 'numbers'
                d.gini                 = +d.gini;
                d.realIncWage          = +d.realIncWage;
                d.pctTechnicalWorker   = +d.pctTechnicalWorker;
                d.unemployementRate    = +d.unemployementRate;
                d.realIncWageRat90_10  = +d.realIncWageRat90_10
                d.laborSupply_hl       = +d.laborSupply_hl;
                d.realIncWageRat_cg_hs = +d.realIncWageRat_cg_hs;
                d.year                 = +d.year;
                d.statefip             = +d.statefip;
            });

            // Convert strings to numeric and create variables for CA Data
            //console.log(csvCA);
            csvCA.forEach(function(d){

                // Convert numeric values to 'numbers'
                d.gini                 = +d.gini;
                d.realIncWage          = +d.realIncWage;
                d.pctTechnicalWorker   = +d.pctTechnicalWorker;
                d.unemployementRate    = +d.unemployementRate;
                d.realIncWageRat90_10  = +d.realIncWageRat90_10
                d.laborSupply_hl       = +d.laborSupply_hl;
                d.realIncWageRat_cg_hs = +d.realIncWageRat_cg_hs;
                d.year                 = +d.year;
                d.countyfip            = +d.countyfip;
            });

            //Create second json file for CA vis. I think there was an issue with both vis objects trying to hit the
            //same json file, not sure though.
            var caMap = usMap;

            //Pass in processed data here
            createVis(usMap, caMap, csvUS, csvCA);
        });
};


function createVis(usMap, caMap, csvUS, csvCA) {

    // Create object instances
    //console.log(csvUS);
    var usMap = new USMap("usa-map", usMap, csvUS);

    //console.log(csvCA);
    var caMap = new CAMap("ca-map", caMap, csvCA);
}


