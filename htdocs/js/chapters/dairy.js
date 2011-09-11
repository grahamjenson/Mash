$(document).ready( function() {

	createDairySlider();
	createDairyMap();
	drawPaddock();
});

function drawPaddock() {
	var width = 15;
	var height = 5;
	var table = "<table>";
	for (var y = 0; y < height; y++) {
		table += "<tr>";
		for (var x = 0; x < width; x++) {
			var z = (width * y) + x;
			if (y == 0 && x < 4) {
				table += "<td><img style=\"text-align:center;\" src=\"../../img/farmer.gif\" alt\"Cow\" width=\"40\" heigth=\"40\" /></td>";
			} else {
				table += "<td id=\"cow-td-" + (z - 4) + "\"><img src=\"../../img/cow.gif\" alt\"Cow\" width=\"40\" heigth=\"40\" /></td>";				
			}		
		}
		table += "</tr>";
	}
	table += "</table>";
	$('#cow-densitiy-chart').html(table);
	transitionCows(nz.totaldairycattle);
}

function createDairyMap() {
	var nzGeography = new NZGeograhpy('nz-map');
	nzGeography.createMap(300, 350);
	nzGeography.createDairyLegend('nz-map-legend', 170, 75);
	nzGeography.refreshDairy(nz);
	nz.addListener(function() {			
		nzGeography.refreshDairy(nz);
	});
}

function transitionCows(value) {
	var cows = Math.round(value/1100000);
	for (var i = 0; i < 71; i++) {
		if (i < cows) {
			$('#cow-td-' + i).show();
		} else {
			$('#cow-td-' + i).hide();
		}
	}
}

function createDairySlider() {
	var x = d3.scale.pow().domain([0.01, 1]).range([5848000, 80000000]).nice();
	var xrule = d3.scale.linear().domain([0.01, 1]).range([29, 439]);

	$('#cow-slider').slider({
		min: .01,
		max: 1,
		step: .01,
		slide: function( event, ui ) {
			$('#current-cows').html(thousands(Math.round(x(ui.value))));
			try {
				nz.setCows(x(ui.value));
				transitionCows(x(ui.value));
			} catch (e) {
				
			}
		}
	});
	$('#cow-slider').slider({ value: x.invert(nz.totaldairycattle) });	
	$('#current-cows').html(thousands(Math.round(nz.totaldairycattle)));
	var chart = d3.select("#cow-slider-legend")
	    .append("svg:svg")
		.attr("width", 468)
	    .attr("height", 25);
	
	var data = [x.invert(5848000), x.invert(20000000), x.invert(40000000), x.invert(60000000), x.invert(80000000)];
	
	var rules = chart.selectAll("g.rule")
	    .data(data)
	    .enter().append("svg:g")
	    .attr("transform", function(d) { return "translate(" + xrule(d) + ",0)"; });
	
	rules.append("svg:line")
	    .attr("y1", 0)
	    .attr("y2", 5)
	    .attr("stroke", "black");
	
	rules.append("svg:text")
	    .attr("y", 10)
	    .attr("dy", ".71em")
	    .attr("text-anchor", "middle")
	    .text(function(d) { return thousands(Math.round(x(d))); });
	
}