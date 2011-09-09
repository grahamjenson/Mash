//google.load("visualization", "1", {packages:["treemap"]});
//google.setOnLoadCallback(drawIndustriesTreeMap);

$(document).ready( function() {
	var title = 'Under Construction.';
	var text = '';
	var subtitle1 = '';
	var subtitle2 = '';
	
	$('#main-container').empty();
	$('#gdp-container').empty();
	
	
	var industries = getIndustryExportsObject();
	var exportCategories = getExportCategories();
	var exportGraph = new ExportGraph('export-graph');
	exportGraph.createExportGraph(industries, exportCategories, 900, 1500);
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
	
	for(x in nz.NZSIC) {
		var industry = nz.NZSIC[x];
		var totalExports = getTotalIndustryExports(nz.NZSIC[x].exports, industry.name);
		var obj = [];
		obj['name'] = industry.name;
		obj['key'] = x;
		obj['totalExport'] = totalExports.total;
		obj['links'] = totalExports.children;

		industryList.push(obj);

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
		obj['totalExport'] = exportCategory.export;
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

	for (x in exports) {
		total += nz.NZHSC[exports[x]].export;
		
		var obj = [];
		obj['name'] = nz.NZHSC[exports[x]].name;
		obj['key'] = x;
		children.push(obj);

	}
	
	return {total: total, children: children};
}
