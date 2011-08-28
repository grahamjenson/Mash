function StackedBarChart(container) {

	var container = container;
	
	var chart;
	var data = [];
	var grade;
	var w, h, x, y;
	var paddingTop = 25;
	var paddingBottom = 25;
	var paddingLeft = 30;
	var paddingRight = 25;
	var color = d3.interpolateRgb("#339900", "#FF0000");
	var duration = 1000;
	
	this.createBarChart = function(dataInput, width, height) {
		
		data = dataInput;		
		w = width;
	    h = height;
	    var min = parseInt(data.min);
	    var max = parseInt(data.max);
	    var maxCluster = parseInt(data.maxCluster);
	    var noOfStudents = parseInt(data.studentCount);
	    var barWidth = (w - (paddingLeft + paddingRight)) / (data.distinctGrades + 20);
	    
		x = d3.scale.linear().domain([100, min]).range([(0 + paddingLeft), (w - paddingRight)]);
		y = d3.scale.linear().domain([0, maxCluster]).range([(0 + paddingTop), (h - paddingBottom)]);
		yrules = d3.scale.linear().domain([maxCluster, 0]).range([(0 + paddingTop), (h - paddingBottom)]);

		
		console.log(data.getGradeCount(100, 50));
		
		 chart = d3.select("#" + container)
		 	.append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
		 
		 addLines();
		 addTicks();
		 
		 var g = chart.selectAll("g.layers")
		      .data(data.grades)
		    .enter().append("svg:g")		      
		      .attr("class", "layer")
		      .attr("transform", function(d, i) { return "translate(" + (x(d.grade) - barWidth) + ", " + (h - y(d.count)) + ")"; });
		 
		 g.append("svg:rect")
		 	.attr("height", 0)
		 	.attr("width", barWidth)
		 	.style("fill", function(d, i) { return color(grade(d.grade)); })
		 	.transition()
		 	.duration(duration)		    
		    .attr("height", function(d, i) { return y(d.count) - (paddingTop + 1); });
		 
		 /*var dist = chart.selectAll("g.dist")
		     .data(data.guidelines)
		     .enter().append("svg:g")		      
		     .attr("class", "dist")
		     .attr("transform", function(d, i) { return "translate(" + (x(d.start)) + ", " + (h - y(data.getGradeCount(d.start, d.cutoff))) + ")"; });
		 
		 dist.append("svg:rect")
		 	.attr("height", 0)
		 	.attr("width", function(d, i) { return (x(d.cutoff) - x(d.start + 1)); })
		 	.style("fill", function(d, i) { return color(grade(d.start)); })
		 	.transition()
		 	.duration(duration)		    
		    .attr("height", function(d, i) { return y(data.getGradeCount(d.start, d.cutoff)) - (paddingTop + 1); });*/
		 

		
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
		
		rules = chart.selectAll("x-rule")
		    .data(x.ticks(10))
		    .enter().append("svg:g")
		    .attr("class", "x-rule")
		    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
	
		rules.append("svg:line")
		    .attr("y1", (h - paddingBottom))
		    .attr("y2", (h - paddingBottom) + 5)
		    .attr("stroke", "black");
		
		rules.append("svg:line")
		    .attr("y1", paddingTop)
		    .attr("y2", (h - paddingBottom))
		    .attr("stroke", "grey")
		    .attr("stroke-opacity", .3);
	
		rules.append("svg:text")
		    .attr("y", (h - paddingBottom) + 20)
		    .attr("dy", ".3em")
		    .attr("x", 0)
		    .attr("text-anchor", "middle")
		    .attr("font-size", ".8em")
		    .text(x.tickFormat(10));
		
	}
	
}