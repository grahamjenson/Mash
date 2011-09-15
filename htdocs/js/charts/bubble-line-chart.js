function BubbleLineChart(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var paddingTop = 6;
	var paddingBottom = 25;
	var paddingLeft = 50;
	var paddingRight = 6;

	var transitionSpeed = 1000;
	var yticks = 8;
	var xticks = 3;
	var x, y, z, w, h, c;
	
	this.CreateBubbleLineChart = function(companies, width, hieght) {
		companies = companies;
		
		w = width;
		h = hieght;
		
		var xData = $.map(companies, function(o){ return o.revenue; });
		var yData = $.map(companies, function(o){ return o.workers; });
	
		
		
		x = d3.scale.log().domain([d3.min(xData), d3.max(xData)]).rangeRound([paddingLeft, w - paddingRight]);
	    y = d3.scale.log().domain([d3.max(yData), d3.min(yData)]).rangeRound([paddingTop, h - paddingBottom]);
		c = companies.length;
		
		chart = d3.select("#" + container)
			.append("svg:svg")
			.attr("width", w)
			.attr("height", h)
			.attr("id", "d3-" + container)
			.attr("class", "chart");	
		
		tooltip = d3.select("body")
			.append("div")
			.attr('class', 'tool-tip-div')
			.style("position", "absolute")
			.style("z-index", "10")
			.style("visibility", "hidden")
			.style('background', 'white')
			.style('padding', '2px')
			.style('border', 'thin solid black')
			.text("");
		
		var g = chart.selectAll("g")
	        .data(companies)
	      .enter().append("svg:g")
	      	.attr("class", "circles-g")
	    	.attr("transform", function(d) { return "translate(" + x(d.revenue) + "," + y(d.workers) + ")"; });
		
	    g.append("svg:circle")
	        .attr("class", function(d, i) { return "circles company-" + i; })
	        .attr('r', 0)
	        .attr("fill", function (d, i) { if (d.type == 'normal') return 'steelblue'; else if (d.type == 'other') { return 'orangered'; } else { return 'yellow'; }})
	        .style("opacity", '1' )
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1)
		    .transition()
		    .duration(transitionSpeed)
		    .attr("r",  5);		
	    
		
		addLines(1000);
		addRules();
		
		setTimeout(function() { 
			g.on("mouseover", fadeOut)
				.on("mouseout", fadeIn)
				.on("mousemove", moveToolTip); 
			}, h > 500 ? 4000 : 3000);
		 
		createLegend();
	};
	
	function createLegend() {

		var circleSize = 5;
		var width = 250;
		var height = 60;
		
		
		var data = ['10 Top Technology Companies', 'Major New Zealand Companies', 'Pseudo Companies', 'Top International Companies'];
		
		var y = d3.scale.linear().domain([0, data.length]).rangeRound([0, height]);
		
		var legendChart = d3.select("#" + container + '-legend')
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height);
		
		var legend = legendChart.selectAll("g.barlegends")
		    .data(data)
		    .enter().append("svg:g")
		    .attr("transform", function(d, i) { return "translate(0" + "," + y(i) + ")"; });
		
		legend.append("svg:circle")
		    .style("fill", function (d, i) { if (i == 0) { return 'steelblue'; } else if(i == 1) { return 'orangered'; } else if(i == 2) { return 'green'; } else if(i == 3) { return 'yellow'; }})
		    .attr("r", circleSize)
		    .attr("transform", "translate(" + (width - 40) + ",10)")
		    .style("opacity", '1' )
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1);

	    legend.append("svg:text")	    	
		    .attr("dx", width - 50)
		    .attr("dy", 13)
		    .attr("fill", "black")
		    .attr("text-anchor", "end")
		    .text(String);    	
	}
	
	function addLines() {
		chart.append("svg:line")
			.attr("stroke", "black")
			.attr("x1", paddingLeft)
		    .attr("y1", h - paddingBottom)
		    .attr("y2", h - paddingBottom)
		    .attr("x2", paddingLeft)
		    .attr("class", "y-axis")
		    .transition()
			.duration(transitionSpeed)
		    .attr("y1", 0);
		
		chart.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("y1", h - paddingBottom)
		    .attr("x2", paddingLeft)
		    .attr("y2", h - paddingBottom)
		    .attr("stroke", "black")
		    .attr("class", "x-axis")
		    .transition()
			.duration(transitionSpeed)
			.attr("x2", w - paddingRight);
	};
	
	 function addRules(speed) {
		var rules = chart.selectAll("g.x-rule")
		    .data(x.ticks(xticks).filter(function(d, i) { if (i % 3 == 0) return d; else if (i > 26) return d; }))
		    .enter().append("svg:g")
		    .attr("class", "x-rule-g")
		    .attr("transform", function(d, i) { return "translate(" + x(d) + ",0)"; });
		
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
		    .text(function (d) { return d.toExponential(); });
		
		rules.append("svg:line")
		    .attr("y1", 0)
		    .attr("y2", (h - paddingBottom))
		    .attr("stroke", "grey")
		    .attr("class", "x-rule")
		    .attr("stroke-opacity", .2);
		
		var rules = chart.selectAll("g.y-rule")
		    .data(y.ticks(yticks).filter(function(d, i) { if (i % 2 == 0) return d; else if (i > 15) return d; }))
		    .enter().append("svg:g")
		    .attr("class", "y-rule-g")
		    .attr("transform", function(d, i) { return "translate(0, " + y(d) + ")"; });
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft - 5)
		    .attr("x2", paddingLeft)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", 0)
		    .attr("dy", ".3em")
		    .attr("x", paddingLeft - 20)
		    .attr("text-anchor", "middle")
		    .text(function(d, i) { return d;});
		
		rules.append("svg:line")
		    .attr("x1", paddingLeft)
		    .attr("x2", w - paddingRight)
		    .attr("stroke", "grey")
		    .attr("class", "y-rule")
		    .attr("stroke-opacity", .2);
	};
	
	this.rescale = function(width, height, newData) {
		companies = newData;
		h = height;
		
		var g = chart.selectAll("g")
			.on("mouseover", function() {} )
			.on("mouseout", function() {});
		
		chart.selectAll(".circles")
	      	.transition()
	        .style("opacity", .25);
	    
	    chart.selectAll(".circles-text")
	      	.transition()
	        .style("opacity", 1);
	    
	    chart.selectAll(".nz")
	      	.transition()
	        .style("opacity", .85);
		
		if (width < w) {
			w = width;			
			shrink();
		} else {
			w = width;
			expand();
		}

	};
	
	this.refresh = function(newData) {		
		companies = newData;
		refreshData();
		
	};
	
	function shrink() {
		var zData = $.map(data, function(o){ return o.gdppc; });		
		
		x = d3.scale.log().domain([40000, 120000]).rangeRound([paddingwidth + (maxcirclesize / 1.5), w - (maxcirclesize / 2)]);
	    y = d3.scale.log().domain([50, 32]).rangeRound([(maxcirclesize / 2), h - (maxcirclesize / 2)]);
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
		
		chart.selectAll(".circles")
			.transition()
			.duration(transitionSpeed)
			.attr("r",  function(d) { return z(d.workers * nz.nzrevpworker()); });
	}
	
	function expand() {
		var xData = $.map(data, function(o){ return o.revenue; });
		var yData = $.map(data, function(o){ return o.workers; });
		var zData = $.map(data, function(o){ return o.workers * nz.nzrevpworker(); });	
		
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
        	.data(companies, function(d) { return d.name; });
		
		var newGroups = g.enter().insert("svg:g")
	        .attr("transform", function(d) { return "translate(" + x(d.revenue) + "," + y(d.workers) + ")"; })
	        .attr("class", "circles-g");	
		
		newGroups.append("svg:circle")			
	        .attr("class", function(d, i) { return "circles company-" + (i + c); })
	        .attr('r', 0)
	        .attr("fill", 'green')
	        .style("opacity", '1' )
	        .style("stroke", 'grey')
		    .style("stroke-opacity", 1)
		    .transition()
		    .duration(transitionSpeed)
		    .attr("r",  5);	
		
		g.exit()
		    .remove();		

		g.on("mouseover", fadeOut)
			.on("mouseout", fadeIn)
			.on("mousemove", moveToolTip); 
			
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
	
	/** Returns an event handler for fading a given chord group. */
	function fadeOut(g, i) {
	 
	    chart.selectAll(".circles")
	      	.transition()
	        .style("opacity", .1);
	   
	    chart.selectAll(('.company-' + i))
	    	.transition()
	    	.style("opacity", 1);
	    
	    $('.tool-tip-div').html('<b>' + g.name + '</b><p>Number of Employees: ' + 
	    		thousands(Math.round(g.workers)) + '<br />Revenue: $' + 
	    		thousands(Math.round(g.revenue)) + '</p>');
		tooltip.style("visibility", "visible");
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeIn(g, i) {
	  
	    chart.selectAll(".circles")
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
