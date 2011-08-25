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
	    	.attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });
		
	    g.append("svg:circle")
	        .attr("class", "circles")
	        .attr('r', 0)
	        .attr("fill", function(d, i) { if (d.name == "New Zealand") { return 'green'; } else { return colour(i); } })
	        .style("opacity", function (d) { if (d.name == "New Zealand") { return .85; } else { return .25; } })
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1)
		    .transition()
		    .duration(transitionSpeed)
		    .attr("r",  function(d) { return z(d.gdppc); });		

		g.append("svg:text")
	        .attr("dy", ".35em")
	        .attr("text-anchor", "middle")
	        .style("opacity", 0)
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
		    .attr("class", "x-rule")
		    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
		
		rules.append("svg:line")
		    .attr("y1", h)
		    .attr("y2", h + 6)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", h + 9)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .text(x.tickFormat(10));
		
		rules.append("svg:line")
		    .attr("y1", 0)
		    .attr("y2", h)
		    .attr("stroke", "grey")
		    .attr("stroke-opacity", .2);
		
		rules = chart.selectAll("g.y-rule")
		    .data(y.ticks(yticks))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
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
		    .attr("stroke-opacity", .2);
	};
	
	this.redrawChart = function(width, height, newxticks, newyticks) {
		
		if (width < w) {
			shrink = true;
		} else {
			shrink = false;
		}
		w = width;
		h = height;
		xticks = newxticks;
		yticks = newyticks;
		
		if (shrink) {
			setTimeout(function() {
				d3.select("#" + container)
					.attr("width", w)
					.attr("height", h);
				
				chart.attr("width", w)
					.attr("height", h + paddinghieght);}, 1000);
		} else {
			d3.select("#" + container)
				.attr("width", w)
				.attr("height", h);
			
			chart.attr("width", w)
				.attr("height", h + paddinghieght);
		}

	};
	
	this.refreshData = function(newData) {
		data = newData;
		var zData = $.map(data, function(o){ return o.gdppc; });
		
		
		x = d3.scale.linear().domain([20000, 120000]).rangeRound([paddingwidth + (maxcirclesize / 1.5), w - (maxcirclesize / 2)]);
	    y = d3.scale.linear().domain([50, 32]).rangeRound([(maxcirclesize / 2), h - (maxcirclesize / 2)]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([mincirclesize, maxcirclesize]);
		
		
		var g = chart.selectAll("g")
        	.data(data, function(d) { return d.name; });
			

		
		g.transition()
			.duration(transitionSpeed)
	        .attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });

		
		if (shrink) {
			setTimeout(function() {
				chart.selectAll("line").remove();		
				chart.selectAll(".x-rule").remove();
				chart.selectAll(".y-rule").remove();
				addRules();
				addLines();}, 1000);
		} else {
			chart.selectAll("line").remove();		
			chart.selectAll(".x-rule").remove();
			chart.selectAll(".y-rule").remove();
			addRules();
			addLines();
		}		
	};	
}
