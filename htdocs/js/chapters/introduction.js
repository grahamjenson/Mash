$(document).ready( function() {

	createCounter();
	createIndustryChart();
	createTourismStackedBarChart();
});

function createIndustryChart() {
	var width = 480;
	var height = 235;
	
	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Education and Training', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Administrative and Support Services', 'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Health Care and Social Assistance', 'Arts and Recreation Services and Other Services'];
	var industries = getIndustryWorkersForDisplay(industryFilter);
	industries.filteredList.push(industries.other);
	
	// Map percentages to hand to the pie chart, makes easier to do out here with the count of people.
	// Sort the filtered mutlidemensional array in a decending order.
	industries.filteredList.sort(function(a, b) { return (((b.workers * b.gdppc) < (a.workers * a.gdppc)) ? -1 : (((b.workers * b.gdppc) > (a.workers * a.gdppc)) ? 1 : 0)); });
	industries.completeList.sort(function(a, b) { return (((b.workers * b.gdppc) < (a.workers * a.gdppc)) ? -1 : (((b.workers * b.gdppc) > (a.workers * a.gdppc)) ? 1 : 0)); });
	
	filteredPieData = $.map(industries.filteredList, function(d) { return d.workers / industries.totalWorkers; });
	completePieData = $.map(industries.completeList, function(d) { return d.workers / industries.totalWorkers; });
	
	var pieChart = new PieChart('industry-chart');
	pieChart.CreatePieChart(industries.filteredList, width, height);	
	
	// Create the resizing event on click, use whole dataset for large graph
	$('#resize-industry-chart').button({ icons: {primary: "ui-icon-arrow-4-diag"} });
	$('#resize-industry-chart').toggle( function() {	
		$('.industry-hide').hide('fast');
		$('#resize-industry-chart span').html('Minimize');
		$('#industry-chart').empty();
		
		$('#side-container').animate({
			width: '+=50%'
		}, 300, function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(industries.completeList, 920, 520);		
		});	
		
	}, function() {
		$('.industry-hide').show('fast');
		$('#resize-industry-chart span').html('Maximize');
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