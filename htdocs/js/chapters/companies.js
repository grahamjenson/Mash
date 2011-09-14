var companiesData = [];
var companyChart;

$(document).ready( function() {
	createcompaniesDataSlider();
	createCompanyChart();
});

function createcompaniesDataSlider() {	

	var xrule = d3.scale.linear().domain([0, 100]).range([29, 439]);
	
	$('#company-slider').slider({
		min: 0,
		max: 100,
		step: 1,
		slide: function( event, ui ) {
			$('#current-companiesData').html(ui.value);
			nz.setNCompanies(ui.value);
			updateCompanyChart();
		}
	});
	
	$('#current-companiesData').html('0');
	
	var chart = d3.select("#company-slider-legend")
	    .append("svg:svg")
		.attr("width", 468)
	    .attr("height", 25);
	
	var data = [0, 25, 50, 75, 100];
	
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
	    .text(function(d) { return thousands(Math.round(d)); });
}

function createCompanyChart() {
	var width = 470;
	var hieght = 250;
	
	
	for (var index in nz.companies) {
		nz.companies[index].type = 'normal';
		companiesData.push(nz.companies[index]);
	}
	
	for (var index in nz.othercompanies) {
		if (index == 'apple')
			continue;
		nz.othercompanies[index].type = 'other';
		companiesData.push(nz.othercompanies[index]);
	}
	
	companyChart = new BubbleLineChart('company-chart');
	companyChart.CreateBubbleLineChart(companiesData, width, hieght);
	
}

function updateCompanyChart() {
	var newcompaniesData = [];
	
	for (var index in companiesData) {
		newcompaniesData.push(companiesData[index]);
	}
	
	for (var index in nz.pseudocompanies) {		
		nz.pseudocompanies[index].type = 'pseudo';
		newcompaniesData.push(nz.pseudocompanies[index]);
	}
	
	companyChart.refresh(newcompaniesData);
	
}