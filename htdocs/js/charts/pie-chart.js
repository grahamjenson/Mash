function PieChart(container) {

	this.container = container;

	var chart;
	var pieData = [];
	var data = [];
	var w, h, r, x, y, arc;
	var colour = d3.scale.category20();
	var donut = d3.layout.pie().value(function (d){ return (d.workers * d.gdppc) / nz.gdp(); });
	var transitionSpeed = 1000;
	var legend;

	this.CreatePieChart = function(inputData, width, hieght) {		
		data = inputData;
		pieData = donut(data);
		
		w = width;
		h = hieght;
		r = Math.min(w, h) / 2;
		arc = d3.svg.arc().outerRadius(r);
		

		chart = d3.select("#" + container)
			.append("svg:svg")
			.attr("width", w)
			.attr("height", h);

		var arcs = chart.selectAll("g.arc")
			.data(pieData)
			.enter().append("svg:g")
			.attr("class", "arc")
			.attr("transform", "translate(" + r + "," + r + ")");			
			

		var paths = arcs.append("svg:path")
			.attr('class', function(d, i) { return 'paths pie-index-' + i; })
			.attr("fill", function(d, i) { return colour(i); });

		paths.transition()
			.ease("bounce")
			.duration(2000)
			.attrTween("d", tweenPie);

		paths.transition()
			.ease("elastic")
			.delay(function(d, i) { return 2000 + i * 50; })
			.duration(750)
			.attrTween("d", tweenDonut);
		
		chart.append("svg:text")
			.attr('class', 'percentage')
			.attr("transform", "translate(" + r + "," + (r + 5) + ")")
			.attr("fill", "black")
		    .attr("text-anchor", "middle")
		    .attr("font-size", "2em")
			.text('');
		
		createLegend();
		
		setTimeout(function() { 
			arcs.on("mouseover", fadeOut)
				.on("mouseout", fadeIn); 
			
			legend.on("mouseover", fadeOut)
			.on("mouseout", fadeIn); 
			}, h > 500 ? 4000 : 3000);

	};
	
	function createLegend() {
		//x = d3.scale.linear().domain([0, data.]).rangeRound([paddingWidth + 20, w + paddingWidth + 20]);
	    y = d3.scale.linear().domain([0, data.length]).rangeRound([20, h]);
	    
	    legend = chart.selectAll("g.bar")
		    .data(pieData, function(d) { return d.name; })
		    .enter().append("svg:g")
		    .attr("class", "bar")
		    .attr("transform", function(d, i) { return "translate(" + (h + 15) + "," + y(i) + ")"; });
	    
	    legend.append("svg:rect")
		    .attr("fill", function(d, i) { return colour(i); })
		    .attr('class', function(d, i) { return 'rect pie-index-' + i; })
		    .attr("width", 20)
		    .attr("height", 20);
	    
	    legend.append("svg:text")	    	
		    .attr("dx", 25)
		    .attr("dy", 13)
		    .attr("fill", "black")
		    .attr("text-anchor", "start")
		    .attr('class', function(d, i) { return 'text pie-index-' + i; })
		    .text(function(d, i) {return d.data.name.slice(0, 39); });
	   
	}
	
	function tweenPie(b) {
		b.innerRadius = 0;
		var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
		return function(t) {
			return arc(i(t));
		};
	}

	function tweenDonut(b) {
		b.innerRadius = r * .6;
		var i = d3.interpolate({innerRadius: 0}, b);
		return function(t) {
			return arc(i(t));
		};
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeOut(g, i) {
	 
	    chart.selectAll(".paths")
	      	.transition()
	        .style("opacity", .3);
	    
	    chart.selectAll(".rect")
	      	.transition()
	        .style("opacity", .3);
	    
	    chart.selectAll(".text")
	      	.transition()
	        .style("opacity", .3);
	  
	    chart.selectAll(('.pie-index-' + i))
	    	.transition()
	    	.style("opacity", 1);
	    
	    chart.selectAll('.percentage')
	    	.text(Math.round(g.value * 100) + '%');
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeIn(g, i) {
	  
	    chart.selectAll(".paths")
	      	.transition()
	        .style("opacity", 1);
	    
	    chart.selectAll(".rect")
	      	.transition()
	        .style("opacity", 1);
	    
	    chart.selectAll(".text")
	      	.transition()
	        .style("opacity", 1);
	    
	    chart.selectAll('.percentage')
    	.text('');
	 
	}

}

