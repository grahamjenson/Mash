var nz = new NewZealand();
var world = new World();
var OECDBubbleChart = new BubbleChart('bubble-chart');
var oecdStats = [];
var thousands = d3.format(",");


$(document).ready( function() {	

	if ($.browser.msie || !Modernizr.svg || !Modernizr.canvas || !Modernizr.localstorage) {
		// Don't have HTML5 support, redirect
		window.location = "/error.html";
	} 
		
	$("body").css("display", "none");
    $("body").fadeIn(1000);
	createOECDBubbleChart();
	fadeOutBinding();
	setupReadMoreBinding();
});

function setupReadMoreBinding() {
	
	$( ".more-text" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	
	$('#read-more').click(function () {
		$( ".more-text" ).dialog( "open" );
	});
}

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
	
	OECDBubbleChart.CreateBubbleChart(oecdStats, 470, 250);
	nz.addListener(function() {
		oecdStats.pop();
		oecdStats.push({name: "New Zealand", gdppc : nz.gdppc(), work : nz.avgwork(), wage : nz.avgwage()});	
		OECDBubbleChart.refresh(oecdStats);
	});
	$('#bubble-chart').toggle( function () {
			$('.gdp-hide').hide('slow');
			$('#main-container').animate({
				width: '+=50%'
			}, 100, function() {
				OECDBubbleChart.rescale(950, 500, oecdStats.concat(extras));
			});				
		}, function () { 
			OECDBubbleChart.rescale(470, 250, oecdStats);
			setTimeout(function() { $('#main-container').animate({
				width: '-=50%'
			}, 100, function() {
				$('.gdp-hide').show('slow');				
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