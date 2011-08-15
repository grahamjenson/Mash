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
	
	var mockGDP = [
	    {"country": "Luxembourg", "gdpPC": 108832, "avgHoursWorked": 1616, "avgWage": 52110},
	    {"country": "Norway", "gdpPC": 84444, "avgHoursWorked": 1414, "avgWage": 44164},
	    {"country": "Switzerland", "gdpPC": 67246, "avgHoursWorked": 1640, "avgWage": 49810},
	    {"country": "Canada", "gdpPC": 46215, "avgHoursWorked": 1702, "avgWage": 41961},
	    {"country": "Denmark", "gdpPC": 56147, "avgHoursWorked": 1559, "avgWage": 43190},
	    {"country": "Australia", "gdpPC": 55590, "avgHoursWorked": 1686, "avgWage": 42550},
	    {"country": "Sweden", "gdpPC": 48875, "avgHoursWorked": 1624, "avgWage": 36826},
	    {"country": "United States", "gdpPC": 47284, "avgHoursWorked": 1778, "avgWage": 52507},
	    {"country": "New Zealand", "gdpPC": 32145, "avgHoursWorked": 1758, "avgWage": 40111}];
	
	
	var data = d3.range(10).map(Math.random);
	
	bargraph = new BarGraph('bar-graph');
	bargraph.SetData(mockData);
	bargraph.CreateBarGraph();
	
	var bubbleChart = new BubbleChart('bubble-chart');
	bubbleChart.CreateBubbleChart(mockGDP, 600, 400);
	
	
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

function BubbleChart(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var x, y, w, h;
	
	this.CreateBubbleChart = function(data, w, h) {
		this.data = data;
		this.w = w;
		this.h = h;
		
		var xData = $.map(data, function(o){ return o.avgWage; });
		var yData = $.map(data, function(o){ return o.avgHoursWorked; });
		var zData = $.map(data, function(o){ return o.gdpPC; });
		
		x = d3.scale.linear().domain([d3.min(xData), d3.max(xData)]).rangeRound([65, w - 65]);
	    y = d3.scale.linear().domain([d3.min(yData), d3.max(yData)]).rangeRound([65, h - 65]);
		z = d3.scale.ordinal().domain([d3.min(zData), d3.max(zData)]).range([40, 60]);
		
		chart = d3.select("#" + container)
			.append("svg:svg")
			.attr("width", w)
			.attr("height", h)
			.attr("id", "d3-" + container)
			.attr("class", "chart");
	
		
		var g = chart.selectAll("g")
	        .data(data)
	      .enter().append("svg:g")
	    	.attr("transform", function(d) { return "translate(" + x(d.avgWage) + "," + y(d.avgHoursWorked) + ")"; });
		
		g.append("svg:circle")
	      .attr("class", "little")
	      .attr("r",  function(d) { return z(d.gdpPC); });
		

		g.append("svg:text")
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text(function(d, i) { return d.country; });
		
		chart.append("svg:line")
	    .attr("y1", 0)
	    .attr("y2", h)
	    .attr("stroke", "black");
		
		chart.append("svg:line")
	    .attr("x1", 0)
	    .attr("y1", h)
	    .attr("x2", w)
	    .attr("y2", h)

	    .attr("stroke", "black");
		
		
	};
	
	this.SetData = function(x) {
		data = x;
	};
	
	this.GetData = function(x) {
		return data;
	};
	
	
}