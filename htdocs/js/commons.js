var nz = new NewZealand();
var world = new World();
var OECDBubbleChart = new BubbleChart('bubble-chart');
var oecdStats = [];

var currentState = 0;
var STATES = [
    {name: 'intro', title: 'Introduction', nz: nz, action: function(){ introduction(); }},
    {name: 'tourism', title: 'We Need More Tourists', nz: nz, action: function(){ tourism(); }},
    {name: 'dairy', title: 'Let\'s make more Milk', nz: nz, action: function(){ dairy(); }},
    {name: 'mining', title: 'Should we mine more?', nz: nz, action: function(){ introduction(); }},
    {name: 'manufactoring', title: 'Made in New Zealand', nz: nz, action: function(){ introduction(); }},
    {name: 'research', title: 'R&#x26;D ROI FTW', nz: nz, action: function(){ introduction(); }},
    {name: 'outro', title: 'To The Future', nz: nz, action: function(){ introduction(); }}
];

$(document).ready( function() {
	createOECDBubbleChart();
	navigate(0);
	$('#nav-foreward').click(function() { currentState++; navigate(currentState); });
	$('#nav-backward').click(function() { currentState--; navigate(currentState); });	
});


function navigate(nextState) {
	// Setup the title and navigation chapter text when we move states
	currentState = nextState;
	$('#current-chapter').html(STATES[currentState].title);
	if ((currentState + 1) >= STATES.length) {
		$('#nav-foreward').html('');
	} else {
		$('#nav-foreward').html('Next Chapter: ' + STATES[currentState + 1].title + ' &#187');
	}
	if (currentState <= 0) {
		$('#nav-backward').html('');
	} else {
		$('#nav-backward').html('&#171 Previous Chapter: ' + STATES[currentState - 1].title);
	}
	
	//nz = STATES[currentState].nz;
	cleanup();
	STATES[currentState].action();
}

function cleanup() {
	// Empty the main and bottom container
	$('#main-container').empty();
	$('#bottom-container').empty();
	$('.state-container').remove();
	
	// Cleanup the OECD Chart to contain the next states NZ object
	oecdStats.pop();
	oecdStats.push({name: "New Zealand", gdppc : nz.gdppc(), work : nz.avgwork(), wage : nz.avgwage()});	
	OECDBubbleChart.refresh(oecdStats);
}

function introduction() {
	
	var title = 'Welcome to 100 Companies.';
	var text = 'Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef. Turducken bresaola shank, leberkase turkey \
		pork chop sausage sirloin prosciutto kielbasa biltong spare ribs tongue. Rump \
		meatball ham, meatloaf tongue spare ribs ball tip andouille tail pancetta cow \
		shank kielbasa sausage.';
	var subtitle1 = 'New Zealand\'s Current GDP Per Capita';
	var subtitle2 = 'Total NZ Workforce/Per Industry:';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
		<p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
		<div id='counter-wrapper'>\
            <div id='flip-counter' class='flip-counter'></div>\
            <div class='clear'></div>\
        </div>");
	
	$('#bottom-container').html("<div id='industry-title'><p><b>" + subtitle2 + "</b><br /></p></div>\
                    <div id='industry-chart' class='chart-wrapper'></div> ");
	
	createCounter();
	createIndustryChart();
}

function tourism() {
	
	var title = 'Welcome to 100 Companies.';
	var text = 'Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef.';
	var subtitle1 = 'Current Regional Accomdation Levels:';
	var subtitle2 = 'Workers per Industry / Tourist Workers per Industry';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
				<div id='tourist-slider'></div>\
			    <p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	$("<div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>\
			 <div id='industry-stacked-chart-title' class='state-container'><p style='text-align:center;'><b>" + subtitle2 + "</b><br /></p><div>\
			 <div id='industry-stacked-chart' class='state-container'></div>").insertAfter('#main-container');
	createTourismSlider();
	createTourismMap();
	createTourismStackedBarChart();
}

function dairy() {
	
}

