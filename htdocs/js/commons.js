var n = new NewZealand();
var world = new World();

$(document).ready( function() {
	createOECDBubbleChart();
	createIndustryChart();
});

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
	oecdStatsFiltered.push({name: "New Zealand *", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});	

	bubbleChart.CreateBubbleChart(oecdStatsFiltered, 450, 250);

	$('#gdp-container').toggle( function () {
			$('#bar-graph').hide('slow');
			$('#gdp-container').animate({
				width: '+=500'
			}, 1000, function() {
				bubbleChart.redrawChart(oecdStatsFiltered, 960, 600, 10, 10);
			});			
			
		}, function () { 
			bubbleChart.redrawChart(oecdStatsFiltered, 450, 250, 7, 7);
			setTimeout(function() { $('#gdp-container').animate({
				width: '-=500'
			}, 1000, function() {
				$('#bar-graph').show('slow');
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

	bargraph = new BarGraph('bar-graph');
	bargraph.CreateBarGraph(nzIndustryStats, nzIndustryStats.length * 50, 200, totalWorkforce);
}


