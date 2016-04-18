CAMap = function(_parentElement, _map, _data){
  this.parentElement = _parentElement;
  this.usMap = _map;
  this.csvCA = _data;
  this.displayData = []; // unused right now could be useful for years though.

  // DEBUG RAW DATA
  //console.log(this.csvCA);
  //console.log(this.usMap);

  this.initVis();
}

/*=================================================================
* Initialize visualization (static content, e.g. SVG area or axes)
*=================================================================*/

CAMap.prototype.initVis = function(){
    var vis = this;

    vis.margin = {top: 30, right: 10, bottom: 10, left: 10};

    vis.width = 400 - vis.margin.left - vis.margin.right,
    vis.height = 700 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#ca-map").append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)

    vis.frame = vis.svg.append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    //Set colorscale range
    vis.colorScale = d3.scale.quantize()
        .range(colorbrewer.Purples[6]);

    //Define map projection
    //EITHER FIND CA MAP OR FIX ZOOM OR FILTER JSON OR SOMETHING!
    vis.projection = d3.geo.albersUsa()
        .translate([1100,350])
        .scale([3000]);

    //Define default path generator
    vis.path = d3.geo.path()
        .projection(vis.projection);

    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
}

/*=================================================================
* Data Wrangling
*=================================================================*/
CAMap.prototype.wrangleData = function(){
    var vis = this;

    //No data wrangling needed here for now

    // Update the visualization
    vis.updateVis();
}


/*=================================================================
 * The drawing function - should use the D3 update sequence 
 * Function parameters only needed if different kinds of updates are needed
*=================================================================*/

 CAMap.prototype.updateVis = function(){
    var vis = this;

    //get current keyVar value from dropdown
    vis.keyVar = d3.select("#stat-type2").property("value");

    //get current year value from slider
    vis.keyYear = parseInt(d3.select("#timeslide2").property("value"));
    console.log(vis.keyYear);

    // Convert TopoJSON to GeoJSON
    var usa = topojson.feature(vis.usMap, vis.usMap.objects.counties).features;

    //console.log(usa);
    //console.log(vis.csvCA);

    //Set up empty array and then push the relevent year objects into it
    var countyDataYear = [];
    for(var i = 0; i < vis.csvCA.length; i++ ) {
        if (vis.csvCA[i].year === vis.keyYear) {
            countyDataYear.push(vis.csvCA[i]);
        }
    }
    console.log(countyDataYear);

    //Create objects that can map to the county Fips code
    var keyById = {};
    countyDataYear.forEach(function(d) { 
        keyById[d.countyfip] = d[vis.keyVar];
    });
    console.log(keyById);

    //Color scale domain
    vis.colorScale.domain(
        d3.extent(d3.values(countyDataYear), function(d) { return d[vis.keyVar]; })
    );

    //Draw map
    var map = vis.frame.append("g")
        .attr("class", "counties")
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
        });

    //Draw boundries, for further use note that I have to set the .boundary class fill to none in css otherwise it messes up paths
    vis.frame.insert("path", ".graticule")
      .datum(topojson.mesh(vis.usMap, vis.usMap.objects.counties, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", vis.path);

    //JQuery to update Colors on dropdown change or timeslide change, pass in new value of dropdown selection and year
    $(document).ready(function() {

        $('#stat-type2').on('change', function() {
            vis.keyVar = this.value;
            vis.updateColors();
        });

        $('#timeslide2').on('change', function() {
            vis.keyYear = parseInt(this.value);
            $('#range2').text(vis.keyYear);
            vis.updateColors();
        });

    });

}

/*=================================================================
* Update Colors etc. with new keyVar/keyYear
*=================================================================*/
CAMap.prototype.updateColors = function(){
    var vis = this;
    console.log(vis.keyVar);
    console.log(vis.keyYear);

    //Set up empty array and then push the relevent year objects into it
    var countyDataYear = [];
    for(var i = 0; i < vis.csvCA.length; i++ ) {
        if (vis.csvCA[i].year === vis.keyYear) {
            countyDataYear.push(vis.csvCA[i]);
        }
    }
    console.log(countyDataYear);

    //Create objects that can map to the county Fips code
    var keyById = {};
    countyDataYear.forEach(function(d) { 
        keyById[d.countyfip] = d[vis.keyVar];
    });
    console.log(keyById);

    //Color scale domain
    vis.colorScale.domain(
        d3.extent(d3.values(countyDataYear), function(d) { return d[vis.keyVar]; })
    );

    //Update choropleth colors
    d3.select("g.counties")
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
