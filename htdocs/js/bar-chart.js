function BarChart(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var w, h, x, y;
	var paddingWidth = 150;
	var paddingTop = 0;
	var paddingBottom = 30;
	var paddingLeft = 252;
	var paddingRight = 15;
	var colour = d3.scale.category20();
	var transitionSpeed = 1000;
	
	this.createBarChart = function(dataInput, width, hieght, totalWorkforce) {
		
		data = dataInput;
		w = width;
	    h = hieght;
	    
	    var workers = $.map(data, function(d) { return d.workers; });
	    
	    //y = d3.scale.linear().domain([0, data.length]).range([paddingTop, h - paddingBottom]);
	    y = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([paddingTop, h - paddingBottom], .2);		
		x = d3.scale.linear().domain([(d3.min(workers)*.3), d3.max(workers)*1.05]).range([0, (w - paddingRight - paddingLeft)]);
		
		// The graph container
		chart = d3.select("#" + container)
		    .append("svg:svg")
			.attr("width", w)
		    .attr("height", h);
		
		var bars = chart.selectAll("g.bar")
		    .data(data, function(d) { return d.name; })
		    .enter().append("svg:g")
		    .attr("class", "bar")
		    .attr("transform", function(d, i) { return "translate(" + paddingLeft + "," + y(i) + ")"; });
		
		bars.append("svg:rect")
		    .style("fill", function(d, i) { return colour(i); })
		    .attr("width", function(d, i) { return x(d.workers); })
		    .attr("class", "workers")
		    .attr("height", y.rangeBand());
		
		bars.append("svg:text")
		    .attr("x", function(d, i) { return x(d.workers); })
		    .attr("y", y.rangeBand() / 2)
		    .attr("dx", -6)
		    .attr("dy", ".35em")
		    .attr("fill", "white")
		    .attr("text-anchor", "end")
		    .text(function(d, i) { return Math.round(d.workers); });

		bars.append("svg:text")
		    .attr("x", 0)
		    .attr("y", y.rangeBand() / 2)
		    .attr("dx", -6)
		    .attr("dy", ".35em")
		    .attr("text-anchor", "end")
		    .text(function(d, i) { return d.name; });
		
		var rules = chart.selectAll("g.rule")
		    .data(x.ticks(10))
		    .enter().append("svg:g")
		    .attr("class", "rule")
		    .attr("transform", function(d) { return "translate(" + (x(d) + paddingLeft) + ",0)"; });

		rules.append("svg:line")
		    .attr("y1", h)
		    .attr("y2", h + 6)
		    .attr("stroke", "black");
	
		rules.append("svg:line")
		    .attr("y1", paddingTop)
		    .attr("y2", h - paddingBottom)
		    .attr("stroke", "white")
		    .attr("stroke-opacity", .3);
	
		rules.append("svg:text")
		    .attr("y", h + 9)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .attr("fill", "black")
		    .text(x.tickFormat(10));
	
		chart.append("svg:line")
		    .attr("y1", paddingTop)
		    .attr("y2", h - paddingBottom)
		    .attr("x1", paddingLeft)
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
		
		chart.append("svg:line")
		    .attr("y1", h - paddingBottom)
		    .attr("y2", h - paddingBottom)
		    .attr("x1", paddingLeft)
		    .attr("x2", w - paddingRight)
		    .attr("stroke", "black");
			
		
	};
	
	this.rescale = function(inputData, width, hieght) {
		data = dataInput;
	    h = hieght;
		
		if (width < w) {
			w = width;			
			//shrink();
		} else {
			w = width;
			//expand();
		}
	};
	
	this.refresh = function(inputData) {
		data = inputData;
		refreshData();
	    
	};
	
	function refreshData() {	
		
		var g = chart.selectAll(".bar")
        	.data(data, function(d) { return d.name; });
		
		g.transition()
			.duration(transitionSpeed)
		    .attr("transform", function(d, i) { return "translate(" + paddingLeft + "," + y(i) + ")"; })
		    .attr("width", function(d, i) { return x(d.workers); });
		
	}

}