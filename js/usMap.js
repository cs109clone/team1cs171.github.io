USMap = function(_parentElement, _map, _data){
  this.parentElement = _parentElement;
  this.usMap = _map;
  this.csvUS = _data;
  this.displayData = []; // unused right now could be useful for years though.

  // DEBUG RAW DATA
  //console.log(this.csvUS);
  //console.log(this.usMap);

  this.initVis();
}

/*=================================================================
* Initialize visualization (static content, e.g. SVG area or axes)
*=================================================================*/

USMap.prototype.initVis = function(){
    var vis = this;

    vis.margin = {top: 30, right: 10, bottom: 10, left: 10};

    vis.width = /*1000*/ parseInt(document.getElementById("usa-map").clientWidth) - vis.margin.left - vis.margin.right;

    vis.height = 700 - vis.margin.top - vis.margin.bottom;

    //Allows map to resize////////////////////////////////////////
    //converted scale into variable called theScale & the vis.height variable is overridden
    var theScale;

    if (parseInt(getWidth()) <= 768) {

        theScale = 500;
        vis.height = 250;

    } else {
        theScale = 1200;
    }

    function getWidth() {
        if (self.innerWidth) {
            return self.innerWidth;
        }
        else if (document.documentElement && document.documentElement.clientHeight){
            return document.documentElement.clientWidth;
        }
        else if (document.body) {
            return document.body.clientWidth;
        }
        return 0;
    }

    //replaced width of 1000px with the width of the div (detected on page load) Note: the primary purpose is to resize for mobile
    //otherwise site look awkward and out of wack on mobile
    /////////////////////////////////////////////////////////////////////


    vis.svg = d3.select("#usa-map").append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)

    vis.frame = vis.svg.append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    //Set colorscale range
    vis.colorScale = d3.scale.quantize()
        .range(colorbrewer.Purples[6]);

    //Define map projection
    vis.projection = d3.geo.albersUsa()
        .translate([vis.width/2, vis.height/2])
        .scale([theScale]);

    //Define default path generator
    vis.path = d3.geo.path()
        .projection(vis.projection);

    //Initialize tooltip 
    vis.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0]); 

    vis.frame.call(vis.tip);  

    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
}

/*=================================================================
* Data Wrangling
*=================================================================*/
USMap.prototype.wrangleData = function(){
    var vis = this;

    //No data wrangling needed here for now

    // Update the visualization
    vis.updateVis();
}


/*=================================================================
 * The drawing function - should use the D3 update sequence 
 * Function parameters only needed if different kinds of updates are needed
*=================================================================*/

 USMap.prototype.updateVis = function(){
    var vis = this;

    //get current keyVar value from dropdown
    vis.keyVar = d3.select("#stat-type").property("value");

    //get current year value from slider
    vis.keyYear = parseInt(d3.select("#timeslide").property("value"));
    console.log(vis.keyYear);

    // Convert TopoJSON to GeoJSON
    var usa = topojson.feature(vis.usMap, vis.usMap.objects.states).features;

    //console.log(usa);
    //console.log(vis.csvUS);

    //Set up empty array and then push the relevent year objects into it
    var stateDataYear = [];
    for(var i = 0; i < vis.csvUS.length; i++ ) {
        if (vis.csvUS[i].year === vis.keyYear) {
            stateDataYear.push(vis.csvUS[i]);
        }
    }
    console.log(stateDataYear);

    //Create objects that can map to the state Fips code
    var keyById = {};
    var nameById = {};
    stateDataYear.forEach(function(d) { 
        keyById[d.statefip] = d[vis.keyVar];
        nameById[d.statefip] = d.state;
    });
    console.log(keyById);

    //Color scale domain
    vis.colorScale.domain(
        d3.extent(d3.values(stateDataYear), function(d) { return d[vis.keyVar]; })
    );

    //add tip function
    vis.tip.html(function(d) {
        return "<strong>State: </strong> <span>" + nameById[d.id]  + ///
        "<br/> <strong>Value: </strong> <span>" + keyById[d.id]  + "</span>";
    });

    //Draw map
    var map = vis.frame.append("g")
        .attr("class", "states")
        .selectAll("vis.path")
        .data(usa)
        .enter().append("path")
        .attr("d", vis.path)
        .style("fill", function(d) {
            if ( isNaN(keyById[d.id]) === true  ) {
                return "#ccc";
            } else {
                return vis.colorScale(keyById[d.id]); 
            }
        })
        .on('mouseover', vis.tip.show)
        .on('mouseout', vis.tip.hide);


    //Draw boundries, for further use note that I have to set the .boundary class fill to none in css otherwise it messes up paths
    vis.frame.insert("path", ".graticule")
      .datum(topojson.mesh(vis.usMap, vis.usMap.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", vis.path);

    //JQuery to update Colors on dropdown change or timeslide change, pass in new value of dropdown selection and year
    $(document).ready(function() {

        $('#stat-type').on('change', function() {
            vis.keyVar = this.value;
            vis.updateColors();
        });

        $('#timeslide').on('change', function() {
            vis.keyYear = parseInt(this.value);
            $('#range').text(vis.keyYear);
            vis.updateColors();
        });
    });
}

/*=================================================================
* Update Colors etc. with new keyVar/keyYear
*=================================================================*/
USMap.prototype.updateColors = function(){
    var vis = this;
    console.log(vis.keyVar);
    console.log(vis.keyYear);

    //Set up empty array and then push the relevent year objects into it
    var stateDataYear = [];
    for(var i = 0; i < vis.csvUS.length; i++ ) {
        if (vis.csvUS[i].year === vis.keyYear) {
            stateDataYear.push(vis.csvUS[i]);
        }
    }
    console.log(stateDataYear);

    //Create objects that can map to the state Fips code
    var keyById = {};
    var nameById = {};
    stateDataYear.forEach(function(d) { 
        keyById[d.statefip] = d[vis.keyVar];
        nameById[d.statefip] = d.state;
    });
    console.log(keyById);

    //Color scale domain
    vis.colorScale.domain(
        d3.extent(d3.values(stateDataYear), function(d) { return d[vis.keyVar]; })
    );

    //Update tip function
    vis.tip.html(function(d) {
        return "<strong>State: </strong> <span>" + nameById[d.id]  + ///
        "<br/> <strong>Value: </strong> <span>" + keyById[d.id]  + "</span>";
    });

    //Update choropleth colors
    d3.select("g.states")
        .selectAll("path")
        .transition()
        .duration(1000)
        .style("fill", function(d) { 
            if ( isNaN(keyById[d.id]) === true  ) {
                return "#ccc";
            } else {
                return vis.colorScale(keyById[d.id]); 
            }
        });
}


