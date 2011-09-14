var exportIndustryClasses = [];
var exportCategoryClasses = [];
var exportCountryClasses = [];

$(document).ready( function() {

	$('#bubble-chart').remove();
	
	// THis is hacked and needs to be done in a specific order to obtain links.
	var industries = getIndustryExportsObject();
	var countries = getExportCountries();
	var categories = getExportCategories();
	
	
	var exportGraph = new ExportGraph('export-graph');
	exportGraph.createExportGraph(industries, categories, countries, 955, 475);
	$('#resize-export-graph').button({ icons: {primary: "ui-icon-arrow-4-diag"} });
	$('#resize-export-graph').toggle(function() {		
			exportGraph.resize(3000);
			$('#export-graph').animate({
				height: '+=2540'
			}, 1300);			
			$('#resize-export-graph span').html('Minimize');
		}, function() {
			exportGraph.resize(475);
			$('#export-graph').animate({
				height: '-=2540'
			}, 1000, function() {
				
			});	
			$('#resize-export-graph span').html('Maximize');
	});
});

function getExportCountries() {
	
	var countryList = [];
	
	for(var x in nz.ExportCountries) {
		var exportCountry = nz.ExportCountries[x];
		var exportCountryTotals = getTotalExportCountries(exportCountry.nzimports, x);
		
		var obj = [];
		obj['name'] = exportCountry.name;
		obj['key'] = x;
		obj['value'] = exportCountryTotals.total;
		obj['imports'] = exportCountry.nzimports;
		countryList.push(obj);
		
		var exportClasses = [];
		for (index in exportCountry.nzimports) {
			exportKey = index;
			var exportClass = {'class' : ('export-' + exportKey), key : exportKey};
			exportClasses.push(exportClass);
			if (exportCategoryClasses[exportKey] == null) {
				exportCategoryClasses[exportKey] = [];
			}
			exportCategoryClasses[exportKey].push({'class': ('country-' + x), key: x}); 
		}
		exportCountryClasses[x] = exportClasses;
	}
	
	
	
	var obj = [];
	obj['name'] = 'Earth';
	obj['children'] = countryList;	
	
	return obj;
	
}

function getTotalExportCountries(exports, parent) {
	var total = 0;
	var children = [];

	for (x in exports) {
		if (nz.NZHSC[x].countryLinks == null) {
			nz.NZHSC[x].countryLinks = [];
		}
		total += exports[x];
		nz.NZHSC[x].countryLinks.push({name: parent, key: parent});
		var obj = [];
		obj['name'] = parent;
		obj['key'] = parent;
		children.push(obj);

	}
	
	return {total: total, children: children};
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
		

		industryList.push(obj);

		var industryExportClasses = [];
		for (index in industryExports) {
			exportKey = industryExports[index];
			var exportClass = {'class' : ('export-' + exportKey), key : exportKey};
			industryExportClasses.push(exportClass);
			if (exportCategoryClasses[exportKey] == null) {
				exportCategoryClasses[exportKey] = [];
			}
			exportCategoryClasses[exportKey].push({'class': ('industry-' + x), key: x}); 
		}
		exportIndustryClasses[x] = industryExportClasses;
		
	}
	
	var obj = [];
	obj['name'] = 'New Zealand';
	obj['children'] = industryList;	
	
	return obj;
}

function getExportCategories() {
	var exportList = [];
	for (x in nz.NZHSC) {
		var exportCategory = nz.NZHSC[x];
		var obj = [];
		obj['name'] = exportCategory.name;
		obj['value'] = exportCategory.exports;
		obj['industryLinks'] = nz.NZHSC[x].industryLinks;
		obj['countryLinks'] = nz.NZHSC[x].countryLinks;
		obj['key'] = x;
		exportList.push(obj);
	}
	
	var obj = [];
	obj['name'] = 'New Zealand';
	obj['children'] = exportList;
	return obj;
}
 
function getTotalIndustryExports(exports, parent) {

	var total = 0;
	var children = [];
	// nz.NZHSC[exports[x]].name == 'Transportation'
	for (x in exports) {
		if (nz.NZHSC[exports[x]].industryLinks == null) {
			nz.NZHSC[exports[x]].industryLinks = [];
		}
		total += nz.NZHSC[exports[x]].exports;
		nz.NZHSC[exports[x]].industryLinks.push({name: parent, key: parent});
		var obj = [];
		obj['name'] = nz.NZHSC[exports[x]].name;
		obj['key'] = exports[x];
		children.push(obj);

	}
	
	return {total: total, children: children};
}
