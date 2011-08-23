function PieChart(container) {
	
	this.container = container;
	
	var chart;
	var data = [];
	var w, h, r, x, y, arc;
	var colour = d3.scale.category20();
	var donut = d3.layout.pie();
	
	this.CreatePieChart = function(dataInput, width, hieght) {
		
		data = dataInput;
		data = d3.range(10).map(Math.random);
		w = width;
	    h = hieght;
	    r = Math.min(w, h) / 2;
	    arc = d3.svg.arc().outerRadius(r);
	    

	    var vis = d3.select("#" + container)
	      .append("svg:svg")
	        .data([data.sort(d3.descending)])
	        .attr("width", w)
	        .attr("height", h);
	    
	    var arcs = vis.selectAll("g.arc")
		    .data(donut)
		  .enter().append("svg:g")
		    .attr("class", "arc")
		    .attr("transform", "translate(" + r + "," + r + ")");
	    
	    var paths = arcs.append("svg:path")
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
	    
	};
	
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
	
}

