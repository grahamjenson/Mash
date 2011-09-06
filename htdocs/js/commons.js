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
	$("body").css("display", "none");
    $("body").fadeIn(1000);
	createOECDBubbleChart();
	fadeOutBinding();
});

function fadeOutBinding() {
	$("#nav-foreward").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);
    });
	
	$("#nav-backward").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);
    });
}

function redirectPage() {
    window.location = linkLocation;
}


function createOECDBubbleChart() {
	var minCountryFilter = ['Slovak Republic', 'Sweden', 'Switzerland', 'Belgium', 'Czech Republic', 'Germany', 'Turkey',
	                     'Denmark', 'Ireland', 'Austria', 'Finland', 'Poland', 'Netherlands', 'Portugal', 'France', 
	                     'Canada', 'Hungary'];
	
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
	var totalWorkers = nz.workingPopulation;
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
	}
	var other = {workers: filteredWorkers, name: 'Other'};
	
	return {filteredList: filteredList, completeList: completeList, totalWorkers: totalWorkers, other: other};
}