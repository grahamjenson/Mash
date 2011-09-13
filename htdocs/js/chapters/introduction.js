$(document).ready( function() {

	createCounter();
	createIndustryChart();
});

function createIndustryChart() {
	var width = 480;
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
		$('.industry-hide').hide('fast');
		
		$('#industry-chart').empty();
		
		$('#side-container').animate({
			width: '+=50%'
		}, 300, function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(industries.completeList, 920, 520);		
		});	
		
	}, function() {
		$('.industry-hide').show('fast');

		$('#industry-chart').empty();		

		$('#side-container').animate({
			width: '-=50%'
		}, 300, function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(industries.filteredList, width, height);	
		});	
	});
}

function createCounter() {
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:1000, pace:50, auto:true});
	myCounter.incrementTo(Math.round(nz.gdppc()));
}