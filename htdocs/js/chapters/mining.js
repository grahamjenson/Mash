$(document).ready( function() {
	var title = 'Lets dig up our billions worth of untapped resources.';
	var text = 'However, to improve New Zealand GDP over the long run we are aiming for 40bn a year, \
	and 60bn profit from mineral wealth is one off, and sacrifices our countries core values:';
	var subtitle1 = '';
	var subtitle2 = '';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
			<table class='mining-table'>\
				<tr><td width=\'30%\' class='mining-p'>Oil Growth:</td><td><div id='oil-slider' class='mining-slider'></div></td></tr>\
				<tr><td width=\'30%\'></td><td><div class='mining-slider-legend'></div></td></tr>\
				<tr><td width=\'30%\' class='mining-p'>Coal Growth:</td><td><div id='coal-slider' class='mining-slider'></div></td></tr>\
				<tr><td width=\'30%\'></td><td><div class='mining-slider-legend'></div></td></tr>\
				<tr><td width=\'30%\' class='mining-p'>Metal Growth:</td><td><div id='metal-slider' class='mining-slider'></div></td></tr>\
				<tr><td width=\'30%\'></td><td><div class='mining-slider-legend'></div></td></tr>\
			</table>\
				<p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	createMiningSliders();
});

function createMiningSliders() {
	var attr = {
			min: 0,
			max: 1,
			step: .01,
			slide: function( event, ui ) {
				$('#current-tourists').html(thousands(Math.round(x(ui.value))));
				nz.setMining(ui.value);
			}
	};
	
	$('#oil-slider').slider({
			min: 0,
			max: 0.08,
			step: .01,
			slide: function( event, ui ) {
				$('#current-tourists').html(thousands(Math.round(x(ui.value))));
				nz.setMiningGrowth(ui.value, $('#coal-slider').slider('value'), $('#metal-slider').slider('value'));
			}
	});
	$('#coal-slider').slider({
		min: 0,
		max: 0.08,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			nz.setMiningGrowth($('#oil-slider').slider('value'), ui.value, $('#metal-slider').slider('value'));
		}
	});
	$('#metal-slider').slider({
		min: 0,
		max: 0.08,
		step: .01,
		slide: function( event, ui ) {
			$('#current-tourists').html(thousands(Math.round(x(ui.value))));
			nz.setMiningGrowth($('#oil-slider').slider('value'), $('#coal-slider').slider('value'), ui.value);
		}
	});
	
	var x = d3.scale.linear().domain([0, 8]).range([10, 320]);
	
	var chart = d3.selectAll(".mining-slider-legend")
	    .append("svg:svg")
		.attr("width", 340)
	    .attr("height", 25);
	
	var data = [0, 2, 4, 6, 8];
	
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