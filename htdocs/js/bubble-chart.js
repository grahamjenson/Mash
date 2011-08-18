function BubbleChart(container) {

	this.container = container;
	
	var chart;
	var data = [];
	var x, y, z, w, h;
	
	this.CreateBubbleChart = function(dataInput, width, hieght) {
		data = dataInput;
		w = width;
		h = hieght;
		
		var xData = $.map(data, function(o){ return o.wage; });
		var yData = $.map(data, function(o){ return o.work; });
		var zData = $.map(data, function(o){ return o.gdppc; });
		var fill = d3.scale.category20c();
		
		x = d3.scale.linear().domain([d3.min(xData), d3.max(xData)]).rangeRound([65, w - 65]);
	    y = d3.scale.linear().domain([d3.max(yData), d3.min(yData)]).rangeRound([65, h - 65]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([35, 60]);
		
		chart = d3.select("#" + container)
			.append("svg:svg")
			.attr("width", w + 50)
			.attr("height", h + 20)
			.attr("id", "d3-" + container)
			.attr("class", "chart")
			.attr("transform", "translate(50,0)");;
	
		
		var g = chart.selectAll("g")
	        .data(data)
	      .enter().append("svg:g")
	    	.attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });
		
		this.addRules();
		
	    g.append("svg:circle")
	        .attr("class", "little")
	        .attr("r",  function(d) { return z(d.gdppc); })
	        .style("fill", function(d) { if (d.name == "New Zealand") { return 'green'; } else { return fill(d.name); } })
	        .style("opacity", function (d) { if (d.name == "New Zealand") { return .75; } else { return .25; } });
		

		g.append("svg:text")
	        .attr("dy", ".35em")
	        .attr("text-anchor", "middle")
	        .text(function(d, i) { return d.name; });
		
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
	
	this.addRules = function() {
		var rules = chart.selectAll("g.x-rule")
		    .data(x.ticks(10))
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
		
/*		var rules = chart.selectAll("g.y-rule")
		    .data(y.ticks(10))
		    .enter().append("svg:g")
		    .attr("class", "y-rule")
		    .attr("transform", function(d) { return "translate(0, " + y(d) + ")"; });
		
		rules.append("svg:line")
		    .attr("x1", 45)
		    .attr("x2", 50)
		    .attr("stroke", "black");
		
		rules.append("svg:text")
		    .attr("y", 0)
		    .attr("dy", ".71em")
		    .attr("text-anchor", "middle")
		    .text(y.tickFormat(10));*/
	};
	
	this.rescaleChart = function(width, height) {
		w = width;
		h = height;
		
		d3.select("#" + container)
			.attr("width", w)
			.attr("height", h);
		
		chart.attr("width", w)
			.attr("height", h);
		
		chart.selectAll("g.x-rule")
			.remove();
		this.addRules();
		
		var lines = chart.selectAll("x-rule");
		
		chart.selectAll("line")
			.remove();
		
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
		
		this.refreshData(data);
	};
	
	this.refreshData = function(data) {
		
		var xData = $.map(data, function(o){ return o.wage; });
		var yData = $.map(data, function(o){ return o.work; });
		var zData = $.map(data, function(o){ return o.gdppc; });
		
		x = d3.scale.linear().domain([d3.min(xData), d3.max(xData)]).rangeRound([65, w - 65]);
	    y = d3.scale.linear().domain([d3.max(yData), d3.min(yData)]).rangeRound([65, h - 65]);
		z = d3.scale.log().domain([d3.min(zData), d3.max(zData)]).range([35, 60]);
		
		var transitionSpeed = 1000;
		var g = chart.selectAll("g")
        	.data(data);
		
		g.transition()
			.duration(transitionSpeed)
	        .attr("transform", function(d) { return "translate(" + x(d.wage) + "," + y(d.work) + ")"; });
		
	        
		var circles = chart.selectAll("circle");
		
		circles.transition()
			.duration(transitionSpeed)
	        .attr("r",  function(d) { return z(d.gdppc); });
		
		
	};
	
	this.SetData = function(x) {
		data = x;
	};
	
	this.GetData = function(x) {
		return data;
	};
	
	
}