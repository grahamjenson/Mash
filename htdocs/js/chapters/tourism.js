$(document).ready( function() {
	
	var title = 'Can we make New Zealand Richer by increasing Tourism?';
	
	var text = 'The problem with increasing toursim is that in general it lowers our average wage, \
		plus it will not scale enough to increase our GDP whilst maintaining our clean green image.\
		Use the slider below to increase the amount of annual tourists in New Zealand:\
		&nbsp;<span style="float: right; text-align: right; padding-top: 7px;"><b>Annual Tourists: </b><b id="current-tourists"></b></span>';
	
	var subtitle1 = 'Regional Tourism Levels: (Tourists/Avail. Accomodation)';
	var subtitle2 = 'Workers per Industry / Tourist Workers per Industry';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p style='padding-bottom: 10px'>" + text + "</p>\
				<div class='clear'></div>\
				<div id='tourist-slider'></div>\
			    <div id='tourist-slider-legend'></div>\
			    <p style='text-align:center; padding-top:5px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	$("<div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>\
			 <div id='industry-stacked-chart-title' class='state-container'><p style='text-align:center;'><b>" + subtitle2 + "</b><br /></p><div>\
			 <div id='industry-stacked-chart' class='state-container'></div>").insertAfter('#main-container');
	
	
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
	var x = d3.scale.log().domain([0.01, 1]).range([50000, 9000000]).nice();
	var xrule = d3.scale.linear().domain([0.01, 1]).range([25, 443]);

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
	
	var data = [x.invert(50000), x.invert(6000000), x.invert(7000000), x.invert(8000000),  x.invert(9000000)];
	
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
	var width = 660;
	var height = 220;

	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Financial and Insurance Services', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Public Administration and Safety'];
	var industries = getIndustryWorkersForDisplay(industryFilter);
	
	// Sort the filtered mutlidemensional array in a decending order.
	industries.filteredList.sort(function(a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
	industries.completeList.sort(function(a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
	
	var stackedBarChart = new BarChart('industry-stacked-chart');
	stackedBarChart.createBarChart(industries.filteredList, width, height, industries.totalWorkers);	
	nz.addListener(function() {			
		industries = getIndustryWorkersForDisplay(industryFilter);
		stackedBarChart.refresh(industries.filteredList);
	});
}