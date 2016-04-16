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
        .range(colorbrewer.Blues[6]);

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

    //Filter data  to 2014
    vis.countyData = vis.csvCA.filter(function (value, index) {
            return (value.year === 2014);
    });
    //console.log(vis.countyData);

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
    var keyVar = d3.select("#stat-type").property("value");
    console.log(keyVar);


    // Convert TopoJSON to GeoJSON
    var usa = topojson.feature(vis.usMap, vis.usMap.objects.counties).features;

    //console.log(usa);
    console.log(vis.countyData);

    //Create objects that can map to the state Fips code
    var keyById = {};
    vis.countyData.forEach(function(d) { 
        keyById[d.countyfip] = d[keyVar];
    });
    console.log(keyById);

    //Color scale domain
    vis.colorScale.domain(
        d3.extent(d3.values(vis.countyData), function(d) { return d[keyVar]; })
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

    //JQuery to update Colors on dropdown change, pass in new value of dropdown selection
    $(document).ready(function() {

        $('#stat-type').on('change', function() {
            var keyVar = this.value;
            vis.updateColors (keyVar);
        });
    });

}

/*=================================================================
* Update Colors etc. with new keyVar
*=================================================================*/
CAMap.prototype.updateColors = function(keyVar){
    var vis = this;

    console.log(keyVar);
    //Create objects that can map to the state Fips code
    var keyById = {};
    vis.countyData.forEach(function(d) { 
        keyById[d.countyfip] = d[keyVar];
    });

    console.log(keyById);

    //Color scale domain with new keyVar
    vis.colorScale.domain(
        d3.extent(d3.values(vis.countyData), function(d) { return d[keyVar]; })
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
