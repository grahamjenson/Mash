/**
 * @param container
 * @returns {ExportGraph}
 */
function ExportGraph(container) {

	var container = container;
	
	var vis;
	var industries = [];
	var exports = [];
	var w, h, x, y;
	var selectedIndustry = '';
	var selectedExport = '';
	
	var paddingTop = 10;
	var paddingBottom = 10;
	var paddingLeft = 10;
	var paddingRight = 10;
	
	var partitionedIndustries;
	var partitionedExports;
	
	var duration = 1000;
	var color = d3.scale.category20c();
	var line = d3.svg.line().interpolate('basis');
	
	this.createExportGraph = function(industryCategories, exportCategories, width, hieght) {
		industries = industryCategories;
		exports = exportCategories;
		w = width;
		h = hieght;
		
		industriesY = d3.scale.linear().range([0, (h - paddingRight) ]);
		industriesX = d3.scale.linear().range([0, (w - paddingBottom) / 5]);
	    
		exportY = d3.scale.linear().range([0, (h - paddingRight) ]);
		exportX = d3.scale.linear().range([((w - paddingBottom) / 5)*2, ((w - paddingBottom) / 5)]);
		
		vis = d3.select("#" + container)
			.append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
		
		var partition = d3.layout.partition()		    
		    .value(function(d) { return d.value; });
		
		partitionedIndustries = partition(industries);
		partitionedExports = partition(exports);
		
		var industryCell = vis.selectAll(".industry-cell")
	      	.data(partitionedIndustries)
		    .enter().append("svg:g")
		    .attr("class", 'industry-cell manufaturing-cell')
		    .attr("transform", function(d) { return "translate(" + industriesX((d.children ? d.y : (d.y - .5))) + "," + industriesY(d.x) + ")"; })
		    .on("click", fadeIndustry());
		
		industryCell.append("svg:rect")
	      	.attr("height", function(d) { return industriesY(d.dx); })
	      	.attr("width", function(d) { return industriesX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(i); })
	      	.attr("class", addIndustryClasses)
	      	.style("stroke", 'white')
		    .style("stroke-opacity", 1);
		
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
		    .on("click", fadeExport());
		
		exportCell.append("svg:rect")
	      	.attr("height", function(d) { return exportY(d.dx); })
	      	.attr("width", function(d) { return exportX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(i); })
	      	.style("stroke", 'white')
	      	.attr("class", addExportClasses)
		    .style("stroke-opacity", 1);
		
		exportCell.append("svg:text")
	      .attr("x", function(d) { return exportX(d.dy + .5) / 2; })
	      .attr("y", function(d) { return exportY(d.dx) / 2; })
	      .attr("width", function(d) { return exportX(d.dy + .5); })
	      .attr("dy", ".35em")
	      .attr("class", 'export-text')
	      .attr("text-anchor", "middle")
	      .text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });
		
		for (exportPartitionIndex in partitionedExports) {
			var partitionedExport = partitionedExports[exportPartitionIndex];
			
			
			for (linkIndex in partitionedExport.data.links) {
				var weight = (partitionedExport.value / partitionedExport.data.links.length) / partitionedExport.value;
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.links[linkIndex].key;
				
				var endPointX = ((w - paddingBottom) / 5)*2;
				var endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
				var startPointX, startPointY;
				
				
				
				for (industryPartitionIndex in partitionedIndustries) {
					var partitionedIndustry = partitionedIndustries[industryPartitionIndex];
					if (partitionedIndustry.data.key == industryKey) {
						startPointX = ((w - paddingBottom) / 5);
						startPointY = industriesY(partitionedIndustry.x) + (industriesY(partitionedIndustry.dx) / 2);
							
						var points = [[startPointX, startPointY], [startPointX*1.1, startPointY], [endPointX*.9, endPointY], [endPointX, endPointY]];
					    vis.append("svg:path")
						    .data([points])
						    .transition()
							.duration(duration)
						    .style("fill", 'none')
						    .style("stroke", 'black')
						    .style("stroke-width", 1)
						    .style("stroke-opacity", weight)
						    .attr('class', 'path industry-' + industryKey + ' export-' + exportKey + ' unique-' + industryKey + exportKey)
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
			.text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });
		
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
			.text(function(d) { return d.children ? null : (exportY(d.dx) > 12 ? d.data.name.slice(0, 30) + '...' : ''); });
		
		vis.selectAll(".export-rectangles")
			.transition()
			.duration(duration)
			.attr("height", function(d) { return exportY(d.dx); });
		
		for (exportPartitionIndex in partitionedExports) {
			var partitionedExport = partitionedExports[exportPartitionIndex];
			
			
			for (linkIndex in partitionedExport.data.links) {
				var weight = (partitionedExport.value / partitionedExport.data.links.length) / partitionedExport.value;
				var exportKey = partitionedExport.data.key;
				var industryKey = partitionedExport.data.links[linkIndex].key;
				
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
		for (var x in industriesExportClasses[d.data.key]){
			classes = classes.concat(industriesExportClasses[d.data.key][x].class + ' ');
		}
			
		return 'rectangles industry-rectangles industry-' + d.data.key + ' ' + classes;
	}
	
	function addExportClasses(d, i) {		
		var classes = '';
		for (var x in exportIndustryClasses[d.data.key]){
			classes = classes.concat(exportIndustryClasses[d.data.key][x].class + ' ');
		}
			
		return 'rectangles export-rectangles export-' + d.data.key + ' ' + classes;
	}
	
	
	/** Returns an event handler for fading a given chord group. */
	function fadeIndustry() {
	  return function(g, i) {
		  if (selectedIndustry == g.data.key) {
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", 1);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", 1);
			    
			    selectedIndustry = '';

		  } else {
			  selectedIndustry = g.data.key;
			  
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", .1);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", 0);
			    
			    vis.selectAll((".industry-" + g.data.key))
			      .transition()
			      .duration(500)
			      .style("opacity", 1)
			      .style("stroke-opacity", 1);
		  }   	    
	  };
	}
	
	/** Returns an event handler for fading a given chord group. */
	function fadeExport() {
	  return function(g, i) {
		  if (selectedExport == g.data.key) {
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", 1);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", 1);
			    
			    selectedExport = '';

		  } else {
			  selectedExport = g.data.key;
			  
			    vis.selectAll(".rectangles")
			      .transition()
			      .style("opacity", .1);
			    
			    vis.selectAll(".path")
			      .transition()
			      .style("stroke-opacity", 0);
			    
			    vis.selectAll((".export-" + g.data.key))
			      .transition()
			      .duration(500)
			      .style("opacity", 1)
			      .style("stroke-opacity", 1);
		  }   	    
	  };
	}
	
}