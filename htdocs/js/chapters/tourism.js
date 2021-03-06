$(document).ready( function() {
	createTourismSlider();
	createTourismMap();
	createTourismStackedBarChart();
});

function createTourismMap() {
	var nzGeography = new NZGeograhpy('nz-map');
	nzGeography.createMap(300, 350);
	nzGeography.createTourismLegend('nz-map-legend', 170, 75);
	nzGeography.refreshTourism(nz);
	nz.addListener(function() {			
		nzGeography.refreshTourism(nz);
	});
}

function createTourismSlider() {
	var x = d3.scale.pow().domain([0.01, 1]).range([2499102, 9000000]).nice();
	var xrule = d3.scale.linear().domain([0.01, 1]).range([30, 443]);

	$('#tourist-slider').slider({
		min: .01,
		max: 1,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			try {
				nz.setTourists(x(ui.value));
			} catch (e) {
				
			}
		}
	});
	$('#tourist-slider').slider({ value: x.invert(nz.tourists) });
	$('#current-tourists').html(thousands(Math.round(nz.tourists)));
	var chart = d3.select("#tourist-slider-legend")
	    .append("svg:svg")
		.attr("width", 468)
	    .attr("height", 25);
	
	var data = [x.invert(2500000), x.invert(5000000), x.invert(7000000),  x.invert(9000000)];
	
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

function createTourismStackedBarChart() {
	var width = 960;
	var height = 420;

	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Financial and Insurance Services', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Public Administration and Safety'];
	var industries = getIndustryWorkersForDisplay(industryFilter);
	
	// Sort the filtered mutlidemensional array in a decending order.
	industries.filteredList.sort(function(a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
	industries.completeList.sort(function(a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
	
	var stackedBarChart = new BarChart('industry-stacked-chart');
	stackedBarChart.createBarChart(industries.completeList, width, height, industries.totalWorkers);	
	nz.addListener(function() {			
		industries = getIndustryWorkersForDisplay(industryFilter);
		stackedBarChart.refresh(industries.filteredList);
	});
}