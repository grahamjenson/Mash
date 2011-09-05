function PieChart(container) {

	this.container = container;

	var chart;
	var pieData = [];
	var allData = [];
	var w, h, r, x, y, arc;
	var colour = d3.scale.category20();
	var donut = d3.layout.pie();
	var transitionSpeed = 1000;

	this.CreatePieChart = function(inputPieData, inputAllData, width, hieght) {

		pieData = inputPieData;
		allData = inputAllData;
		
		w = width;
		h = hieght;
		r = Math.min(w, h) / 2;
		arc = d3.svg.arc().outerRadius(r);


		chart = d3.select("#" + container)
		.append("svg:svg")
		//.data([pieData.sort(d3.descending)])
		.data([pieData])
		.attr("width", w)
		.attr("height", h);

		var arcs = chart.selectAll("g.arc")
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
		
		createLegend();

	};
	
	function createLegend() {
		//x = d3.scale.linear().domain([0, data.]).rangeRound([paddingWidth + 20, w + paddingWidth + 20]);
	    y = d3.scale.linear().domain([0, allData.length]).rangeRound([20, h]);
	    
	    var legend = chart.selectAll("g.bar")
		    .data(allData, function(d) { return d.name; })
		    .enter().append("svg:g")
		    .attr("class", "bar")
		    .attr("transform", function(d, i) { return "translate(" + (h + 15) + "," + y(i) + ")"; });
	    
	    legend.append("svg:rect")
		    .attr("fill", function(d, i) { return colour(i); })
		    .attr("width", 20)
		    .attr("height", 20);
	    
	    legend.append("svg:text")	    	
		    .attr("dx", 25)
		    .attr("dy", 13)
		    .attr("fill", "black")
		    .attr("text-anchor", "start")
		    .text(function(d, i) { 
		    	var returnString = '';
		    	var num = pieData[i] * 100;
		    	num = Math.round(num*Math.pow(10,2))/Math.pow(10,2);
		    	num = num.toString();
		    	if (num.indexOf('.') == 1) {
		    		num = '0' + num;
		    	} if (num.indexOf('.') == (num.length - 2)) {
		    		num += '0';
	    		}
		    	returnString += (num + '%: ' + d.name);
		    	return returnString; });
	   
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

}
