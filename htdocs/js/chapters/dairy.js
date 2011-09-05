function dairy() {
	var title = 'So we\'re good at Dairy, why not do more of that?';
	var text = '(Under Development) Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef. \
		<span style="float: right; text-align: right; padding-top: 7px;"><b>Cows in New Zealand: </b><b id="current-cows"></b></span>';
	var subtitle1 = 'Regional Cow Densisty: (Cows per land<sup>2</sup>)';
	var subtitle2 = 'Workers per Industry / Dairy Workers per Industry';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p style='padding-bottom: 20px'>" + text + "</p>\
				<div id='cow-slider'></div>\
				<div id='cow-slider-legend'></div>\
			    <p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	$("<div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>\
			 <div id='industry-stacked-chart-title' class='state-container'><p style='text-align:center;'><b>" + subtitle2 + "</b><br /></p><div>\
			 <div id='industry-stacked-chart' class='state-container'></div>").insertAfter('#main-container');
	createDairySlider();
	createDairyMap();
	//createTourismStackedBarChart();
}

function createDairyMap() {
	var nzGeography = new NZGeograhpy('nz-map');
	nzGeography.createMap(300, 350);
	nzGeography.createDairyLegend('nz-map-legend', 170, 75);
	nzGeography.refreshDairy(nz);
	nz.addListener(function() {			
		nzGeography.refreshDairy(nz);
	});
}

function createDairySlider() {
	var x = d3.scale.log().domain([0.01, 1]).range([5848000, 11000000]).nice();
	var xrule = d3.scale.linear().domain([0.01, 1]).range([25, 443]);

	$('#cow-slider').slider({
		min: .01,
		max: 1,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			try {
				nz.setCows(x(ui.value));
			} catch (e) {
				
			}
		}
	});
	$('#cow-slider').slider({ value: x.invert(nz.tourists) });
	$('#current-cows').html(thousands(Math.round(nz.totaldairycattle)));
	var chart = d3.select("#cow-slider-legend")
	    .append("svg:svg")
		.attr("width", 468)
	    .attr("height", 25);
	
	var data = [x.invert(5848000), x.invert(9000000), x.invert(10000000), x.invert(11000000)];
	
	var rules = chart.selectAll("g.rule")
	    .data(data)
	    .enter().append("svg:g")
	    .attr("transform", function(d) { return "translate(" + xrule(d) + ",0)"; });
	
	rules.append("svg:line")
	    .attr("y1", 0)
	    .attr("y2", 5)
	    .attr("stroke", "black");
	
	rules.append("svg:text")
	    .attr("y", 10)
	    .attr("dy", ".71em")
	    .attr("text-anchor", "middle")
	    .text(function(d) { return thousands(Math.round(x(d))); });
	
}