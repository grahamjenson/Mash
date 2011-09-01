function StackedBarChart(container) {

	var container = container;
	
	var chart;
	var data = [];
	var grade;
	var w, h, x, y;
	var paddingTop = 25;
	var paddingBottom = 25;
	var paddingLeft = 60;
	var paddingRight = 15;
	var colour = d3.scale.category20();
	var duration = 1000;
	
	this.createStackedBarChart = function(dataInput, width, height) {
		
		data = dataInput;		
		w = width;
	    h = height;
	    var barWidth = (w - (paddingLeft + paddingRight)) / (data.length + 3);
	    var workers = $.map(data, function(d) { return d.workers; });
	    
		x = d3.scale.linear().domain([0, data.length]).range([(0 + paddingLeft + 5), (w - paddingRight)]);
		y = d3.scale.linear().domain([0, d3.max(workers)]).range([(0 + paddingTop), (h - paddingBottom)]);
		yrules = d3.scale.linear().domain([d3.max(workers), 0]).range([(0 + paddingTop), (h - paddingBottom)]);
				
		chart = d3.select("#" + container)
		 	.append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
		
		addLines();
		addTicks();
		 
		 var g = chart.selectAll("g.layers")
		      .data(data)
		    .enter().append("svg:g")		      
		      .attr("class", "layer")
		      .attr("transform", function(d, i) { return "translate(" + (x(i)) + ", " + (h - y(d.workers)) + ")"; });
		 
		 g.append("svg:rect")
		 	.attr("height", 0)
		 	.attr("width", barWidth)
		 	.style("fill", function(d, i) { return colour(i); })
		 	.transition()
		 	.duration(duration)		    
		    .attr("height", function(d, i) { return y(d.workers) - (paddingTop + 1); });
		 
		 g.append("svg:rect")
		 	.attr("height", 0)
		 	.attr("width", barWidth)
		 	.style("fill", 'black')
		 	.transition()
		 	.duration(duration)		    
		    .attr("height", function(d, i) { return y(d.tourismWorkers) - (paddingTop + 1); });
		 
			// Functions to draw and transition the x axis labels
/*			var label = chart.selectAll(".x-label")
				.data(data, function(d, i) { return d.name; });
		
			label.enter().append("svg:text")
				.attr("class", "x-label flip")
				.attr("x", function(d, i) { return x(i); })
				.attr("y", 0)				
				.attr("dx", barWidth * .5)
				.attr("dy", "1em")
				.attr("transform", function(d, i) { return "translate(0, 0) rotate(90 " + (x(i)) + " " + paddingTop + ")"; })
				.attr("text-anchor", "left")
				.text(function(d) { return d.name; });*/
		 		
	};
	
	function addLines() {
		chart.append("svg:line")
			.attr("x1", 0 + paddingLeft)
		    .attr("y1", 0 + paddingTop)
		    .attr("y2", h - paddingBottom)
		    .attr("x2", 0 + paddingLeft)
		    .attr("stroke", "black");
		
		chart.append("svg:line")
		    .attr("x1", 0 + paddingLeft)
		    .attr("y1", h - paddingBottom)
		    .attr("x2", w - paddingRight)
		    .attr("y2", h - paddingBottom)
		    .attr("stroke", "black");
	}
	
	function addTicks() {
		var rules = chart.selectAll("y-rule")
		    .data(y.ticks(8))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(0, " + yrules(d) + ")"; });
	
		rules.append("svg:line")
		    .attr("x1", paddingLeft - 5)
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("x2", (w - paddingRight))
		    .attr("stroke", "grey")
		    .attr("stroke-opacity", .3);
		
		rules.append("svg:text")
		    .attr("y", 0)
		    .attr("dy", ".3em")
		    .attr("x", paddingLeft - 20)
		    .attr("text-anchor", "middle")
		    .attr("font-size", ".8em")
		    .text(y.tickFormat(8));		
	}
	
	function redraw() {
		
		// Functions to draw and transition the x axis labels
		var label = chart.selectAll(".x-label")
			.data(data, function(d, i) { return d.name; });
	
		label.enter().append("svg:text")
			.attr("class", "x-label")
			.attr("x", function(d, i) { return x(i); })
			.attr("y", h + 2)
			.attr("transform", function(d, i) { return "translate(" + textTranslate + ", 0) rotate(-45 " + (x(i)) + " " + h + ")"; })
			.attr("dx", barWidth * .5)
			.attr("dy", "1em")
			.attr("style", "font-size: .7em; fill: black;")
			.attr("text-anchor", "middle")
			.text(function(d) { return d.name; });

	

	}
	
}