$(document).ready( function() {
	var title = 'So we\'re good at Dairy, why not do more of that?';
	var text = 'Dairy destroys our clean green image as it scaled, it has a low average wage potential and high working hours, \
		and we dont want to over specialize. Use the slider below to increase the amount of cows in New Zealand to see the effect is has.\
		<span style="float: right; text-align: right; padding-top: 7px;"><b>Cows in New Zealand: </b><b id="current-cows"></b></span>';
	var subtitle1 = 'Regional Cow Densisty: (Cows per land<sup>2</sup>)';
	var subtitle2 = 'Humans vs. Cows: (1 Unit = 1.1 Million)';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p style='padding-bottom: 10px'>" + text + "</p>\
				<div id='cow-slider'></div>\
				<div id='cow-slider-legend'></div>\
			    <p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	$("<div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>\
			 <div id='cow-densitiy-title' class='state-container'><p style='text-align:center;'><b>" + subtitle2 + "</b><br /></p><div>\
			 <div id='cow-densitiy-chart' class='state-container'></div>").insertAfter('#main-container');
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