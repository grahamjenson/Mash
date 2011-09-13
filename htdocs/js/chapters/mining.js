var lineChart;
var growth, oilExp, coalExp, metalExp, oilCounter, coalCounter, metalCounter;

$(document).ready( function() {
	$('#bubble-chart').remove();
	createMiningSliders();
	createMiningChart();
	createMiningCounters();
});

function createMiningSliders() {
	
	var x = d3.scale.linear().domain([0, 10]).range([10, 320]);
	
	$('#oil-slider').slider({
			min: 0,
			max: 0.1,
			step: .01,
			slide: function( event, ui ) {
				$('#current-tourists').html(thousands(Math.round(x(ui.value))));
				growth = getMiningGrowth(ui.value, $('#coal-slider').slider('value'), $('#metal-slider').slider('value'));
				lineChart.refresh(growth);
				refreshMiningCounters();
			}
	});
	$('#coal-slider').slider({
		min: 0,
		max: 0.1,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			growth = getMiningGrowth($('#oil-slider').slider('value'), ui.value, $('#metal-slider').slider('value'));
			lineChart.refresh(growth);
			refreshMiningCounters();
		}
	});
	$('#metal-slider').slider({
		min: 0,
		max: 0.1,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			growth = getMiningGrowth($('#oil-slider').slider('value'), $('#coal-slider').slider('value'), ui.value);
			lineChart.refresh(growth);
			refreshMiningCounters();
		}
	});
	
	
	
	var chart = d3.selectAll(".mining-slider-legend")
	    .append("svg:svg")
		.attr("width", 340)
	    .attr("height", 20);
	
	var data = [0, 2, 4, 6, 8, 10];
	
	var rules = chart.selectAll("g.rule")
	    .data(data)
	    .enter().append("svg:g")
	    .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
	
	rules.append("svg:line")
	    .attr("y1", 0)
	    .attr("y2", 5)
	    .attr("stroke", "black");
	
	rules.append("svg:text")
	    .attr("y", 10)
	    .attr("dy", ".71em")
	    .attr("text-anchor", "middle")
	    .text(function(d) { return d + '%'; });
}

function createMiningChart() {
	lineChart = new LineChart('mining-chart');
	growth = getMiningGrowth(0, 0, 0);
	lineChart.CreateLineChart(growth, 960, 235);
}

function getMiningGrowth(oil, coal, metal) {
	oilExp = 0;
	coalExp = 0;
	metalExp = 0;
	nz.setMiningGrowth(oil, coal, metal);
	var miningGrowth = [];
	for (var year in nz.yearlyminingvalue)
	{
		var oil = nz.yearlyminingvalue[year].oil;
		var coal = nz.yearlyminingvalue[year].coal;
		var metal = nz.yearlyminingvalue[year].metal;
		if (coalExp == 0 && coal <= 0) {
			coalExp = parseInt(year);
		} else if (oilExp == 0 && oil <= 0) {
			oilExp = parseInt(year);
		} else if (metalExp == 0  && metal <= 0) {
			metalExp = parseInt(year);
		}
		var miningObj = {'year': year, 'oil': oil, 'coal': coal, 'metal': metal};	
		miningGrowth.push(miningObj);
	}
	return miningGrowth;
	
}

function createMiningCounters() {
	oilCounter = new flipCounter('oil-counter', {value:2011, inc:10, pace:50, auto:true});
	oilCounter.incrementTo(oilExp);
	
	coalCounter = new flipCounter('coal-counter', {value:2254, inc:10, pace:50, auto:true});
	coalCounter.incrementTo(coalExp);
	
	metalCounter = new flipCounter('metal-counter', {value:2011, inc:10, pace:50, auto:true});
	metalCounter.incrementTo(metalExp);
}

function refreshMiningCounters() {
	oilCounter.incrementTo(oilExp);
	coalCounter.incrementTo(coalExp);
	metalCounter.incrementTo(metalExp);
}