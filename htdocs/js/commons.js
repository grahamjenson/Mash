var n = new NewZealand();
var world = new World();
var currentState = 0;
var STATES = [
    'Introduction',
    'We Need More Tourists',
    'Let\'s make more Milk',
    'Should we work harder?'
];

$(document).ready( function() {
	$('#nav-foreward').html('Next Chapter: ' + STATES[currentState + 1] + ' &#187');
	$('#current-chapter').html(STATES[currentState]);
	$('#nav-foreward').click(function() { currentState++; navigate(currentState); });
	$('#nav-backward').click(function() { currentState--; navigate(currentState); });
	introduction();
	createOECDBubbleChart();
	
});

function navigate(nextState) {
	currentState = nextState;
	$('#current-chapter').html(STATES[currentState]);
	if ((currentState + 1) >= STATES.length) {
		$('#nav-foreward').html('');
	} else {
		$('#nav-foreward').html('Next Chapter: ' + STATES[currentState + 1] + ' &#187');
	}
	if (currentState <= 0) {
		$('#nav-backward').html('');
	} else {
		$('#nav-backward').html('&#171 Previous Chapter: ' + STATES[currentState - 1]);
	}
	
	switch(currentState) {
		case 0:
			cleanup();
			introduction();
			break;
		case 1:
			cleanup();
			tourism();
			break;
		case 2:
			cleanup();
			dairy();
			break;
	
	}
	
}

function cleanup() {
	$('#main-container').empty();
	$('#bottom-container').empty();
}

function introduction() {
	
	var title = 'Welcome to 100 Companies.';
	var text = 'Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef. Turducken bresaola shank, leberkase turkey \
		pork chop sausage sirloin prosciutto kielbasa biltong spare ribs tongue. Rump \
		meatball ham, meatloaf tongue spare ribs ball tip andouille tail pancetta cow \
		shank kielbasa sausage.';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
		<p style='text-align:center; padding-top:10px;'><b>New Zealand's Current GDP Per Capita</b><br /></p>\
		<div id='counter-wrapper'>\
            <div id='flip-counter' class='flip-counter'></div>\
            <div class='clear'></div>\
        </div>");
	
	$('#bottom-container').html("<div id='industry-title'><p><b>Total NZ Workforce: Per Industry:</b><br /></p></div>\
                    <div id='industry-chart' class='chart-wrapper'></div> ");
	
	createCounter();
	createIndustryChart();
}

function tourism() {
	
	var nzGeography = new NZGeograhpy('main-container');
	nzGeography.createMap(350, 350);
	//var pieChart = new PieChart('main-container');
	//pieChart.CreatePieChart([], 490, 490);
}

function dairy() {
	
}

function createOECDBubbleChart() {
	var minCountryFilter = ['Slovak Republic', 'Sweden', 'Switzerland', 'Belgium', 'Czech Republic', 'Germany', 
	                     'Denmark', 'Ireland', 'Austria', 'Finland', 'Poland', 'Netherlands', 'Portugal', 'France', 'Canada'];
	
	var maxCountryFilter = ['Slovak Republic', 'Sweden', 'Belgium', 'Czech Republic', 
		                     'Denmark', 'Austria', 'Finland', 'France', 'Canada'];

	var bubbleChart = new BubbleChart('bubble-chart');
	var oecdStatsFiltered = [];
	var oecdStats = [];
	
	for(x in world.stats){
		if ($.inArray(world.stats[x].name, minCountryFilter) == -1) {
			oecdStatsFiltered.push(world.stats[x]);
		}
		if ($.inArray(world.stats[x].name, maxCountryFilter) == -1) {
			oecdStats.push(world.stats[x]);
		}		
	}
	oecdStatsFiltered.push({name: "New Zealand", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});	
	oecdStats.push({name: "New Zealand", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});

	bubbleChart.CreateBubbleChart(oecdStatsFiltered, 450, 250);

	$('#gdp-container').toggle( function () {
			$('#bottom-container').hide('slow');
			$('#main-container').hide('slow');
			$('#current-chapter').hide();
			$('#gdp-container').animate({
				width: '+=500'
			}, 1000, function() {
				bubbleChart.refresh(920, 520, oecdStats);
			});			
			
		}, function () { 
			bubbleChart.refresh(450, 250, oecdStatsFiltered);
			setTimeout(function() { $('#gdp-container').animate({
				width: '-=500'
			}, 1000, function() {
				$('#main-container').show('slow');
				$('#bottom-container').show('slow');
				$('#current-chapter').show('slow');
			}); }, 1000);
						
		});

}

function createIndustryChart() {
	var width = 600;
	var height = 235;
	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Financial and Insurance Services', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Wholesale Trade', 'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Administrative and Support Services', 'Arts and Recreation Services and Other Services'];

	var peopleInWorkforce = $.map(n.NZSIC, function(o){ return o.people; });
	var totalWorkforce = d3.sum(peopleInWorkforce);

	var nzIndustryStats = [];
	var totalPeople = 0;
	var other = 0;
	for(x in n.NZSIC) {
		if ($.inArray(n.NZSIC[x].name, industryFilter) == -1) {
			nzIndustryStats.push(n.NZSIC[x]);
		} else {
			other += n.NZSIC[x].people;
		}
		totalPeople += n.NZSIC[x].people;
	}
	nzIndustryStats.push({people: other, name: 'Other'});
	
	pieData = $.map(nzIndustryStats, function(d) { return totalPeople/d.people; });
	
	var pieChart = new PieChart('industry-chart');
	pieChart.CreatePieChart(pieData, nzIndustryStats, width, height);

}

function createCounter() {
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:1000, pace:50, auto:true});
	console.log(n.gdppc());
	myCounter.incrementTo(Math.round(n.gdppc()));
}


