google.load("visualization", "1", {packages:["treemap"]});
google.setOnLoadCallback(drawIndustriesTreeMap);

$(document).ready( function() {
	var title = 'Under Construction.';
	var text = '';
	var subtitle1 = '';
	var subtitle2 = '';
	
	$('#main-container').destroy();
	$('#gdp-container').destroy();
	
	
	//getIndustryExportsObject();
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
	var obj = [];
	obj[0] = 'New Zealand';
	obj[1] = null;
	obj[2] = 0;
	obj[3] = 0;
	industryList.push(obj);
	

	var fdas = nz.NZSIC.length;
	var colour = d3.scale.linear().domain([0, 21]).rangeRound([-100, 100]);
	var index = 0;
	
	for(x in nz.NZSIC) {
		var industry = nz.NZSIC[x];
		var totalExports = getTotalIndustryExports(nz.NZSIC[x].exports, industry.name);
		var obj = [];
		obj[0] = industry.name;
		obj[1] = 'New Zealand';
		obj[2] = totalExports.total;
		obj[3] = colour(index);
		industryList.push(obj);
		
		for (y in totalExports.children) {
			industryList.push(totalExports.children[y]);
		}
		
		index++;
	}
	
	return industryList;
}

function getTotalIndustryExports(exports, parent) {
	var color = d3.scale.linear().domain([0, exports.length]).rangeRound([-100, 100]);
	var total = 0;
	var children = [];
	var index = 0;
	for (x in exports) {
		total += nz.NZHSC[exports[x]].export;
		var i=total;
		var obj = [];
		obj[0] = nz.NZHSC[exports[x]].name;
		obj[1] = parent;
		obj[2] = total;
		obj[3] = color(index);
		children.push(obj);
		index++;
	}
	
	return {total: total, children: children};
}
