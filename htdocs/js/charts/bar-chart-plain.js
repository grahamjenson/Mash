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
	var transitionSpeed = 500;
	var tooltip;
	
	this.createBarChart = function(dataInput, width, hieght, totalWorkforce) {
		
		data = dataInput;
		w = width;
	    h = hieght;
	    
	    var workers = $.map(data, function(d) { return d.workers; });
	    
	    y = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([paddingTop, h - paddingBottom], .2);		
		x = d3.scale.linear().domain([0, d3.max(workers)*1.05]).range([0, (w - paddingRight - paddingLeft)]);
		
		// The graph container
		chart = d3.select("#" + container)
		    .append("svg:svg")
			.attr("width", w)
		    .attr("height", h);
		
		tooltip = d3.select("body")
			.append("div")
			.attr('class', 'tool-tip-div-2')
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")
			.style('background', 'white')
			.style('padding', '2px')
			.style('border', 'thin solid black')
			.text("");
		
		var bars = chart.selectAll("g.bar")
		    .data(data, function(d) { return d.name; })
		    .enter().append("svg:g")
		    .attr("class", "bar")
		    .attr("transform", function(d, i) { return "translate(" + paddingLeft + "," + y(i) + ")"; });
		
		bars.append("svg:rect")
		    .style("fill", function(d, i) { return colour(i); })
		    .attr("width", function(d, i) { return x(d.workers); })
		    .attr("class", function(d, i) { return 'workers industry-' + i; })
		    .attr("height", y.rangeBand());
		
		bars.append("svg:text")
		    .attr("x", 0)
		    .attr("y", y.rangeBand() / 2)
		    .attr("dx", -6)
		    .attr("dy", ".35em")
		    .attr("class", function(d, i) { return 'workers industry-' + i; })
		    .attr("text-anchor", "end")
		    .text(function(d, i) { return d.name; });
		
		var rules = chart.selectAll("g.rule")
		    .data(x.ticks(8))
		    .enter().append("svg:g")
		    .attr("class", "rule")
		    .attr("transform", function(d) { return "translate(" + (x(d) + paddingLeft) + ",0)"; });
		
		rules.append("svg:line")
		    .attr("y1", h - paddingBottom)
		    .attr("y2", (h - paddingBottom) + 6)
		    .attr("class", "x-rule-line")
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", (h - paddingBottom) + 9)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .attr("class", "x-rule-text")
		    .text(x.tickFormat(8));

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
		
		setTimeout(function() { 
			bars.on("mouseover", fadeOut)
				.on("mouseout", fadeIn)
				.on("mousemove", moveToolTip); 
			}, h > 500 ? 1000 : 500);
			
		
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
		
		chart.selectAll(".workers")
			.transition()
			.duration(transitionSpeed)
	    	.attr("width", function(d, i) { return x(d.workers); });
		
		chart.selectAll(".tourismWorkers")
			.transition()
			.duration(transitionSpeed)
			.attr("width", function(d, i) { return x(d.tourism_dist*nz.totaltourismworkers()); });
				
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeOut(g, i) {
	 
	    chart.selectAll(".workers")
	      	.transition()
	        .style("opacity", .1);
	   
	    chart.selectAll(('.industry-' + i))
	    	.transition()
	    	.style("opacity", 1);
	    
	    $('.tool-tip-div-2').html('<b>' + g.name + '</b><p>Number of Workers: ' + 
	    		thousands(Math.round(g.workers)) + '<br />Average Annual Wage: $' + 
	    		thousands(Math.round(g.wage)) + '<br />Average Hours Worked per Week: ' +
	    		Math.round(g.work) + '<br />Industry GDP Per Capita: $' +
	    		thousands(Math.round(g.gdppc)) + '</p>');
		tooltip.style("visibility", "visible");
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeIn(g, i) {
	  
	    chart.selectAll(".workers")
	      	.transition()
	        .style("opacity", 1);
	    
	    tooltip.style("visibility", "hidden");
	}
	
	function moveToolTip(g, i) {	
		var event = d3.event;
		tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
		return;
	}


}
