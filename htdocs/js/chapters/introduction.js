$(document).ready( function() {

	createCounter();
	createIndustryChart();
});

function createIndustryChart() {
	var width = 600;
	var height = 235;
	
	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Financial and Insurance Services', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Wholesale Trade', 'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Public Administration and Safety', 'Arts and Recreation Services and Other Services'];
	var industries = getIndustryWorkersForDisplay(industryFilter);
	industries.filteredList.push(industries.other);
	
	// Map percentages to hand to the pie chart, makes easier to do out here with the count of people.
	// Sort the filtered mutlidemensional array in a decending order.
	industries.filteredList.sort(function(a, b) { return ((b.workers < a.workers) ? -1 : ((b.workers > a.workers) ? 1 : 0)); });
	industries.completeList.sort(function(a, b) { return ((b.workers < a.workers) ? -1 : ((b.workers > a.workers) ? 1 : 0)); });
	filteredPieData = $.map(industries.filteredList, function(d) { return d.workers / industries.totalWorkers; });
	completePieData = $.map(industries.completeList, function(d) { return d.workers / industries.totalWorkers; });
	
	var pieChart = new PieChart('industry-chart');
	pieChart.CreatePieChart(industries.filteredList, width, height);	
	
	// Create the resizing event on click, use whole dataset for large graph
	$('#industry-chart').toggle( function() {	
		$('#gdp-container').hide('slow');
		$('#main-container').hide('slow');
		$('#current-chapter').hide();
		$('#industry-chart').empty();
		$('#industry-chart').css('width', '920px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(industries.completeList, 920, 520);				
		}, 400);		
	}, function() {
		$('#gdp-container').show('slow');
		$('#main-container').show('slow');
		$('#current-chapter').show();
		$('#industry-chart').empty();
		
		$('#industry-chart').css('width', '600px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(industries.filteredList, width, height);
			
		}, 300);	
	});
}

function createCounter() {
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:1000, pace:50, auto:true});
	myCounter.incrementTo(Math.round(nz.gdppc()));
}