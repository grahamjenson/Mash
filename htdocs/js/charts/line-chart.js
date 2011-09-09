function LineChart(container) {
	
	this.container = container;
	
	var x, y1, y2, h, w;
	var data;

	var paddingLeft = 85;
	var paddingTop = 20;
	var transitionSpeed = 1000;
	var chart;
	var line = d3.svg.line().interpolate('basis');
	var points;
	var oilColour = '#00C12B';
	var coalColour = '#FFAA00';
	var metalColour = '#8805A8';
	
	this.CreateLineChart = function(dataInput, width, hieght) {
		data = dataInput;
		w = width;
		h = hieght;
		
		var coal = $.map(data, function(d) { return d.coal; });
		var oil = $.map(data, function(d) { return d.oil; });
		var metal = $.map(data, function(d) { return d.metal; });
		
		var min = d3.min([d3.min(coal), d3.min(oil), d3.min(metal)]);
		var max = d3.max([d3.max(coal), d3.max(oil), d3.max(metal)]);
		
		x = d3.scale.linear().domain([0, data.length - 1]).rangeRound([paddingLeft, w - 2]);
	    y = d3.scale.linear().domain([max, min]).rangeRound([0 + 15, h - paddingTop]);
	     
	    chart = d3.select("#" + this.container)
			.append("svg:svg")
			.attr("width", w)
			.attr("height", h)
			.attr("id", "d3-" + this.container)
			.attr("class", "chart");	
	    
	    points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].coal)]; });
	    
	    chart.append("svg:path")
		    .data([points])
		    .transition()
			.duration(transitionSpeed)
		    .attr("class", "coal-path")
		    .style("fill", 'none')
		    .style("stroke", coalColour)
		    .style("stroke-width", 5)
		    .attr("d", line);
		
		 points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].oil)]; });
		    
		 chart.append("svg:path")
		 	 .data([points])
		     .transition()
			 .duration(transitionSpeed)
			 .attr("class", "oil-path")
			 .style("fill", 'none')
			 .style("stroke", oilColour)
			 .style("stroke-width", 5)
			 .attr("d", line);
		 
		 points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].metal)]; });
		    
		 chart.append("svg:path")
		 	 .data([points])			 
		     .transition()
			 .duration(transitionSpeed)
			 .attr("class", "metal-path")
			 .style("fill", 'none')
			 .style("stroke", metalColour)
			 .style("stroke-width", 5)
			 .attr("d", line);



		addLines();
		addRules();
		
	};
	
	this.refresh = function(dataInput) {
		data = dataInput;
		
		var coal = $.map(data, function(d) { return d.coal; });
		var oil = $.map(data, function(d) { return d.oil; });
		var metal = $.map(data, function(d) { return d.metal; });
		
		var min = d3.min([d3.min(coal), d3.min(oil), d3.min(metal)]);
		var max = d3.max([d3.max(coal), d3.max(oil), d3.max(metal)]);
		
		x = d3.scale.linear().domain([0, data.length - 1]).rangeRound([paddingLeft, w - 2]);
	    y = d3.scale.linear().domain([max, min]).rangeRound([0 + 15, h - paddingTop]);
		
		points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].coal)]; });
	    
	    var coal = chart.selectAll(".coal-path")
		    .data([points]);
	    
	    
		coal.transition()
			.duration(transitionSpeed)
		    .attr("d", line);
		
		coal.enter()
			.append("svg:path")
			.transition()
			.duration(transitionSpeed)
			.attr("class", "coal-path")
		    .style("fill", 'none')
		    .style("stroke", coalColour)
		    .style("stroke-width", 5)
		    .attr("d", line);
		
		coal.exit()
			.transition()
			.duration(transitionSpeed)
			.remove();
		
		points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].oil)]; });
	    
	    var coal = chart.selectAll(".oil-path")
		    .data([points]);
	    
	    
		coal.transition()
			.duration(transitionSpeed)
		    .attr("d", line);
		
		coal.enter()
			.append("svg:path")
			.transition()
			.duration(transitionSpeed)
			.attr("class", "oil-path")
		    .style("fill", 'none')
		    .style("stroke", oilColour)
		    .style("stroke-width", 5)
		    .attr("d", line);
		
		coal.exit()
			.transition()
			.duration(transitionSpeed)
			.remove();
		
		points = d3.range(0, data.length).map(function(i) { return [x(i), y(data[i].metal)]; });
	    
	    var coal = chart.selectAll(".metal-path")
		    .data([points]);
	    
	    
		coal.transition()
			.duration(transitionSpeed)
		    .attr("d", line);
		
		coal.enter()
			.append("svg:path")
			.transition()
			.duration(transitionSpeed)
			.attr("class", "metal-path")
		    .style("fill", 'none')
		    .style("stroke", metalColour)
		    .style("stroke-width", 5)
		    .attr("d", line);
		
		coal.exit()
			.transition()
			.duration(transitionSpeed)
			.remove();
		
		transitionRules();
		
	};
	
	
	function addRules() {
				
		var rules = chart.selectAll("y-rule")
		    .data(y.ticks(8))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(0, " + (y(d)) + ")"; });
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft - 5)
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
				
		rules.append("svg:text")
		    .attr("y", 0)
		    .attr("dy", ".3em")
		    .attr("x", paddingLeft - 45)
		    .attr("text-anchor", "middle")
		    .attr("style", "fill: black")
		    .text(y.tickFormat(10));		
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("x2", w + paddingLeft)
		    .attr("stroke", "grey")
		    .attr("stroke-opacity", .2);
		
		
		var rules = chart.selectAll("x-rule")
		    .data(x.ticks(12))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(" + (x(d)) + ", 0)"; });
		
		rules.append("svg:line")
		    .attr("y1", (h - paddingTop))
		    .attr("y2", (h - paddingTop) + 5)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("x", 0)
		    .attr("dy", ".3em")
		    .attr("y", h - 5)
		    .attr("text-anchor", "middle")
		    .attr("style", "fill: black")
		    .text(function (d, i) { return data[d].year; });	
		
	}
	
	function addLines() {
		chart.append("svg:line")
			.attr("x1", paddingLeft)
		    .attr("y1", 0)
		    .attr("y2", (h - paddingTop))
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
		
		chart.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("y1", (h - paddingTop))
		    .attr("x2", w + paddingLeft)
		    .attr("y2", (h - paddingTop))
		    .attr("stroke", "black");
		
	}
	
	function transitionRules() {
		
    	chart.selectAll('.y-rule')
			.remove();
		
    	var rules = chart.selectAll("y-rule")
    		.data(y.ticks(8))
		    .enter().append("svg:g")	    
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(0, " + (y(d)) + ")"; });
		
		rules.append("svg:line")
			.transition()
    		.duration(transitionSpeed)
		    .attr("x1", paddingLeft - 5)
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
				
		rules.append("svg:text")
			.transition()
    		.duration(transitionSpeed)
		    .attr("y", 0)
		    .attr("dy", ".3em")
		    .attr("x", paddingLeft - 45)
		    .attr("text-anchor", "middle")
		    .attr("style", "fill: black")
		    .text(y.tickFormat(10));		
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("x2", w + paddingLeft)
		    .attr("stroke", "grey")
		    .attr("stroke-opacity", .2);
		
		chart.selectAll("x-rule")
			.remove();
		
		var rules = chart.selectAll("x-rule")
		    .data(x.ticks(12))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(" + (x(d)) + ", 0)"; });
		
		rules.append("svg:line")
			.transition()
    		.duration(transitionSpeed)
		    .attr("y1", (h - paddingTop))
		    .attr("y2", (h - paddingTop) + 5)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
			.transition()
    		.duration(transitionSpeed)
		    .attr("x", 0)
		    .attr("dy", ".3em")
		    .attr("y", h - 5)
		    .attr("text-anchor", "middle")
		    .attr("style", "fill: black")
		    .text(function (d, i) {	return data[d].year; });	

	}
	
	
	
}