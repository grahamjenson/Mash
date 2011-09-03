var nz = new NewZealand();
var world = new World();
var OECDBubbleChart = new BubbleChart('bubble-chart');
var oecdStats = [];
var thousands = d3.format(",");

var currentState = 0;
var STATES = [
    {hash: '#intro', title: 'Introduction', nz: nz, action: function(){ introduction(); }},
    {hash: '#tourism', title: 'We Need More Tourists!', nz: nz, action: function(){ tourism(); }},
    {hash: '#dairy', title: 'Let\'s make more Milk', nz: nz, action: function(){ dairy(); }},
    {hash: '#mining', title: 'Should we mine more?', nz: nz, action: function(){ mining(); }},
    {hash: '#manufactoring', title: 'Made in New Zealand', nz: nz, action: function(){ manufactoring(); }},
    {hash: '#research', title: 'R&#x26;D ROI FTW', nz: nz, action: function(){ research(); }},
    {hash: '#outro', title: 'To The Future', nz: nz, action: function(){ outro(); }}
];

$(document).ready( function() {
	createOECDBubbleChart();
	navigate(getCurrentState());	
	$('#nav-foreward').click(function() { currentState++; navigate(currentState); });
	$('#nav-backward').click(function() { currentState--; navigate(currentState); });
	
	setInterval(function(){
	    if (window.location.hash != STATES[currentState].hash) {
	    	navigate(getCurrentState());	
	    }
	}, 100);
});

function getCurrentState() {
	if (window.location.hash == '') {
		return 0;
	} else {
		for (i in STATES) {
			if (STATES[i].hash == window.location.hash) {
				currentState = i;
			}
		}
		return parseInt(currentState);
	}
}


function navigate(nextState) {
	// Setup the title and navigation chapter text when we move states
	if (event) {
		event.preventDefault();
	}
	
	currentState = nextState;
	$('#current-chapter').html(STATES[currentState].title);
	if ((currentState + 1) >= STATES.length) {
		$('#nav-foreward').html('');
	} else {
		$('#nav-foreward').html('Next Chapter: ' + STATES[currentState + 1].title + ' &#187');
		$('#nav-foreward').attr('href', STATES[currentState + 1].hash);
	}
	if (currentState <= 0) {
		$('#nav-backward').html('');
	} else {
		$('#nav-backward').html('&#171 Previous Chapter: ' + STATES[currentState - 1].title);
		$('#nav-backward').attr('href', STATES[currentState - 1].hash);
	}
	
	//nz = STATES[currentState].nz;
	cleanup();
	STATES[currentState].action();
	window.location.hash = STATES[currentState].hash;
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