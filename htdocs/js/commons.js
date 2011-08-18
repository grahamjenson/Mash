$(document).ready( function() {
	var mockData = [
	    {"industry": "Forestry and mining", "value": .5},
	    {"industry": "Manufacturing", "value": .7},
	    {"industry": "Energy, water, and waste services", "value": .3},
	    {"industry": "Construction", "value": .34},
	    {"industry": "Wholesale trade", "value": .44},
	    {"industry": "Retail trade", "value": .6},
	    {"industry": "Accommodation and food services", "value": .6},
	    {"industry": "Transport, postal, and warehousing", "value": .9}];
	
	var mockGDP = [
	    {"country": "Luxembourg", "gdpPC": 108832, "avgHoursWorked": 1616, "avgWage": 52110},
	    {"country": "Norway", "gdpPC": 84444, "avgHoursWorked": 1414, "avgWage": 44164},
	    {"country": "Switzerland", "gdpPC": 67246, "avgHoursWorked": 1640, "avgWage": 49810},
	    {"country": "Canada", "gdpPC": 46215, "avgHoursWorked": 1702, "avgWage": 41961},
	    {"country": "Denmark", "gdpPC": 56147, "avgHoursWorked": 1559, "avgWage": 43190},
	    {"country": "Australia", "gdpPC": 55590, "avgHoursWorked": 1686, "avgWage": 42550},
	    {"country": "Sweden", "gdpPC": 48875, "avgHoursWorked": 1624, "avgWage": 36826},
	    {"country": "United States", "gdpPC": 47284, "avgHoursWorked": 1778, "avgWage": 52507},
	    {"country": "New Zealand", "gdpPC": 32145, "avgHoursWorked": 1758, "avgWage": 40111}];
	
	var n = new NewZealand();
	var world = new World();
	
	var data = d3.range(10).map(Math.random);
	
	bargraph = new BarGraph('bar-graph');
	bargraph.SetData(mockData);
	bargraph.CreateBarGraph();
	
	var bubbleChart = new BubbleChart('bubble-chart');
	var ll = [];
	for(x in world.stats){ll.push(world.stats[x]);}
	ll.push({name: "New Zealand", gdppc : n.gdppc(), work : n.avgwork(), wage : n.avgwage()});
	
	
	bubbleChart.CreateBubbleChart(ll, 600, 400);
	
	$('#randomize').button().click( function () {
		ll[27] = {name: "New Zealand", gdppc : Math.random() * 100000, work : Math.random() * 100, wage : Math.random() * 100000};
		
		bubbleChart.refreshData(ll);
	});
	$('#rescale').button().click( function () {
		bubbleChart.rescaleChart(900, 600);
	});
	
	
});