function createOECDBubbleChart() {
	var minCountryFilter = ['Slovak Republic', 'Sweden', 'Switzerland', 'Belgium', 'Czech Republic', 'Germany', 
	                     'Denmark', 'Ireland', 'Austria', 'Finland', 'Poland', 'Netherlands', 'Portugal', 'France', 'Canada'];
	
	var maxCountryFilter = ['Switzerland', 'Germany', 'Ireland', 'Poland', 
		                     'Netherlands', 'Portugal'];

	var extras = [];
	
	for(x in world.stats){
		if ($.inArray(world.stats[x].name, minCountryFilter) == -1) {
			oecdStats.push(world.stats[x]);
		}
		if ($.inArray(world.stats[x].name, maxCountryFilter) != -1) {
			extras.push(world.stats[x]);
		}		
	}
	oecdStats.push({name: "New Zealand", gdppc : nz.gdppc(), work : nz.avgwork(), wage : nz.avgwage()});	
	
	OECDBubbleChart.CreateBubbleChart(oecdStats, 450, 250);
	nz.addListener(function() {
		oecdStats.pop();
		oecdStats.push({name: "New Zealand", gdppc : nz.gdppc(), work : nz.avgwork(), wage : nz.avgwage()});	
		OECDBubbleChart.refresh(oecdStats);
	});
	$('#gdp-container').toggle( function () {
			$('#bottom-container').hide('slow');
			$('#main-container').hide('slow');
			$('#current-chapter').hide();
			$('.state-container').hide();
			$('#gdp-container').animate({
				width: '+=500'
			}, 1000, function() {
				OECDBubbleChart.rescale(920, 513, oecdStats.concat(extras));
			});			
			
		}, function () { 
			OECDBubbleChart.rescale(450, 250, oecdStats);
			setTimeout(function() { $('#gdp-container').animate({
				width: '-=500'
			}, 1000, function() {
				$('#main-container').show('slow');
				$('#bottom-container').show('slow');
				$('#current-chapter').show('slow');
				$('.state-container').show('slow');
			}); }, 1000);
						
		});

}

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
	pieChart.CreatePieChart(filteredPieData, industries.filteredList, width, height);	
	
	// Create the resizing event on click, use whole dataset for large graph
	$('#industry-chart').toggle( function() {	
		$('#gdp-container').hide('slow');
		$('#main-container').hide('slow');
		$('#current-chapter').hide();
		$('#industry-chart').empty();
		$('#industry-chart').css('width', '920px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(completePieData, industries.completeList, 920, 520);				
		}, 400);		
	}, function() {
		$('#gdp-container').show('slow');
		$('#main-container').show('slow');
		$('#current-chapter').show();
		$('#industry-chart').empty();
		
		$('#industry-chart').css('width', '600px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(filteredPieData, industries.filteredList, width, height);
			
		}, 300);	
	});
}

function createCounter() {
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:1000, pace:50, auto:true});
	myCounter.incrementTo(Math.round(nz.gdppc()));
}

function createTourismMap() {
	var nzGeography = new NZGeograhpy('nz-map');
	nzGeography.createMap(300, 350);
	nzGeography.createLengend('nz-map-legend', 170, 100);
	nzGeography.refresh(nz.Region);
	nz.addListener(function() {			
		//nzGeography.refresh(nz.Region);
	});
}

function createTourismSlider() {
	var x = d3.scale.log().domain([0.01, 1]).range([50000, 9000000]).nice();

	$('#tourist-slider').slider({
		min: .01,
		max: 1,
		step: .01,
		slide: function( event, ui ) {
			try {
				nz.setTourists(x(ui.value));
			} catch (e) {
				
			}
		}
	});
	$('#tourist-slider').slider({ value: x.invert(nz.tourists) });
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
		industries.filteredList.reverse().pop();
		stackedBarChart.refresh(industries);
	});
}


function getIndustryWorkersForDisplay(filter) {
	var filteredList = [];
	var completeList = [];
	var totalWorkers = 0;
	var filteredWorkers = 0;
	
	for(x in nz.NZSIC) {
		var industry = nz.NZSIC[x];
		industry.workers = nz.workersByIndustry[x];
		industry.tourismWorkers = nz.tourismWorkersByIndustry[x];
		
		if ($.inArray(nz.NZSIC[x].name, filter) == -1) {			
			filteredList.push(industry);
		} else {
			filteredWorkers += industry.workers;			
		}
		
		completeList.push(industry);
		totalWorkers += Math.round(industry.workers);
	}
	var other = {workers: filteredWorkers, name: 'Other'};
	
	return {filteredList: filteredList, completeList: completeList, totalWorkers: totalWorkers, other: other};
}





