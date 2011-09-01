function BubbleChart(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var paddingwidth = 50;
	var paddinghieght = 20;
	var maxcirclesize = 60;
	var mincirclesize = 20;
	var colour = d3.scale.category20();
	var transitionSpeed = 1000;
	var yticks = 7;
	var xticks = 7;
	var x, y, z, w, h;
	
	this.CreateBubbleChart = function(dataInput, width, hieght) {
		data = dataInput;
		
		w = width;
		h = hieght;
		
		var xData = $.map(data, function(o){ return o.wage; });
		var yData = $.map(data, function(o){ return o.work; });
		var zData = $.map(data, function(o){ return o.gdppc; });
		
		
		x = d3.scale.linear().domain([20000, 120000]).rangeRound([paddingwidth + (maxcirclesize / 1.5), w - (maxcirclesize / 2)]);
	    y = d3.scale.linear().domain([50, 32]).rangeRound([(maxcirclesize / 2), h - (maxcirclesize / 2)]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([mincirclesize, maxcirclesize]);
		
		chart = d3.select("#" + container)
			.append("svg:svg")
			.attr("width", w)
			.attr("height", h + paddinghieght)
			.attr("id", "d3-" + container)
			.attr("class", "chart");	
		
		var g = chart.selectAll("g")
	        .data(data)
	      .enter().append("svg:g")
	      	.attr("class", "circles-g")
	    	.attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });
		
	    g.append("svg:circle")
	        .attr("class", "circles")
	        .attr('r', 0)
	        .attr("fill", function(d, i) { if (d.name == "New Zealand") { return 'black'; } else { return colour(i); } })
	        .style("opacity", function (d) { if (d.name == "New Zealand") { return .85; } else { return .25; } })
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1)
		    .transition()
		    .duration(transitionSpeed)
		    .attr("r",  function(d) { return z(d.gdppc); });		

		g.append("svg:text")
			.attr("class", "circles-text")
	        .attr("dy", ".35em")
	        .attr("text-anchor", "middle")
	        .style("opacity", 0)
	        .attr("fill", function(d) { if (d.name == "New Zealand") { return 'white'; } else { return 'black'; } })
	        .text(function(d, i) { return d.name; })
	        .transition()
		    .duration(transitionSpeed + 500)
		    .style("opacity", 1);
		
		addLines(1000);
		addRules();
	};
	
	function addLines(speed) {
		chart.append("svg:line")
			.attr("stroke", "black")
			.attr("x1", paddingwidth)
		    .attr("y1", h)
		    .attr("y2", h)
		    .attr("x2", paddingwidth)
		    .attr("class", "y-axis")
		    .transition()
			.duration(speed)
		    .attr("y1", 0);
		
		chart.append("svg:line")
		    .attr("x1", paddingwidth)
		    .attr("y1", h)
		    .attr("x2", paddingwidth)
		    .attr("y2", h)
		    .attr("stroke", "black")
		    .attr("class", "x-axis")
		    .transition()
			.duration(speed)
			.attr("x2", w);
	};
	
	 function addRules(speed) {
		var rules = chart.selectAll("g.x-rule")
		    .data(x.ticks(xticks))
		    .enter().append("svg:g")
		    .attr("class", "x-rule-g")
		    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
		
		rules.append("svg:line")
		    .attr("y1", h)
		    .attr("y2", h + 6)
		    .attr("class", "x-rule-line")
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", h + 9)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .attr("class", "x-rule-text")
		    .text(x.tickFormat(10));
		
		rules.append("svg:line")
		    .attr("y1", 0)
		    .attr("y2", h)
		    .attr("stroke", "grey")
		    .attr("class", "x-rule")
		    .attr("stroke-opacity", .2);
		
		rules = chart.selectAll("g.y-rule")
		    .data(y.ticks(yticks))
		    .enter().append("svg:g")
		    .attr("class", "y-rule-g")
		    .attr("transform", function(d) { return "translate(0, " + y(d) + ")"; });
		
		rules.append("svg:line")
		    .attr("x1", paddingwidth - 5)
		    .attr("x2", paddingwidth)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", 0)
		    .attr("dy", ".3em")
		    .attr("x", paddingwidth - 20)
		    .attr("text-anchor", "middle")
		    .text(y.tickFormat(10));
		
		rules.append("svg:line")
		    .attr("x1", paddingwidth)
		    .attr("x2", w)
		    .attr("stroke", "grey")
		    .attr("class", "y-rule")
		    .attr("stroke-opacity", .2);
	};
	
	this.rescale = function(width, height, newData) {
		data = newData;
		h = height;
		
		if (width < w) {
			w = width;			
			shrink();
		} else {
			w = width;
			expand();
		}

	};
	
	this.refresh = function(newData) {
		transitionSpeed = 1;
		data = newData;
		refreshData();
		transitionSpeed = 1000;
	};
	
	function shrink() {
		var zData = $.map(data, function(o){ return o.gdppc; });		
		
		x = d3.scale.linear().domain([20000, 120000]).rangeRound([paddingwidth + (maxcirclesize / 1.5), w - (maxcirclesize / 2)]);
	    y = d3.scale.linear().domain([50, 32]).rangeRound([(maxcirclesize / 2), h - (maxcirclesize / 2)]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([mincirclesize, maxcirclesize]);
		
		refreshData();	
		refreshAxis();
		
		setTimeout(function() {
			d3.select("#" + container)
				.transition()
				.duration(transitionSpeed)
				.attr("width", w)
				.attr("height", h);
			
			chart.transition()
				.duration(transitionSpeed)
				.attr("width", w)
				.attr("height", h + paddinghieght);}, 1000);
	}
	
	function expand() {
		var xData = $.map(data, function(o){ return o.wage; });
		var yData = $.map(data, function(o){ return o.work; });
		var zData = $.map(data, function(o){ return o.gdppc; });		
		
		x = d3.scale.linear().domain([d3.min(xData), d3.max(xData)]).rangeRound([paddingwidth + ((maxcirclesize + 40) / 2.9), w - ((maxcirclesize + 40) / 1)]);
	    y = d3.scale.linear().domain([d3.max(yData), d3.min(yData)]).rangeRound([((maxcirclesize + 40) / 2), h - ((maxcirclesize + 40) / 2)]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([mincirclesize, (maxcirclesize + 40)]);
		
		d3.select("#" + container)
			.attr("width", w)
			.attr("height", h);
	
		chart.attr("width", w)
			.attr("height", h + paddinghieght);
		refreshAxis();
		refreshData();
		
	}
	
	function refreshData() {	
		
		var g = chart.selectAll(".circles-g")
        	.data(data, function(d) { return d.name; });
		
		g.transition()
			.duration(transitionSpeed)
	        .attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });
		
		g.enter().insert("svg:g")
	        .attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; })
	        .attr("class", "new-circles-g circles-g");		
		
		var newPoints = chart.selectAll(".new-circles-g");
		
		newPoints.append("svg:circle")
	        .attr("class", "circles")
	        .attr('r', 0)
	        .attr("fill", function(d, i) { return colour(i); })
	        .style("opacity", .25)
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1)
		    .transition()
		    .duration(transitionSpeed)
		    .attr("r",  function(d) { return z(d.gdppc); });
		
		newPoints.append("svg:text")
			.attr("class", "circles-text")
	        .attr("dy", ".35em")
	        .attr("text-anchor", "middle")
	        .style("opacity", 0)
	        .text(function(d, i) { return d.name; })
	        .transition()
		    .duration(transitionSpeed + 500)
		    .style("opacity", 1);
		
		g.exit()
			.transition()
		    .duration(transitionSpeed)
		    .style("opacity", 0)
		    .attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; })
		    .remove();
		
		
		chart.selectAll(".circles")
			.transition()
			.duration(transitionSpeed)
			.attr("r",  function(d) { return z(d.gdppc); });		

		
			
	};	
	
	function refreshAxis() {
		chart.selectAll(".x-axis")
			.transition()
			.duration(transitionSpeed)
			.attr("y1", h)
			.attr("y2", h)
			.attr("x2", w);
		
		chart.selectAll(".y-axis")
			.transition()
			.duration(transitionSpeed)
			.attr("y2", h);
		
		chart.selectAll(".x-rule-g")
			.transition()
			.duration(transitionSpeed)
		    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
		
		chart.selectAll(".x-rule-line")
			.transition()
			.duration(transitionSpeed)
		    .attr("y1", h)
		    .attr("y2", h + 6);
		
		chart.selectAll(".x-rule-text")
			.transition()
			.duration(transitionSpeed)
		    .attr("y", h + 9);
		
		chart.selectAll(".x-rule")
		    .transition()
			.duration(transitionSpeed)
		    .attr("y2", h);
		
		chart.selectAll(".y-rule-g")
		    .transition()
			.duration(transitionSpeed)
		    .attr("transform", function(d) { return "translate(0, " + y(d) + ")"; });
		
		chart.selectAll(".y-rule")
		    .transition()
			.duration(transitionSpeed)
		    .attr("x2", w);
	

	}
}
