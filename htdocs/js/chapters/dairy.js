function dairy() {
	var title = 'So we\'re good at Dairy, why not do more of that?';
	var text = '(Under Development) Bacon ipsum dolor sit amet cow meatloaf bacon turducken, meatball \
		flank spare ribs hamburger beef jerky pancetta ball tip. Hamburger ham hock \
		t-bone drumstick pastrami beef. ';
	var subtitle1 = 'Regional Cow Densisty: (Cows per land<sup>2</sup>)';
	var subtitle2 = 'Workers per Industry / Dairy Workers per Industry';
	
	$('#main-container').html("<p><b>" + title + "</b></p><p>" + text + "</p>\
				<div id='tourist-slider'></div>\
			    <p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b><br /></p>\
	            <div class='clear'></div>\
	         </div>");
	$("<div id='nz-map' class='state-container'></div>\
	         <div id='nz-map-legend' class='state-container'></div>\
			 <div id='industry-stacked-chart-title' class='state-container'><p style='text-align:center;'><b>" + subtitle2 + "</b><br /></p><div>\
			 <div id='industry-stacked-chart' class='state-container'></div>").insertAfter('#main-container');
	//createTourismSlider();
	createDairyMap();
	//createTourismStackedBarChart();
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