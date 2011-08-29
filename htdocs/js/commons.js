var newZealand = new NewZealand();
var world = new World();
var currentState = 0;
var STATES = [
    'Introduction',
    'We Need More Tourists',
    'Let\'s make more Milk',
    'Should we mine more?',
    'Made in New Zealand',
    'R&#x26;D ROI FTW',
    'To The Future'
];
var oecdStats;

$(document).ready( function() {
	navigate(0);
	$('#nav-foreward').click(function() { currentState++; navigate(currentState); });
	$('#nav-backward').click(function() { currentState--; navigate(currentState); });

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
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
				<div id='tourist-slider'></div>\
			    <p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>\
	         <div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>");
	createTourismSlider();
	var nzGeography = new NZGeograhpy('nz-map');
	nzGeography.createMap(300, 350);
	nzGeography.createLengend('nz-map-legend', 170, 100);
}

function dairy() {
	
}

function createOECDBubbleChart() {
	var minCountryFilter = ['Slovak Republic', 'Sweden', 'Switzerland', 'Belgium', 'Czech Republic', 'Germany', 
	                     'Denmark', 'Ireland', 'Austria', 'Finland', 'Poland', 'Netherlands', 'Portugal', 'France', 'Canada'];
	
	var maxCountryFilter = ['Switzerland', 'Germany', 'Ireland', 'Poland', 
		                     'Netherlands', 'Portugal'];

	var bubbleChart = new BubbleChart('bubble-chart');
	oecdStats = [];
	extras = [];
	
	for(x in world.stats){
		if ($.inArray(world.stats[x].name, minCountryFilter) == -1) {
			oecdStats.push(world.stats[x]);
		}
		if ($.inArray(world.stats[x].name, maxCountryFilter) != -1) {
			extras.push(world.stats[x]);
		}		
	}
	oecdStats.push({name: "New Zealand", gdppc : newZealand.gdppc(), work : newZealand.avgwork(), wage : newZealand.avgwage()});	
	
	bubbleChart.CreateBubbleChart(oecdStats, 450, 250);
	newZealand.addListener(function() {
		oecdStats.pop();
		oecdStats.push({name: "New Zealand", gdppc : newZealand.gdppc(), work : newZealand.avgwork(), wage : newZealand.avgwage()});	
		bubbleChart.refresh(oecdStats);
	});
	$('#gdp-container').toggle( function () {
			$('#bottom-container').hide('slow');
			$('#main-container').hide('slow');
			$('#current-chapter').hide();
			$('#gdp-container').animate({
				width: '+=500'
			}, 1000, function() {
				bubbleChart.rescale(920, 513, oecdStats.concat(extras));
			});			
			
		}, function () { 
			bubbleChart.rescale(450, 250, oecdStats);
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
	                      'Public Administration and Safety', 'Arts and Recreation Services and Other Services'];

	var peopleInWorkforce = $.map(newZealand.NZSIC, function(o){ return o.people; });
	var totalWorkforce = d3.sum(peopleInWorkforce);

	var filteredNZIndustries = [];
	var allNZIndustries = [];
	var totalPeople = 0;
	var other = 0;
	
	for(x in newZealand.NZSIC) {
		if ($.inArray(newZealand.NZSIC[x].name, industryFilter) == -1) {
			filteredNZIndustries.push(newZealand.NZSIC[x]);
		} else {
			other += newZealand.NZSIC[x].people;			
		}
		allNZIndustries.push(newZealand.NZSIC[x]);
		totalPeople += Math.round(newZealand.NZSIC[x].people);
	}
	filteredNZIndustries.push({people: other, name: 'Other'});
	
	// Sort the filtered mutlidemensional array in a decending order.
	filteredNZIndustries.sort(function(a, b) {
		return ((b.people < a.people) ? -1 : ((b.people > a.people) ? 1 : 0));
	});
	allNZIndustries.sort(function(a, b) {
		return ((b.people < a.people) ? -1 : ((b.people > a.people) ? 1 : 0));
	});
	
	// Map percentages to hand to the pie chart, makes easier to do out here with the count of people.
	filteredPieData = $.map(filteredNZIndustries, function(d) { return (Math.round(d.people) / totalPeople); });
	allPieData = $.map(allNZIndustries, function(d) { return (Math.round(d.people) / totalPeople); });
	
	var pieChart = new PieChart('industry-chart');
	pieChart.CreatePieChart(filteredPieData, filteredNZIndustries, width, height);
	
	$('#industry-chart').toggle( function() {	
		$('#gdp-container').hide('slow');
		$('#main-container').hide('slow');
		$('#current-chapter').hide();
		$('#industry-chart').empty();
		$('#industry-chart').css('width', '920px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(allPieData, allNZIndustries, 920, 520);
				
		}, 400);
			
		
	}, function() {
		$('#gdp-container').show('slow');
		$('#main-container').show('slow');
		$('#current-chapter').show();
		$('#industry-chart').empty();
		
		$('#industry-chart').css('width', '600px');
		setTimeout(function() {
			var pieChart = new PieChart('industry-chart');
			pieChart.CreatePieChart(filteredPieData, filteredNZIndustries, width, height);
			
		}, 300);	
	});
}

function createCounter() {
	var myCounter = new flipCounter('flip-counter', {value:10000, inc:1000, pace:50, auto:true});
	myCounter.incrementTo(Math.round(newZealand.gdppc()));
}

function createTourismSlider() {
	x = d3.scale.log().domain([0.01, 1]).range([50000, 9000000]).nice();
	//inverseX = d3.scale.log().domain([50000, 9000000]).range([0.01, 1]).nice();
	//console.log(newZealand.tourists);
	$('#tourist-slider').slider({
		min: .01,
		max: 1,
		step: .01,
		slide: function( event, ui ) {
			try {
				newZealand.changeTourists(x(ui.value));
			} catch (e) {
				
			}
			
		}
	});
	$('#tourist-slider').slider({ value: 0.03 });
}





