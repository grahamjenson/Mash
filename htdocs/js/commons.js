$(document).ready( function() {
	var mockData = [
	    {"industry": "Forestry and mining", "value": .5},
	    {"industry": "Manufacturing", "value": .7},
	    {"industry": "Energy, water, and waste services", "value": .3},
	    {"industry": "Construction", "value": .34},
	    {"industry": "Wholesale trade", "value": .44},
	    {"industry": "Retail trade", "value": .6},
	    {"industry": "Accommodation and food services", "value": .6},
	    {"industry": "Transport, postal, and warehousing", "value": .9}];
	
	var data = d3.range(10).map(Math.random);
	
	bargraph = new BarGraph('bar-graph');
	bargraph.SetData(mockData);
	bargraph.CreateBarGraph();
});

function BarGraph(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var h, w, x, y;
	
	this.CreateBarGraph = function() {
		
		var w = 800,
	    h = 230,
	    //x = d3.scale.linear().domain([0, 1]).range([0, w - 150]);
	    y = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([0, h], .2),
		
		//var splicedArray = $.map(data, function(o){ return o.value; });
		x = d3.scale.linear().domain([0, 1]).range([0, w - 150]);
		
		// The graph container
		chart = d3.select("#" + container)
		    .append("svg:svg")
			.attr("class", "chart")
			.attr("id", "d3-" + container)
			.attr("width", w + 40)
		    .attr("height", h + 20)
			.append("svg:g")
			.attr("transform", "translate(175,0)");
		
		var bars = chart.selectAll("g.bar")
		    .data(data)
		    .enter().append("svg:g")
		    .attr("class", "bar")
		    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
		
		bars.append("svg:rect")
		    .attr("fill", "steelblue")
		    .attr("width", function(d, i) { return x(d.value); })
		    .attr("height", y.rangeBand());
		
		bars.append("svg:text")
		    .attr("x", function(d, i) { return x(d.value); })
		    .attr("y", y.rangeBand() / 2)
		    .attr("dx", -6)
		    .attr("dy", ".35em")
		    .attr("fill", "white")
		    .attr("text-anchor", "end")
		    .text(function(d, i) { return d.value * 100 + '%'; });

		bars.append("svg:text")
		    .attr("x", 0)
		    .attr("y", y.rangeBand() / 2)
		    .attr("dx", -6)
		    .attr("dy", ".35em")
		    .attr("text-anchor", "end")
		    .text(function(d, i) { return d.industry; });
		
		var rules = chart.selectAll("g.rule")
		    .data(x.ticks(10))
		    .enter().append("svg:g")
		    .attr("class", "rule")
		    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });

		rules.append("svg:line")
		    .attr("y1", h)
		    .attr("y2", h + 6)
		    .attr("stroke", "black");
	
		rules.append("svg:line")
		    .attr("y1", 0)
		    .attr("y2", h)
		    .attr("stroke", "white")
		    .attr("stroke-opacity", .3);
	
		rules.append("svg:text")
		    .attr("y", h + 9)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .text(x.tickFormat(10));
	
		chart.append("svg:line")
		    .attr("y1", 0)
		    .attr("y2", h)
		    .attr("stroke", "black");
			
		
	};
	
	this.RefreshGraph = function() {
		
	};
	
	this.SetData = function(x) {
		data = x;
	};
	
	this.GetData = function(x) {
		return data;
	};

}