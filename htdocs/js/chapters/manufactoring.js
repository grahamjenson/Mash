//google.load("visualization", "1", {packages:["treemap"]});
//google.setOnLoadCallback(drawIndustriesTreeMap);

var industriesExportClasses = [];
var exportIndustryClasses = [];

$(document).ready( function() {
	var title = 'So what do we produce in New Zealand, and who\'s buying it?';
	var text = '';
	var subtitle1 = 'Exporting Industry / Export Category / Exporting Destination';
	$('#main-container').css('width', '98%');
	$('#main-container').html(
			"<p><b>" + title + "</b></p>\
			<p style='padding-bottom: 10px'>" + text + "</p>\
			<div>\
				<p style='text-align:center; padding-top:10px;'><b>" + subtitle1 + "</b>\
				<span style='float: right'><input id='resize-export-graph' type='button' value='Maximize' style='width: 70px'/></span></p>\
			</div>\
			<div class='clear'></div>");
	
	$('#gdp-container').remove();
	
	
	var industries = getIndustryExportsObject();
	var exportCategories = getExportCategories();
	var exportGraph = new ExportGraph('export-graph');
	exportGraph.createExportGraph(industries, exportCategories, 920, 475);
	
	$('#resize-export-graph').click(function() {
		if (this.value == 'Maximize') {
			exportGraph.resize(3000);
			$('#export-graph').animate({
				height: '+=2540'
			}, 1300);	
			
			this.value = 'Minimize';
		} else {
			exportGraph.resize(475);
			$('#export-graph').animate({
				height: '-=2540'
			}, 1000, function() {
				
			});	
			this.value = 'Maximize';
		}
	});
});

function drawIndustriesTreeMap() {
	var data = new google.visualization.DataTable();
    data.addColumn('string', 'Industry');
    data.addColumn('string', 'Parent');
    data.addColumn('number', 'Market trade volume (size)');
    data.addColumn('number', 'Colour');
    
    var industryArray = getIndustryExportsObject();
    data.addRows(industryArray);
    
    // Create and draw the visualization.
    var tree = new google.visualization.TreeMap(document.getElementById('bottom-container'));
    tree.draw(data, {
    	headerColor: 'black',
    	headerHeight: '50px',
      minColor: 'blue',
      midColor: 'green',
      maxColor: 'red',
      headerHeight: 15,
      fontColor: 'white'});
}

function getIndustryExportsObject() {
	
	var industryList = [];
	
	for(var x in nz.NZSIC) {
		if (nz.NZSIC[x].exports.length == 0) {
			continue;
		}
		var industry = nz.NZSIC[x];
		var industryExports = nz.NZSIC[x].exports;		
		var totalExports = getTotalIndustryExports(industryExports, x);
		
		var obj = [];
		obj['name'] = industry.name;
		obj['key'] = x;
		obj['value'] = nz.workersByIndustry[x] / nz.workingPopulation;
		obj['links'] = totalExports.children;

		industryList.push(obj);
		// if (industry.name == "Transport, Postal and Warehousing")
		var industryExportClasses = [];
		for (index in industryExports) {
			exportKey = industryExports[index];
			var exportClass = {'class' : ('export-' + exportKey), key : exportKey};
			industryExportClasses.push(exportClass);
			if (exportIndustryClasses[exportKey] == null) {
				exportIndustryClasses[exportKey] = [];
			}
			exportIndustryClasses[exportKey].push({'class': ('industry-' + x), key: x}); 
		}
		industriesExportClasses[x] = industryExportClasses;
		
	}
	
	var obj = [];
	obj['name'] = 'New Zealand';
	obj['children'] = industryList.sort(function(a, b) { return ((a.totalExport > b.totalExport) ? -1 : ((a.totalExport < b.totalExport) ? 1 : 0)); });	
	
	return obj;
}

function getExportCategories() {
	var exportList = [];
	for (x in nz.NZHSC) {
		var exportCategory = nz.NZHSC[x];
		var obj = [];
		obj['name'] = exportCategory.name;
		obj['value'] = exportCategory.exports;
		obj['links'] = nz.NZHSC[x].links;
		obj['key'] = x;
		exportList.push(obj);
	}
	
	var obj = [];
	obj['name'] = 'New Zealand';
	obj['children'] = exportList.sort(function(a, b) { return ((a.totalExport > b.totalExport) ? -1 : ((a.totalExport < b.totalExport) ? 1 : 0)); });
	return obj;
}
 
function getTotalIndustryExports(exports, parent) {

	var total = 0;
	var children = [];
	// nz.NZHSC[exports[x]].name == 'Transportation'
	for (x in exports) {
		if (nz.NZHSC[exports[x]].links == null) {
			nz.NZHSC[exports[x]].links = [];
		}
		total += nz.NZHSC[exports[x]].exports;
		nz.NZHSC[exports[x]].links.push({name: parent, key: parent});
		var obj = [];
		obj['name'] = nz.NZHSC[exports[x]].name;
		obj['key'] = exports[x];
		children.push(obj);

	}
	
	return {total: total, children: children};
}
