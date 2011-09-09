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
	
	var paddingTop = 10;
	var paddingBottom = 10;
	var paddingLeft = 10;
	var paddingRight = 10;
	
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
		
		var vis = d3.select("#" + container)
			.append("svg:svg")
		    .attr("width", w)
		    .attr("height", h);
		
		var partition = d3.layout.partition()		    
		    .value(function(d) { return d.totalExport; });
		
		var partitionedIndustries = partition(industries);
		var partitionedExports = partition(exports);
		
		var industryCell = vis.selectAll(".industry-cell")
	      	.data(partitionedIndustries)
		    .enter().append("svg:g")
		    .attr("class", "industry-cell")
		    .attr("transform", function(d) { return "translate(" + industriesX((d.children ? d.y : (d.y - .5))) + "," + industriesY(d.x) + ")"; });
		
		industryCell.append("svg:rect")
	      	.attr("height", function(d) { return industriesY(d.dx); })
	      	.attr("width", function(d) { return industriesX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(d.data.name); })
	      	.style("stroke", 'white')
		    .style("stroke-opacity", 1);
		
		industryCell.append("svg:text")
	      .attr("x", function(d) { return industriesX(d.dy + .5) / 2; })
	      .attr("y", function(d) { return industriesY(d.dx) / 2; })
	      .attr("width", function(d) { return industriesX(d.dy + .5); })
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text(function(d) { return d.children ? null : (d.dx > .04 ? d.data.name : ''); });
	      	//.on("mouseover", fade(.1));
		
		var exportCell = vis.selectAll(".export-cell")
	      	.data(partitionedExports)
		    .enter().append("svg:g")
		    .attr("class", "export-cell")
		    .attr("transform", function(d) { return "translate(" + exportX((d.children ? d.y : (d.y - .5))) + "," + exportY(d.x) + ")"; });
		
		exportCell.append("svg:rect")
	      	.attr("height", function(d) { return exportY(d.dx); })
	      	.attr("width", function(d) { return exportX(d.dy + .5); })
	      	.attr("fill", function(d, i) { return color(d.data.name); })
	      	.style("stroke", 'white')
		    .style("stroke-opacity", 1);
		
		exportCell.append("svg:text")
	      .attr("x", function(d) { return exportX(d.dy + .5) / 2; })
	      .attr("y", function(d) { return exportY(d.dx) / 2; })
	      .attr("width", function(d) { return exportX(d.dy + .5); })
	      .attr("dy", ".35em")
	      .attr("text-anchor", "middle")
	      .text(function(d) { return d.children ? null : (d.dx > .01 ? d.data.name : ''); });
		
		for (industryPartitionIndex in partitionedIndustries) {
			var partitionedIndustry = partitionedIndustries[industryPartitionIndex];
			
			for (linkIndex in partitionedIndustry.data.links) {
				
				var industryKey = partitionedIndustry.data.links[linkIndex].key;
				var startPointX = (w - paddingBottom) / 5;
				var startPointY = industriesY(partitionedIndustry.x) + (industriesY(partitionedIndustry.dx) / 2);
				var endPointX, endPointY;
				for (exportPartitionIndex in partitionedExports) {
					var partitionedExport = partitionedExports[exportPartitionIndex];
					if (partitionedExport.data.key == industryKey) {
						endPointX = ((w - paddingBottom) / 5)*2;
						endPointY = exportY(partitionedExport.x) + (exportY(partitionedExport.dx) / 2);
						var points = [[startPointX, startPointY], [startPointX*1.1, startPointY], [endPointX*.9, endPointY], [endPointX, endPointY]];
					    vis.append("svg:path")
						    .data([points])
						    .transition()
							.duration(duration)
						    .attr("class", "path")
						    .style("fill", 'none')
						    .style("stroke", 'black')
						    .style("stroke-width", 1)
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
	
}