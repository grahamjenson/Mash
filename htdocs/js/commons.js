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
	createIndustryChart();
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
			$('#main-container').empty();
			introduction();
			break;
		case 1:
			$('#main-container').empty();
			tourism();
			break;
		case 2:
			$('#main-container').empty();
			dairy();
			break;
	
	}
	
}

function introduction() {
	
	var title = 'Welcome to 100 Companies.';
	var text = 'Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef. Turducken bresaola shank, leberkase turkey \
		pork chop sausage sirloin prosciutto kielbasa biltong spare ribs tongue. Rump \
		meatball ham, meatloaf tongue spare ribs ball tip andouille tail pancetta cow \
		shank kielbasa sausage. Prosciutto rump sausage, pork chop sirloin short ribs \
		ball tip kielbasa short loin. Pancetta turkey tongue drumstick pastrami. Pork \
		chop leberkase venison, jerky andouille ribeye turkey filet mignon biltong strip \
		steak rump drumstick meatloaf t-bone.';
	
	$('#main-container').html('<p><b>' + title + '</b></p><p>' + text + '</p>');
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
	var countryFilter = ['Slovak Republic', 'Sweden', 'Switzerland', 'Belgium', 'Czech Republic', 'Germany', 
	                     'Denmark', 'Ireland', 'Austria', 'Finland', 'Poland', 'Netherlands', 'Portugal', 'France', 'Canada'];

	var bubbleChart = new BubbleChart('bubble-chart');
	var oecdStatsFiltered = [];
	var oecdStats = [];
	
	for(x in world.stats){
		if ($.inArray(world.stats[x].name, countryFilter) == -1) {
			oecdStatsFiltered.push(world.stats[x]);
		}
		oecdStats.push(world.stats[x]);
	}
	oecdStatsFiltered.push({name: "New Zealand", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});
	//oecdStatsFiltered.push({name: "New Zealand *", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});	
	oecdStats.push({name: "New Zealand", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});
	//oecdStats.push({name: "New Zealand *", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});	

	bubbleChart.CreateBubbleChart(oecdStatsFiltered, 450, 250);

	$('#gdp-container').toggle( function () {
			$('#industry-graph').hide('slow');
			$('#main-container').hide('slow');
			$('#current-chapter').hide();
			$('#gdp-container').animate({
				width: '+=500'
			}, 1000, function() {
				bubbleChart.redrawChart(920, 520, 10, 10);
				bubbleChart.refreshData(oecdStats);
			});			
			
		}, function () { 
			bubbleChart.redrawChart(450, 250, 7, 7);
			bubbleChart.refreshData(oecdStatsFiltered);
			setTimeout(function() { $('#gdp-container').animate({
				width: '-=500'
			}, 1000, function() {
				$('#main-container').show('slow');
				$('#industry-graph').show('slow');
				$('#current-chapter').show('slow');
			}); }, 1000);
						
		});

}

function createIndustryChart() {
	var industryFilter = ['Mining', 'Fishing and Aquaculture', 'Forestry and Logging', 'Rental, Hiring and Real Estate Services',
	                      'Financial and Insurance Services', 'Not elsewhere classified', 'Electricity, Gas, Water and Waste Services',
	                      'Wholesale Trade', 'Transport, Postal and Warehousing', 'Information Media and Telecommunications',
	                      'Administrative and Support Services', 'Arts and Recreation Services and Other Services'];

	var peopleInWorkforce = $.map(n.NZSIC, function(o){ return o.people; });
	var totalWorkforce = d3.sum(peopleInWorkforce);

	var nzIndustryStats = [];
	for(x in n.NZSIC) {
		if ($.inArray(n.NZSIC[x].name, industryFilter) == -1) {
			nzIndustryStats.push(n.NZSIC[x]);
		}
	}
	var data = d3.range(10).map(Math.random);
	var pieChart = new PieChart('industry-graph');
	pieChart.CreatePieChart(nzIndustryStats, 300, 250);

	//bargraph = new BarGraph('industry-graph');
	//bargraph.CreateBarGraph(nzIndustryStats, nzIndustryStats.length * 50, 200, totalWorkforce);
}


