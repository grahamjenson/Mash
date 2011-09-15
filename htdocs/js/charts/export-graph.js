/**
 * @param container
 * @returns {ExportGraph}
 */
function ExportGraph(container) {

	var container = container;
	
	var vis;
	var industries = [];
	var exports = [];
	var countries = [];
	var w, h, x, y;
	var selectedIndustry = '';
	var selectedExport = '';
	
	var paddingTop = 10;
	var paddingBottom = 10;
	var paddingLeft = 10;
	var paddingRight = 10;
	
	var partitionedIndustries;
	var partitionedExports;
	var partitionedCountries;
	var tooltip;
	var strokeOpacity = '.4';
	
	var duration = 1000;
	var color = d3.scale.category20c();
	var line = d3.svg.line().interpolate('basis');
	
	this.createExportGraph = function(industryCategories, exportCategories, countryCategories, width, hieght) {
		industries = industryCategories;
		exports = exportCategories;
		countries = countryCategories;
		
		w = width;
		h = hieght;
		
		industriesY = d3.scale.linear().range([0, (h - paddingRight) ]);
		industriesX = d3.scale.linear().range([0, (w - paddingBottom) / 5]);
	    
		exportY = d3.scale.linear().range([0, (h - paddingRight) ]);
		exportX = d3.scale.linear().range([((w - paddingBottom) / 5)*2, ((w - paddingBottom) / 5)]);
		
		countryY = d3.scale.linear().range([0, (h - paddingRight) ]);
		countryX = d3.scale.linear().range([((w - paddingBottom) / 5)*4, ((w - paddingBottom) / 5)]);
		
		vis = d3.select("#" + container)
			.append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
		
		tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.attr('class', 'tool-tip-div')
			.style("z-index", "10")
			.style("visibility", "hidden")
			.style('background', 'white')
			.style('padding', '2px')
			.style('border', 'thin solid black')
			.text("");
		
		var partition = d3.layout.partition()		    
		    .value(function(d) { return d.value; });
		
		partitionedIndustries = partition(industries);
		partitionedExports = partition(exports);
		partitionedCountries = partition(countries);
		
		var industryCell = vis.selectAll(".industry-cell")
	      	.data(partitionedIndustries)
		    .enter().append("svg:g")
		    .attr("class", 'industry-cell manufaturing-cell')
		    .attr("transform", function(d) { return "translate(" + industriesX((d.children ? d.y : (d.y - .5))) + "," + industriesY(d.x) + ")"; })
		    .on("click", fade('industry'));
		
		industryCell.append("svg:rect")
	      	.attr("height", function(d) { return industriesY(d.dx); })
	      	.attr("width", function(d) { return industriesX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(i); })
	      	.attr("class", addIndustryClasses)
	      	.style("stroke", 'white')
		    .style("stroke-opacity", 1)
		    .on("mouseover", showIndustryToolTip)
			.on("mousemove", moveToolTip)
			.on("mouseout", hideToolTip);
		
		industryCell.append("svg:text")
	      .attr("x", function(d) { return industriesX(d.dy + .5) / 2; })
	      .attr("y", function(d) { return industriesY(d.dx) / 2; })
	      .attr("width", function(d) { return industriesX(d.dy + .5); })
	      .attr("class", 'industry-text')
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });	
		
		
		var exportCell = vis.selectAll(".export-cell")
	      	.data(partitionedExports)
		    .enter().append("svg:g")
		    .attr("class", "export-cell manufaturing-cell")
		    .attr("transform", function(d) { return "translate(" + exportX((d.children ? d.y : (d.y - .5))) + "," + exportY(d.x) + ")"; })
		    .attr("href", function(d) { return d.data.name; })
		    .on("click", fade('export'));
		
		exportCell.append("svg:rect")
	      	.attr("height", function(d) { return exportY(d.dx); })
	      	.attr("width", function(d) { return exportX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(i); })
	      	.style("stroke", 'white')
	      	.attr("class", addExportClasses)
		    .style("stroke-opacity", 1)
		    .on("mouseover", showExportToolTip)
			.on("mousemove", moveToolTip)
			.on("mouseout", hideToolTip);
		
		exportCell.append("svg:text")
	      .attr("x", function(d) { return exportX(d.dy + .5) / 2; })
	      .attr("y", function(d) { return exportY(d.dx) / 2; })
	      .attr("width", function(d) { return exportX(d.dy + .5); })
	      .attr("dy", ".35em")
	      .attr("class", 'export-text')
	      .attr("text-anchor", "middle")
	      .text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });
		
		var countryCell = vis.selectAll(".country-cell")
	      	.data(partitionedCountries)
		    .enter().append("svg:g")
		    .attr("class", "country-cell manufaturing-cell")
		    .attr("transform", function(d) { return "translate(" + countryX((d.children ? d.y : (d.y - .5))) + "," + countryY(d.x) + ")"; })
		    .attr("href", function(d) { return d.data.name; })
		    .on("click", fade('country'));
		
		countryCell.append("svg:rect")
	      	.attr("height", function(d) { return countryY(d.dx); })
	      	.attr("width", function(d) { return countryX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(i); })
	      	.style("stroke", 'white')
	      	.attr("class", addCountryClasses)
		    .style("stroke-opacity", 1)
		    .on("mouseover", showCountryToolTip)
			.on("mousemove", moveToolTip)
			.on("mouseout", hideToolTip);
		
		countryCell.append("svg:text")
	        .attr("x", function(d) { return countryX(d.dy + .5) / 2; })
	        .attr("y", function(d) { return countryY(d.dx) / 2; })
	        .attr("width", function(d) { return countryX(d.dy + .5); })
	        .attr("dy", ".35em")
	        .attr("class", 'country-text')
	        .attr("text-anchor", "middle")
	        .text(function(d) { return d.children ? null : (countryY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });
		
		
		for (exportPartitionIndex in partitionedExports) {
			var partitionedExport = partitionedExports[exportPartitionIndex];
			
			for (linkIndex in partitionedExport.data.industryLinks) {
				
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.industryLinks[linkIndex].key;
				
				var endPointX = ((w - paddingBottom) / 5)*2;
				var endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
				
				for (industryPartitionIndex in partitionedIndustries) {
					var partitionedIndustry = partitionedIndustries[industryPartitionIndex];
					if (partitionedIndustry.data.key == industryKey) {
						var maxWeight = exportY(partitionedExport.dx) < 50 ? exportY(partitionedExport.dx) : 50;  
						var weightScale = d3.scale.sqrt().domain([0, partitionedIndustry.data.exports.length]).range([maxWeight, 1]).clamp(true);
						var weight = weightScale(1);
						
						var startPointX = ((w - paddingBottom) / 5);
						var startPointY = industriesY(partitionedIndustry.x) + (industriesY(partitionedIndustry.dx) / 2);
						
						var extraClasses = '';
				    	for (var existingLinkIndex in exportCategoryClasses[exportKey]) {
							var link = exportCategoryClasses[exportKey][existingLinkIndex];
							
							if (link.type == 'country') {
								extraClasses += (' ' + link.class);										
							} 
						}
						
						var points = [[startPointX, startPointY], [startPointX*1.1, startPointY], [endPointX*.9, endPointY], [endPointX, endPointY]];
					    vis.append("svg:path")
						    .data([points])
						    .transition()
							.duration(duration)
						    .style("fill", 'none')
						    .style("stroke", 'black')
						    .style("stroke-width", weight)
						    .style('stroke-opacity', strokeOpacity)
						    .attr('class', 'path industry-path industry-' + industryKey + ' export-' + exportKey + ' unique-' + industryKey + exportKey + ' ' + extraClasses)
						    .attr("d", line);
					}					
				}		
			}
			
			for (linkIndex in partitionedExport.data.countryLinks) {
				
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.countryLinks[linkIndex].key;
				
				var endPointX = ((w - paddingBottom) / 5)*3;
				var endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
				var startPointX, startPointY;
				
				for (industryPartitionIndex in partitionedCountries) {
					var partitionedCountry = partitionedCountries[industryPartitionIndex];
					
					
					if (partitionedCountry.data.key == industryKey && partitionedCountry.data.imports[linkIndex] > 10000000) {
						var weightScale = d3.scale.sqrt().domain([0, partitionedCountry.value]).range([1, exportY(partitionedExport.dx)]).clamp(true);
						var weight = weightScale(partitionedCountry.data.imports[linkIndex]);
						
						startPointX = ((w - paddingBottom) / 5) * 4;
						startPointY = industriesY(partitionedCountry.x) + (industriesY(partitionedCountry.dx) / 2);
						
						var extraClasses = '';
				    	for (var existingLinkIndex in exportCategoryClasses[exportKey]) {
							var link = exportCategoryClasses[exportKey][existingLinkIndex];
							if (link.type == 'industry') {
								extraClasses += (' ' + link.class);										
							} 
						}
							
						var points = [[startPointX, startPointY], [startPointX*.9, startPointY], [endPointX*1.1, endPointY], [endPointX, endPointY]];
					    vis.append("svg:path")
						    .data([points])
						    .transition()
							.duration(duration)
						    .style("fill", 'none')
						    .style("stroke", 'black')
						    .style("stroke-width", weight)
						    .style('stroke-opacity', strokeOpacity)
						    .attr('class', 'path country-path country-' + industryKey + ' export-' + exportKey + ' unique-' + industryKey + exportKey + ' ' + extraClasses)
						    .attr("d", line);
					}					
				}		
			}
		}
	};
	
	this.resize = function(height) {
		h = height;
		
		industriesY = d3.scale.linear().range([0, (h - paddingRight) ]);
		industriesX = d3.scale.linear().range([0, (w - paddingBottom) / 5]);
	    
		exportY = d3.scale.linear().range([0, (h - paddingRight) ]);
		exportX = d3.scale.linear().range([((w - paddingBottom) / 5)*2, ((w - paddingBottom) / 5)]);
		
		countryY = d3.scale.linear().range([0, (h - paddingRight) ]);
		countryX = d3.scale.linear().range([((w - paddingBottom) / 5)*4, ((w - paddingBottom) / 5)]);
		
		d3.select("#" + container)
			.transition()
			.duration(duration)
		    .attr("width", w)
		    .attr("height", h);
		
		vis.transition()
			.duration(duration)
			.attr("width", w)
			.attr("height", h);
		
		var industriesCells = vis.selectAll(".industry-cell")
			.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + industriesX((d.children ? d.y : (d.y - .5))) + "," + industriesY(d.x) + ")"; });
	    
		vis.selectAll(".industry-text")
			.transition()
			.duration(duration)
			.attr("x", function(d) { return exportX(d.dy + .5) / 2; })
			.attr("y", function(d) { return exportY(d.dx) / 2; })
			.text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 28) + '...' : ''); });
		
		vis.selectAll(".industry-rectangles")
			.transition()
			.duration(duration)
			.attr("height", function(d) { return industriesY(d.dx); });
		
		var exportCells = vis.selectAll(".export-cell")
			.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + exportX((d.children ? d.y : (d.y - .5))) + "," + exportY(d.x) + ")"; });
		
		vis.selectAll(".export-text")
			.transition()
			.duration(duration)
			.attr("x", function(d) { return exportX(d.dy + .5) / 2; })
			.attr("y", function(d) { return exportY(d.dx) / 2; })
			.text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 28) + '...' : ''); });
		
		vis.selectAll(".export-rectangles")
			.transition()
			.duration(duration)
			.attr("height", function(d) { return exportY(d.dx); });
		
		var countryCells = vis.selectAll(".country-cell")
			.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + countryX((d.children ? d.y : (d.y - .5))) + "," + countryY(d.x) + ")"; });
		
		vis.selectAll(".country-text")
			.transition()
			.duration(duration)
			.attr("x", function(d) { return countryX(d.dy + .5) / 2; })
			.attr("y", function(d) { return countryY(d.dx) / 2; })
			.text(function(d) { return d.children ? null : (countryY(d.dx) > 12 ? d.data.name.slice(0, 28) + '...' : ''); });
		
		vis.selectAll(".country-rectangles")
			.transition()
			.duration(duration)
			.attr("height", function(d) { return countryY(d.dx); });
		
		for (exportPartitionIndex in partitionedExports) {
			var partitionedExport = partitionedExports[exportPartitionIndex];
			
			
			for (linkIndex in partitionedExport.data.industryLinks) {
				var weight = (partitionedExport.value / partitionedExport.data.industryLinks.length) / partitionedExport.value;
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.industryLinks[linkIndex].key;
				
				var endPointX = ((w - paddingBottom) / 5)*2;
				var endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
				var startPointX, startPointY;
				
				
				
				for (industryPartitionIndex in partitionedIndustries) {
					var partitionedIndustry = partitionedIndustries[industryPartitionIndex];
					if (partitionedIndustry.data.key == industryKey) {
						startPointX = ((w - paddingBottom) / 5);
						startPointY = industriesY(partitionedIndustry.x) + (industriesY(partitionedIndustry.dx) / 2);
							
						var points = [[startPointX, startPointY], [startPointX*1.1, startPointY], [endPointX*.9, endPointY], [endPointX, endPointY]];
					    vis.selectAll(".unique-" + industryKey + exportKey)
						    .data([points])
						    .transition()
							.duration(duration)
						    .attr("d", line);
					}					
				}		
			}
			
			for (linkIndex in partitionedExport.data.countryLinks) {
				var weight = (partitionedExport.value / partitionedExport.data.industryLinks.length) / partitionedExport.value;
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.countryLinks[linkIndex].key;
				
				var endPointX = ((w - paddingBottom) / 5)*3;
				var endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
				var startPointX, startPointY;
				
				for (industryPartitionIndex in partitionedCountries) {
					var partitionedCountry = partitionedCountries[industryPartitionIndex];
					if (partitionedCountry.data.key == industryKey) {
						startPointX = ((w - paddingBottom) / 5)*4;
						startPointY = industriesY(partitionedCountry.x) + (industriesY(partitionedCountry.dx) / 2);
							
						var points = [[startPointX, startPointY], [startPointX*.9, startPointY], [endPointX*1.1, endPointY], [endPointX, endPointY]];
						vis.selectAll(".unique-" + industryKey + exportKey)
						    .data([points])
						    .transition()
							.duration(duration)
						    .attr("d", line);
					}					
				}		
			}
		}	
		
		
	};
	
	function click(d) {
	    x.domain([d.x, d.x + d.dx]);
	    y.domain([d.y, 1]).range([d.y ? 20 : 0, h]);

	    rect.transition()
	      .duration(750)
	      .attr("x", function(d) { return x(d.x); })
	      .attr("y", function(d) { return y(d.y); })
	      .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
	      .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
	  }
	
	function addIndustryClasses(d, i) {		
		var classes = '';
		for (var x in exportIndustryClasses[d.data.key]){
			classes = classes.concat(exportIndustryClasses[d.data.key][x].class + ' ');
		}
			
		return 'rectangles industry-rectangles industry-' + d.data.key + ' ' + classes;
	}
	
	function addExportClasses(d, i) {		
		var classes = '';
		for (var x in exportCategoryClasses[d.data.key]){
			classes = classes.concat(exportCategoryClasses[d.data.key][x].class + ' ');
		}
			
		return 'rectangles export-rectangles export-' + d.data.key + ' ' + classes;
	}
	
	function addCountryClasses(d, i) {		
		var classes = '';
		for (var x in exportCountryClasses[d.data.key]){
			classes = classes.concat(exportCountryClasses[d.data.key][x].class + ' ');
		}
			
		return 'rectangles country-rectangles country-' + d.data.key + ' ' + classes;
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fade(type) {
	  return function(g, i) {
		  if (selectedExport == g.data.key) {
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", 1);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", strokeOpacity);
			    
			    selectedExport = '';

		  } else {
			  selectedExport = g.data.key;
			  
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", .05);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", 0);
			    
			    vis.selectAll(("." + type + "-" + g.data.key))
			      .transition()
			      .duration(500)
			      .style("opacity", 1)
			      .style("stroke-opacity", '.7');
		  }   	    
	  };
	}
	
	function showIndustryToolTip(g, i) {
		$('.tool-tip-div').html('<b>' + g.data.name + '</b><p>Amount of Workers in Industry: ' +
				thousands(Math.round(g.data.value)) + '</p>');		
		return tooltip.style("visibility", "visible");
	}
	
	function showExportToolTip(g, i) {
		$('.tool-tip-div').html('<b>' + g.data.name + '</b><p>Total Value of Exports: $' + 
	    		thousands(Math.round(g.value)) + '</p>');		;
		return tooltip.style("visibility", "visible");
	}
	
	function showCountryToolTip(g, i) {
		$('.tool-tip-div').html('<b>' + g.data.name + '</b><p>Total Amount Imported: $' + 
	    		thousands(Math.round(g.value)) + '</p>');
		return tooltip.style("visibility", "visible");
	}
	
	function moveToolTip(g, i) {	
		var event = d3.event;
		tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
		return;
	}
	function hideToolTip(g, i) { 
		return tooltip.style("visibility", "hidden");
	}
	
}