//google.load("visualization", "1", {packages:["treemap"]});
//google.setOnLoadCallback(drawIndustriesTreeMap);

var industriesExportClasses = [];
var exportIndustryClasses = [];

$(document).ready( function() {
	var title = 'Under Construction.';
	var text = '';
	var subtitle1 = '';
	var subtitle2 = '';
	
	//$('#main-container').empty();
	$('#gdp-container').empty();
	
	
	var industries = getIndustryExportsObject();
	var exportCategories = getExportCategories();
	var exportGraph = new ExportGraph('export-graph');
	exportGraph.createExportGraph(industries, exportCategories, 900, 475);
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
		obj['value'] = exportCategory.export;
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
		total += nz.NZHSC[exports[x]].export;
		nz.NZHSC[exports[x]].links.push({name: parent, key: parent});
		var obj = [];
		obj['name'] = nz.NZHSC[exports[x]].name;
		obj['key'] = exports[x];
		children.push(obj);

	}
	
	return {total: total, children: children};
}
