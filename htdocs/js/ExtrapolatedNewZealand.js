//util functions
function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}

function truncate(n) {
  return Math[n > 0 ? "floor" : "ceil"](n);
}

function Round(Number, DecimalPlaces) {
   return Math.round(parseFloat(Number) * Math.pow(10, DecimalPlaces)) / Math.pow(10, DecimalPlaces);
}


function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
    return sourceArray
}

//This is what New Zealand was in 2009
function NewZealand()
{
	//UTILITY METHODS
	this._listeners = []
	this.addListener = function(listner)
	{
		this._listeners.push(listner)
	}
	
	this._firechanged = function()
	{
		for(var l in this._listeners)
		{
			this._listeners[l]();
		}
	}
	
	

	//API methods for ALEX that will never change
	
	//OUTPUT
	
	//returns double
	this.gdp = function(){throw "Not implemented YET"}

	//returns double
	this.gdppc = function(){throw "Not implemented YET"}

	//returns double	
	this.avgwork = function(){throw "Not implemented YET"}

	//returns double
	this.avgwage = function(){throw "Not implemented YET"}
	
	//returns number of tourists in the country on an average day
	this.touristsInCountryToday = function(){throw "Not implemented YET"}
	
	this.totaltourismworkers = function(){throw "Not implemented YET"}
	
	
	//INPUT
	
	//returns nothing
	this.setTourists = function(t){throw "Not implemented YET"}
	
	//returns nothing
	this.setWorkers = function(industry,workers){throw "Not implemented YET"}
	
	
	this.setMiningGrowth = function(oilgrowth, coalgrowth, metalsgrowth){throw "Not implemented YET"}
	
	//
	this.setCows = function(cows){throw "Not implemented YET"}
	
	//READONLY Variables FOR ALEX
	this.workersByIndustry = {}
	this.tourismWorkersByIndustry = {}
	this.touristsByRegion = {}
	this.tourists = 2499102 //source tourism satelitte
	
	this.dairycattlebyregion = {}
	this.dairycattledensity = -1
	this.dairylandusagebyregion = {}
	
	//END OF API
	
	//Static 
	var population = 4315800;
	var noOfIndustries = 21;
	this.workingPopulation = 2333960;
	var touristsperworker = 26.900990312163618;
	this.humandensity = 16.4 //cite wiki
	
	//Using NZSIC06, similar to ANZSIC06, but breaks apart agriculture and foresty two larger industries in NZ
	this.NZSIC =
	{
		agriculture : 		{name: "Agriculture"},
		forestry :		{name:"Forestry and Logging"},
		fishing: 		{name:"Fishing and Aquaculture"},
		mining : 		{name: "Mining"},
		manufacturing : 	{name: "Manufacturing"},
		ele_gas_wat_was : 	{name: "Electricity, Gas, Water and Waste Services"},
		construction : 		{name: "Construction"},
		whole : 		{name: "Wholesale Trade"},
		retail: 		{name: "Retail Trade"},
		acc_food : 		{name: "Accommodation and Food Services"},
		tran_post_ware : 	{name: "Transport, Postal and Warehousing"},
		inform_tele : 		{name: "Information Media and Telecommunications"},
		fin_ins : 		{name: "Financial and Insurance Services"},
		rent_hir_real : 	{name: "Rental, Hiring and Real Estate Services"},
		prof_sci_tech : 	{name: "Professional, Scientific, and Technical Services"},
		admin_sup : 		{name: "Administrative and Support Services"},
		pub_admin_saftey: 	{name: "Public Administration and Safety"},
		edu_train : 		{name: "Education and Training"},
		health_social : 	{name: "Health Care and Social Assistance"},
		arts_rec : 		{name: "Arts and Recreation Services and Other Services"},
		no_class : 		{name: "Not elsewhere classified"}
	};
	
	//Regions
	this.Region =
	{
		northland : 			{name : "Northland"},
		auckland : 			{name : "Auckland"}, 			
		waikato: 			{name : "Waikato"},
		bop:	 			{name : "Bay of Plenty"},
		gisborne:			{name : "Gisborne"},
		hawkesbay:			{name : "Hawkes Bay"},
		manawatu: 			{name : "Manawatu"},
		taranaki:			{name : "Taranaki"},
		wellington: 			{name : "Wellington"},
		nelson: 			{name : "Nelson"},
		marlborough: 			{name : "Marlborough"},
		tasman: 			{name : "Tasman"},
		canterbury: 			{name : "Canterbury"},
		westCoast: 			{name : "West Coast"},
		otago: 				{name : "Otago"},
		southland: 			{name : "Southland"}
	};
	
	
	//END OF STATIC VARIABLES
	
	//people employed per industry and median wage per industry
	this.workersByIndustry.agriculture = 119710;	
	this.workersByIndustry.forestry = 5400;
	this.workersByIndustry.fishing = 4180;
	this.workersByIndustry.mining = 6670;
	this.workersByIndustry.manufacturing = 264540;
	this.workersByIndustry.ele_gas_wat_was = 13910;	
	this.workersByIndustry.construction = 186860;		
	this.workersByIndustry.whole = 120660;
	this.workersByIndustry.retail = 226640;	
	this.workersByIndustry.acc_food = 150020;	
	this.workersByIndustry.tran_post_ware = 98370;	
	this.workersByIndustry.inform_tele = 47040;	
	this.workersByIndustry.fin_ins = 62150;	
	this.workersByIndustry.rent_hir_real = 50770;	
	this.workersByIndustry.prof_sci_tech = 201870;	
	this.workersByIndustry.admin_sup = 121340;
	this.workersByIndustry.pub_admin_saftey = 106370;		
	this.workersByIndustry.edu_train = 177130;		
	this.workersByIndustry.health_social = 194520;		
	this.workersByIndustry.arts_rec = 119960;		
	this.workersByIndustry.no_class = 21490;		
	

	//WAGES
	this.NZSIC.agriculture.wage = 23550;
	this.NZSIC.forestry.wage = 37360;
	this.NZSIC.fishing.wage = 35000;
	this.NZSIC.prof_sci_tech.wage = 47430;
	this.NZSIC.rent_hir_real.wage = 32220;			
	this.NZSIC.fin_ins.wage = 50310;	
	this.NZSIC.inform_tele.wage = 45700;	
	this.NZSIC.tran_post_ware.wage = 40190;	
	this.NZSIC.acc_food.wage = 	14090;
	this.NZSIC.retail.wage = 23340;	
	this.NZSIC.whole.wage = 42820;	
	this.NZSIC.construction.wage = 39200;	
	this.NZSIC.ele_gas_wat_was.wage = 47380;		
	this.NZSIC.manufacturing.wage = 40460;
	this.NZSIC.mining.wage = 60670;
	this.NZSIC.admin_sup.wage = 20690;
	this.NZSIC.pub_admin_saftey.wage = 50760;
	this.NZSIC.edu_train.wage = 40160;
	this.NZSIC.health_social.wage = 35990;
	this.NZSIC.arts_rec.wage = 29920;
	this.NZSIC.no_class.wage = 11110;
	
	
	//Had to divide up the support services as they are separate 
	var ag_fish_for_support_people = 34360;
	var ag_fish_for_support_wage = 18000;
	
	var totalSupported = this.workersByIndustry.agriculture + this.workersByIndustry.forestry + this.workersByIndustry.fishing;

	var agchange = ag_fish_for_support_people * this.workersByIndustry.agriculture/totalSupported;
	var agwagetotal = this.workersByIndustry.agriculture * this.NZSIC.agriculture.wage + (agchange * ag_fish_for_support_wage);
	this.workersByIndustry.agriculture += agchange;
	this.NZSIC.agriculture.wage = agwagetotal / this.workersByIndustry.agriculture;

	var forestc = ag_fish_for_support_people * this.workersByIndustry.forestry/totalSupported;
	var forwagetotal = this.workersByIndustry.forestry * this.NZSIC.forestry.wage + (forestc * ag_fish_for_support_wage);
	this.workersByIndustry.forestry += forestc;
	this.NZSIC.forestry.wage = forwagetotal /this.workersByIndustry.forestry;

	var fishc = ag_fish_for_support_people * this.workersByIndustry.fishing/totalSupported;
	var fishwagetotal = this.workersByIndustry.fishing * this.NZSIC.fishing.wage + (fishc * ag_fish_for_support_wage);
	this.workersByIndustry.fishing += fishc;
	this.NZSIC.fishing.wage = fishwagetotal / this.workersByIndustry.fishing;

	
	//SET UP DEFAULTS
	for(var x in this.NZSIC)
	{
		this.NZSIC[x].defaultWorkerDistribution = this.workersByIndustry[x] / this.workingPopulation
	}
	
	//GDP Per Industry 2009, source GDP quartley report						
	var GDP =
	{
		agriculture : 			6666000000,
		fishing_forestry_mining : 	3267000000 ,
		manufacturing : 		17555000000,
		electricity_gas_water: 		2535000000,
		construction : 			5991000000,
		wholesale_trade : 		9982000000,
		retail_acc_food : 		10047000000,
		transport_communications : 	14357000000,
		finance_insurance_business : 	37513000000,
		gov_admin_defence : 		6704000000,
		personal_community : 		16080000000,
		not_specified : 		3941000000
	};

	//GDP per worker in industry Total GDP / Number of Wrokers in Industry

	//Clear Conversion
	this.NZSIC.agriculture.gdppc = GDP.agriculture/ this.workersByIndustry.agriculture;
	this.NZSIC.manufacturing.gdppc = GDP.manufacturing / this.workersByIndustry.manufacturing;
	this.NZSIC.ele_gas_wat_was.gdppc = GDP.electricity_gas_water / this.workersByIndustry.ele_gas_wat_was;	
	this.NZSIC.construction.gdppc = GDP.construction / this.workersByIndustry.construction;		
	this.NZSIC.whole.gdppc = GDP.wholesale_trade / this.workersByIndustry.whole;
	this.NZSIC.fin_ins.gdppc = GDP.finance_insurance_business / this.workersByIndustry.fin_ins;

	this.NZSIC.no_class.gdppc = GDP.not_specified / this.workersByIndustry.no_class;

	//About the smae
	this.NZSIC.pub_admin_saftey.gdppc = GDP.gov_admin_defence / this.workersByIndustry.pub_admin_saftey;	

	//grouped
	var totffm = this.workersByIndustry.forestry + this.workersByIndustry.fishing + this.workersByIndustry.mining;
	var gdpffm = GDP.fishing_forestry_mining / totffm;
	this.NZSIC.forestry.gdppc = gdpffm;
	this.NZSIC.fishing.gdppc = gdpffm;
	this.NZSIC.mining.gdppc = gdpffm;

	var totrc = this.workersByIndustry.retail + this.workersByIndustry.acc_food;
	var gdprc = GDP.retail_acc_food / totrc;
	this.NZSIC.retail.gdppc = gdprc;
	this.NZSIC.acc_food.gdppc = gdprc;

	var tottc = this.workersByIndustry.tran_post_ware + this.workersByIndustry.inform_tele;
	var gdptc = GDP.retail_acc_food / tottc;
	this.NZSIC.tran_post_ware.gdppc = gdptc;
	this.NZSIC.inform_tele.gdppc = gdptc;

	//I am giong to estimate these via Australian info since Athis.NZSIC06 is not being used for our GDP measurement.
	this.NZSIC.rent_hir_real.gdppc = 45797.5113122172;	
	this.NZSIC.prof_sci_tech.gdppc = 34789.1373801917;	
	this.NZSIC.admin_sup.gdppc = 15598.2073265783;		
	this.NZSIC.edu_train.gdppc = 15896.7069414831;	
	this.NZSIC.health_social.gdppc = 16461.1307420495;	
	this.NZSIC.arts_rec.gdppc = 16035.1317440402;	

		
	//Work hours per Industry per capita 2009, source QES quartley dec 2009 by  totalweekly hours / jobsfilled
	var QES = 
	{
		forestry_mining	: 			38.4,//
		manufacturing :				35.6,//
		electricity_gas_water_waste	: 	36.7,//
		construction	: 			30.4,//
		wholesale	: 			33.4,//
		retail	: 				26.2,//
		accommodation_food : 			21.5,//
		transport_postal_warehousing	: 	34.2,//
		information_media_tele	: 		31.3,//
		finance_insurance	: 		32.0,//
		rental_hiring_realestate	: 	25.9,//
		professional_sci_technical_admin: 	28.3,//
		public_administration_safety	: 	34.3,//
		education_training	: 		28.7,//
		health_social	: 			27.1,//
		arts_recreation_other	: 		24.7//
	};

	//clear mapping
	this.NZSIC.manufacturing.work = QES.manufacturing;
	this.NZSIC.prof_sci_tech.work = QES.professional_sci_technical_admin;
	this.NZSIC.ele_gas_wat_was.work = QES.electricity_gas_water_waste;
	this.NZSIC.construction.work = QES.construction;
	this.NZSIC.whole.work = QES.wholesale;
	this.NZSIC.retail.work = QES.retail;
	this.NZSIC.acc_food.work = QES.accommodation_food;
	this.NZSIC.tran_post_ware.work = QES.transport_postal_warehousing;
	this.NZSIC.inform_tele.work = QES.information_media_tele;

	this.NZSIC.fin_ins.work = QES.finance_insurance;
	this.NZSIC.rent_hir_real.work = QES.rental_hiring_realestate;	

	
	this.NZSIC.pub_admin_saftey.work = QES.public_administration_safety;		
	this.NZSIC.edu_train.work = QES.education_training;
	this.NZSIC.health_social.work = QES.health_social;		
	this.NZSIC.arts_rec.work = QES.arts_recreation_other;	
	

	//grouping
	this.NZSIC.forestry.work = QES.forestry_mining;
	this.NZSIC.mining.work = QES.forestry_mining;


	//We use Australian Statistics for these variables
	this.NZSIC.admin_sup.work = 38.9;
	this.NZSIC.no_class.work = 38.1;

	//This is currently guess work, as there seem to be little to no information on this. So here it goes	
	this.NZSIC.agriculture.work = 40;
	this.NZSIC.fishing.work = 40;

	//Some utility functions
	this.gdp = function()
	{
		var gdp = 0;
		for(var x in this.NZSIC)
		{
			gdp += this.NZSIC[x].gdppc * this.workersByIndustry[x]
		}
	
		return gdp

	}

	this.gdppc = function()
	{
	
		return this.gdp()/population
	}
	
	this.avgwork = function()
	{
		var totwork = 0;
		var totpeople = 0;
		for(var x in this.NZSIC)
		{
			totwork += this.NZSIC[x].work * this.workersByIndustry[x]
		}
		return totwork/this.workingPopulation
	}

	this.avgwage = function()
	{
		var totwage = 0;
		for(var x in this.NZSIC)
		{
			totwage += this.NZSIC[x].wage * this.workersByIndustry[x]
		}
		return totwage/this.workingPopulation
	}



	//The problem with these guesses is that they will not corrospond to the information from other countries,
	//So to make them more accurate we need to scale the numbers

	//Scaling Hours worked per week, to OECD numbers from http://stats.oecd.org/
	var OECDWorkPerWeek = 37.4
	var avgw = this.avgwork()
	for(var x in this.NZSIC) {this.NZSIC[x].work =  this.NZSIC[x].work * OECDWorkPerWeek/avgw }


	//Scaling GDPPC
	var gdppcInUSD2000 = 23746; // 2009 GDP Per head, US $, constant prices, constant PPPs, OECD base year , source: http://stats.oecd.org/
	var USDtoNZD2000 = 2.20; // mean over 2000, source http://www.oanda.com/currency/average
	var gdppcT = USDtoNZD2000 * gdppcInUSD2000
	var gdpT = gdppcT * population
	var scale = gdpT/this.gdp()

	for(var x in this.NZSIC) {this.NZSIC[x].gdppc =  this.NZSIC[x].gdppc * scale }

	//Scaling Wage
	var averageWage = 43524 //source NZStats weeklyincome*52
	var scale = averageWage/this.avgwage()
	for(var x in this.NZSIC) {this.NZSIC[x].wage =  this.NZSIC[x].wage * scale }




	//tourism section, from the 2010 tourism satalite
	var tourismworkers = 92900
	this.Tourism = {
		accom : 13600/tourismworkers,
		cafes_res : 20000/tourismworkers,
		g_trans : 5300/tourismworkers,
		a_trans : 7300/tourismworkers,
		o_trans : 4600/tourismworkers,
		mech_hire : 1200/tourismworkers,
		cult : 5800/tourismworkers,
		retail : 21700/tourismworkers,
		tour : 13400/tourismworkers
		
	}
	
	this.NZSIC.retail.tourism_dist = this.Tourism.retail;
	
	this.NZSIC.acc_food.tourism_dist = (this.Tourism.accom + this.Tourism.cafes_res) ;
	
	this.NZSIC.tran_post_ware.tourism_dist = (this.Tourism.g_trans + this.Tourism.a_trans + this.Tourism.o_trans);

	this.NZSIC.rent_hir_real.tourism_dist = this.Tourism.mech_hire;	
	
	this.NZSIC.arts_rec.tourism_dist = this.Tourism.cult;	

	
	//This is a guess about likely other tourist industries
	
	var ppleleft = this.workersByIndustry.manufacturing + this.workersByIndustry.prof_sci_tech + this.workersByIndustry.ele_gas_wat_was + this.workersByIndustry.construction + this.workersByIndustry.whole + this.workersByIndustry.inform_tele + this.workersByIndustry.fin_ins + this.workersByIndustry.pub_admin_saftey + this.workersByIndustry.edu_train + this.workersByIndustry.health_social + this.workersByIndustry.forestry + this.workersByIndustry.mining + this.workersByIndustry.admin_sup + this.workersByIndustry.no_class + this.workersByIndustry.agriculture + this.workersByIndustry.fishing;
	
	this.NZSIC.manufacturing.tourism_dist = this.Tourism.tour * (this.workersByIndustry.manufacturing/ppleleft);
	this.NZSIC.prof_sci_tech.tourism_dist = this.Tourism.tour * (this.workersByIndustry.prof_sci_tech/ppleleft);;
	this.NZSIC.ele_gas_wat_was.tourism_dist = this.Tourism.tour * (this.workersByIndustry.ele_gas_wat_was/ppleleft);;
	this.NZSIC.construction.tourism_dist = this.Tourism.tour * (this.workersByIndustry.construction/ppleleft);;
	this.NZSIC.whole.tourism_dist = this.Tourism.tour * (this.workersByIndustry.whole/ppleleft);;
	this.NZSIC.inform_tele.tourism_dist = this.Tourism.tour * (this.workersByIndustry.inform_tele/ppleleft);;
	this.NZSIC.fin_ins.tourism_dist = this.Tourism.tour * (this.workersByIndustry.fin_ins/ppleleft);;
	this.NZSIC.pub_admin_saftey.tourism_dist = this.Tourism.tour * (this.workersByIndustry.pub_admin_saftey/ppleleft);;	
	this.NZSIC.edu_train.tourism_dist = this.Tourism.tour * (this.workersByIndustry.edu_train/ppleleft);;
	this.NZSIC.health_social.tourism_dist = this.Tourism.tour * (this.workersByIndustry.health_social/ppleleft);;	
	this.NZSIC.forestry.tourism_dist = this.Tourism.tour * (this.workersByIndustry.forestry/ppleleft);;
	this.NZSIC.mining.tourism_dist = this.Tourism.tour * (this.workersByIndustry.mining/ppleleft);;
	this.NZSIC.admin_sup.tourism_dist = this.Tourism.tour * (this.workersByIndustry.admin_sup/ppleleft);;	
	this.NZSIC.no_class.tourism_dist = this.Tourism.tour * (this.workersByIndustry.no_class/ppleleft);;	
	this.NZSIC.agriculture.tourism_dist = this.Tourism.tour * (this.workersByIndustry.agriculture/ppleleft);;	
	this.NZSIC.fishing.tourism_dist = this.Tourism.tour * (this.workersByIndustry.fishing/ppleleft);

	
	
	//SETS THE INITIAL TOURISM WORKERS
	for(var x in this.NZSIC)
	{
		this.tourismWorkersByIndustry[x] = this.NZSIC[x].tourism_dist * (this.tourists / touristsperworker)
	}
	
	
	this.totaltourismworkers = function()
	{
		var workers = 0;
		
		for(var x in this.tourismWorkersByIndustry)
		{
			workers += this.tourismWorkersByIndustry[x]
		}
	
		return workers
		
	}
	
	//percent of beds taken source http://www.stats.govt.nz/browse_for_stats/industry_sectors/accommodation/Accommodation-Survey_HOTPFeb11/Commentary.aspx
	var guestnights = 
	{
		Northland:			135.6666666667,
		Auckland:			477.8333333333,
		Waikato:			223.6666666667,
		BayofPlenty:			259.5,
		HawkeBayGisborne:		104.1666666667,
		TaranakiManawatu:	137.0833333333,
		Wellington:			215.9166666667,
		NelsonMarlboroughTasman:	157.5833333333,
		Canterbury:			429.1666666667,
		WestCoast:			97.4166666667,
		Otago:				370.25,
		Southland:			70
	}
	
	var totalGN = 0;
	for(var loc in guestnights)
	{
		totalGN += guestnights[loc];
	}
	
	this.Region.northland.touristsdist 	= guestnights.Northland / totalGN;
	this.Region.auckland.touristsdist  	= guestnights.Auckland / totalGN;		
	this.Region.waikato.touristsdist 	= guestnights.Waikato / totalGN; 		
	this.Region.bop.touristsdist 		= guestnights.BayofPlenty / totalGN;	 		
	this.Region.gisborne.touristsdist 	= (guestnights.HawkeBayGisborne / 2) / totalGN;			
	this.Region.hawkesbay.touristsdist 	= (guestnights.HawkeBayGisborne / 2) / totalGN;			
	this.Region.manawatu.touristsdist 	= (guestnights.TaranakiManawatu / 2) / totalGN; 			
	this.Region.taranaki.touristsdist 	= (guestnights.TaranakiManawatu / 2) / totalGN;			
	this.Region.wellington.touristsdist 	= guestnights.Wellington / totalGN; 			
	this.Region.nelson.touristsdist 	= (guestnights.NelsonMarlboroughTasman/3) / totalGN; 			
	this.Region.marlborough.touristsdist 	= (guestnights.NelsonMarlboroughTasman/3) / totalGN; 			
	this.Region.tasman.touristsdist 	= (guestnights.NelsonMarlboroughTasman/3) / totalGN; 			
	this.Region.canterbury.touristsdist 	= guestnights.Canterbury / totalGN; 		
	this.Region.westCoast.touristsdist 	= guestnights.WestCoast / totalGN; 			
	this.Region.otago.touristsdist 		= guestnights.Otago / totalGN; 			
	this.Region.southland.touristsdist 	= guestnights.Southland / totalGN; 	
	
	for(var loc in this.Region)
	{
			this.touristsByRegion[loc] = this.Region[loc].touristsdist * this.tourists;
		
	}
	
	var occupancypercent =
	{
		northland:			38.9166666667,
		auckland:			59.3083333333,
		waikato:			43.0416666667,
		bop:				48.775,
		gisborne:			45.2333333333,
		hawkesbay:			45.2333333333,
		taranaki:			35.55,
		manawatu: 			35.55,
		wellington:			55.4333333333,
		nelson:				42.2416666667,
		marlborough:			42.2416666667,
		tasman:				42.2416666667,
		canterbury:			49.1833333333,
		westCoast:			39.4916666667,
		otago:				53.2166666667,
		southland:			39.5083333333

	}
	
	for(var loc in this.Region)
	{
			this.Region[loc].capacity = this.touristsByRegion[loc] / (occupancypercent[loc]/100);
	}
	

	
	//aerage length of stay source http://www.tourismresearch.govt.nz/Data--Analysis/Analytical-Tools/International-Visitor-Value/
	this.touristsInCountryToday = function()
	{
		return this.tourists * 20.3922905527/365;
	}


	
	
	//TODO more milk source: http://www.stats.govt.nz/browse_for_stats/industry_sectors/agriculture-horticulture-forestry/AgriculturalProduction_HOTPJun09final.aspx
		//source: http://www.stats.govt.nz/browse_for_stats/industry_sectors/agriculture-horticulture-forestry/2007-agricultural-census-tables/land-use-farm-counts.aspx
	//TODO Cow density

	//source:http://www.stats.govt.nz/browse_for_stats/industry_sectors/agriculture-horticulture-forestry/~/media/Statistics/browse-categories/industry-sectors/agriculture-horticulture-forestry/2003-agricultural-production-survey-tables/hectares-used-farms-land-use-region.ashx 
	
	
	this.dairycattlebyregion =
	{
		northland:			393000,
		auckland:			94000,
		waikato:			1787000,
		bop:				300000,
		gisborne:			16000, //2008 figure
		hawkesbay:			94000,
		taranaki:			607000,
		manawatu: 			425000,
		wellington:			85000,
		nelson:				1000, //smallest figure
		marlborough:			16000,
		tasman:				87000,
		canterbury:			918000,
		westCoast:			179000,
		otago:				257000,
		southland:			589000
	}
	

	
	this.Region.northland.land=			7942
	this.Region.auckland.land=			2979
	this.Region.waikato.land=			16843
	this.Region.bop.land=				6226
	this.Region.gisborne.land=			6725
	this.Region.hawkesbay.land=			9589
	this.Region.taranaki.land=			4510
	this.Region.manawatu.land= 			15453
	this.Region.wellington.land=			5115
	this.Region.nelson.land=			445 //wiki
	this.Region.marlborough.land=			6512
	this.Region.tasman.land=			2666
	this.Region.canterbury.land=			31232
	this.Region.westCoast.land=			23276 //wiki
	this.Region.otago.land=				23346
	this.Region.southland.land=			11867

	
	var totaldairylandusage = 19627
	
	this.dairylandusagebyregion = {}
	
	this.totalland = 0
	this.totaldairycattle = 0
	
	for(var loc in this.Region)
	{
			this.Region[loc].potentialfarmland = this.Region[loc].land * .8	//source http://motu-www.motu.org.nz/wpapers/09_17.pdf
			this.totalland += this.Region[loc].land
			this.totaldairycattle += this.dairycattlebyregion[loc]
	}	
	
	var dairycattleperkm  = this.totaldairycattle/totaldairylandusage
	var agworkerspercow = this.workersByIndustry.agriculture / this.totaldairycattle //THIS IS FLAT Wrong, the amount of dairy workers != ag workers.
	
	for(var loc in this.Region)
	{
			this.dairylandusagebyregion[loc] = this.dairycattlebyregion[loc] / dairycattleperkm
			this.Region[loc].distdairyprod = this.dairycattlebyregion[loc] / this.totaldairycattle
	}
	
	
	//Alters dairycattlecows by region, dairy land usage by region, and workersbyIndustry
	
	this.setCows = function(cows)
	{
		this.totaldairycattle = cows
		
		
		for(var loc in this.Region)
		{
			this.dairycattlebyregion[loc] = this.Region[loc].distdairyprod * this.totaldairycattle
			this.dairylandusagebyregion[loc] = this.dairycattlebyregion[loc] / dairycattleperkm
		}
		
		this.dairycattledensity = this.totaldairycattle / this.totalland
		
		this.setWorkers("agriculture",agworkerspercow*this.totaldairycattle)
	}
	
	//Mining source 1 : http://www.minerals.co.nz/pdf/Natural_Resource_NZ_web.pdf
	//source 2 = http://www.nzpam.govt.nz/cms/xls-library/minerals-facts-figures/2009%20Mining%20Production%20Stats.xls

	
	//Note these measurtes are not GDP, but total value
	this.currentoilandgas = 3000000000; //source 1
	this.currentcoal = 	300000000; //source 1
	this.currentmetal = 	673103550; //source 2

	
	this.totalmetals = 			139295000000 // source 1
	this.totalcoal = 			100000000000 // source 1
	this.totaloilandgas = 			114400000000 // source 1 (highest taranaki basin estimate)
	
	
	this.yearlyminingvalue = {}
	
	this.oilgrowth = 0.0
	this.coalgrowth = 0.0
	this.metalsgrowth = 0.0
	
	var jitter = {}
	var tmpyear = 2008
	while(tmpyear < 2750)
	{
		jitter[tmpyear] = Math.random() - .5
		tmpyear++;
	}

	this.setMiningGrowth = function(oilgrowth, coalgrowth, metalsgrowth)
	{
		this.oilgrowth = oilgrowth
		this.coalgrowth = coalgrowth
		this.metalsgrowth = metalsgrowth
	
		
		var year = 2009
		this.yearlyminingvalue = {}
		
		this.yearlyminingvalue[year] = {oil : this.currentoilandgas , coal : this.currentcoal, metal : this.currentmetal}
		
		var remainingoil = this.totaloilandgas - this.currentoilandgas;
		var remainingcoal = this.totalcoal - this.currentcoal;
		var remainingmetal = this.totalmetals - this.currentmetal
		
		while(remainingoil  > 0 || remainingcoal > 0 || remainingmetal > 0)
		{
			year++;
			
			var currentoil = this.yearlyminingvalue[year-1].oil * (1.0+this.oilgrowth)
			var currentcoal = this.yearlyminingvalue[year-1].coal * (1.0+this.coalgrowth)
			var currentmetal = this.yearlyminingvalue[year-1].metal * (1.0+this.metalsgrowth)
			
			currentoil += jitter[year] * currentoil*.05 //jitter for aesthetic purposes only
			currentoil = Math.min(remainingoil, currentoil)			
			remainingoil -= currentoil
			
			currentcoal += jitter[year] * currentcoal*.05
			currentcoal = Math.min(remainingcoal , currentcoal)
			remainingcoal -= currentcoal
			
			currentmetal += jitter[year] * currentmetal*.05
			currentmetal = Math.min(remainingmetal , currentmetal)
			remainingmetal -= currentmetal
			
			
			this.yearlyminingvalue[year] = {oil : currentoil , coal : currentcoal, metal : currentmetal}
			
		}
		year++
		this.yearlyminingvalue[year] = {oil : 0 , coal : 0, metal : 0}

		this._firechanged()
	}

	this.setMiningGrowth(0,0,0)
	

	
	
	//source: http://wdmzpub01.stats.govt.nz/wds/TableViewer/
	this.NZHSC = {
		1 : { name : "Animals; live" , exports : 179880231 },
		2 : { name : "Meat and edible meat offal" , exports : 5141734411 },
		3 : { name : "Fish and crustaceans, molluscs and other aquatic invertebrates" , exports : 1262083774 },
		4 : { name : "Dairy produce; birds' eggs; natural honey; edible products of animal origin, not elsewhere specified or included" , exports : 8115922507 },
		5 : { name : "Animal originated products; not elsewhere specified or included" , exports : 346524766 },
		6 : { name : "Trees and other plants, live; bulbs, roots and the like; cut flowers and ornamental foliage" , exports : 79409848 },
		7 : { name : "Vegetables and certain roots and tubers; edible" , exports : 406121539 },
		8 : { name : "Fruit and nuts, edible; peel of citrus fruit or melons" , exports : 1600766346 },
		9 : { name : "Coffee, tea, mate and spices" , exports : 10912948 },
		10 : { name : "Cereals" , exports : 7727172 },
		11 : { name : "Products of the milling industry; malt, starches, inulin, wheat gluten" , exports : 16422986 },
		12 : { name : "Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit, industrial or medicinal plants; straw and fodder" , exports : 151857793 },
		13 : { name : "Lac; gums, resins and other vegetable saps and extracts" , exports : 7632343 },
		14 : { name : "Vegetable plaiting materials; vegetable products not elsewhere specified or included" , exports : 5461147 },
		15 : { name : "Animal or vegetable fats and oils and their cleavage products; prepared animal fats; animal or vegetable waxes" , exports : 156614168 },
		16 : { name : "Meat, fish or crustaceans, molluscs or other aquatic invertebrates; preparations thereof" , exports : 257748684 },
		17 : { name : "Sugars and sugar confectionery" , exports : 145741822 },
		18 : { name : "Cocoa and cocoa preparations" , exports : 85907003 },
		19 : { name : "Preparations of cereals, flour, starch or milk; pastrycooks' products" , exports : 959970016 },
		20 : { name : "Preparations of vegetables, fruit, nuts or other parts of plants" , exports : 247834776 },
		21 : { name : "Miscellaneous edible preparations" , exports : 649763894 },
		22 : { name : "Beverages, spirits and vinegar" , exports : 1197558344 },
		23 : { name : "Food industries, residues and wastes thereof; prepared animal fodder" , exports : 303419561 },
		24 : { name : "Tobacco and manufactured tobacco substitutes" , exports : 24964766 },
		25 : { name : "Salt; sulphur; earths, stone; plastering materials, lime and cement" , exports : 44631771 },
		26 : { name : "Ores, slag and ash" , exports : 38830326 },
		27 : { name : "Mineral fuels, mineral oils and products of their distillation; bituminous substances; mineral waxes" , exports : 1893020579 },
		28 : { name : "Inorganic chemicals; organic and inorganic compounds of precious metals; of rare earth metals, of radio-active elements and of isotopes" , exports : 22476642 },
		29 : { name : "Organic chemicals" , exports : 199205591 },
		30 : { name : "Pharmaceutical products" , exports : 276355052 },
		31 : { name : "Fertilizers" , exports : 37177889 },
		32 : { name : "Tanning or dyeing extracts; tannins and their derivatives; dyes, pigments and other colouring matter; paints, varnishes; putty, other mastics; inks" , exports : 95773978 },
		33 : { name : "Essential oils and resinoids; perfumery, cosmetic or toilet preparations" , exports : 72291388 },
		34 : { name : "Soap, organic surface-active agents; washing, lubricating, polishing or scouring preparations; artificial or prepared waxes, candles and similar articles, modelling pastes, dental waxes and dental preparations with a basis of plaster" , exports : 94497317 },
		35 : { name : "Albuminoidal substances; modified starches; glues; enzymes" , exports : 1077254745 },
		36 : { name : "Explosives; pyrotechnic products; matches; pyrophoric alloys; certain combustible preparations" , exports : 6700883 },
		37 : { name : "Photographic or cinematographic goods" , exports : 15428701 },
		38 : { name : "Chemical products n.e.s." , exports : 148869080 },
		39 : { name : "Plastics and articles thereof" , exports : 433918100 },
		40 : { name : "Rubber and articles thereof" , exports : 64086692 },
		41 : { name : "Raw hides and skins (other than furskins) and leather" , exports : 375331218 },
		42 : { name : "Articles of leather; saddlery and harness; travel goods, handbags and similar containers; articles of animal gut (other than silk-worm gut)" , exports : 18374656 },
		43 : { name : "Furskins and artificial fur; manufactures thereof" , exports : 22010073 },
		44 : { name : "Wood and articles of wood; wood charcoal" , exports : 2318942107 },
		45 : { name : "Cork and articles of cork" , exports : 2152049 },
		46 : { name : "Manufactures of straw, esparto or other plaiting materials; basketware and wickerwork" , exports : 209415 },
		47 : { name : "Pulp of wood or other fibrous cellulosic material; recovered (waste and scrap) paper or paperboard" , exports : 610106945 },
		48 : { name : "Paper and paperboard; articles of paper pulp, of paper or paperboard" , exports : 534874028 },
		49 : { name : "Printed books, newspapers, pictures and other products of the printing industry; manuscripts, typescripts and plans" , exports : 66565881 },
		50 : { name : "Silk" , exports : 1301120 },
		51 : { name : "Wool, fine or coarse animal hair; horsehair yarn and woven fabric" , exports : 637897603 },
		52 : { name : "Cotton" , exports : 8438083 },
		53 : { name : "Vegetable textile fibres; paper yarn and woven fabrics of paper yarn" , exports : 2076657 },
		54 : { name : "Man-made filaments" , exports : 4815302 },
		55 : { name : "Man-made staple fibres" , exports : 12891855 },
		56 : { name : "Wadding, felt and nonwovens, special yarns; twine, cordage, ropes and cables and articles thereof" , exports : 43850027 },
		57 : { name : "Carpets and other textile floor coverings" , exports : 107236772 },
		58 : { name : "Fabrics; special woven fabrics, tufted textile fabrics, lace, tapestries, trimmings, embroidery" , exports : 5317634 },
		59 : { name : "Textile fabrics; impregnated, coated, covered or laminated; textile articles of a kind suitable for industrial use" , exports : 12500906 },
		60 : { name : "Fabrics; knitted or crocheted" , exports : 26184737 },
		61 : { name : "Apparel and clothing accessories; knitted or crocheted" , exports : 108430084 },
		62 : { name : "Apparel and clothing accessories; not knitted or crocheted" , exports : 117574266 },
		63 : { name : "Textiles, made up articles; sets; worn clothing and worn textile articles; rags" , exports : 38519886 },
		64 : { name : "Footwear; gaiters and the like; parts of such articles" , exports : 58510601 },
		65 : { name : "Headgear and parts thereof" , exports : 14454709 },
		66 : { name : "Umbrellas, sun umbrellas, walking-sticks, seat sticks, whips, riding crops; and parts thereof" , exports : 865123 },
		67 : { name : "Feathers and down, prepared; and articles made of feather or of down; artificial flowers; articles of human hair" , exports : 1666032 },
		68 : { name : "Stone, plaster, cement, asbestos, mica or similar materials; articles thereof" , exports : 32436125 },
		69 : { name : "Ceramic products" , exports : 9917391 },
		70 : { name : "Glass and glassware" , exports : 25204924 },
		71 : { name : "Natural, cultured pearls; precious, semi-precious stones; precious metals, metals clad with precious metal, and articles thereof; imitation jewellery; coin" , exports : 799703686 },
		72 : { name : "Iron and steel" , exports : 576430218 },
		73 : { name : "Iron or steel articles" , exports : 269818481 },
		74 : { name : "Copper and articles thereof" , exports : 111721938 },
		75 : { name : "Nickel and articles thereof" , exports : 132261 },
		76 : { name : "Aluminium and articles thereof" , exports : 882826681 },
		78 : { name : "Lead and articles thereof" , exports : 31478944 },
		79 : { name : "Zinc and articles thereof" , exports : 1804086 },
		80 : { name : "Tin; articles thereof" , exports : 11565858 },
		81 : { name : "Metals; n.e.s., cermets and articles thereof" , exports : 1160517 },
		82 : { name : "Tools, implements, cutlery, spoons and forks, of base metal; parts thereof, of base metal" , exports : 50128283 },
		83 : { name : "Metal; miscellaneous products of base metal" , exports : 58843546 },
		84 : { name : "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof" , exports : 1658286493 },
		85 : { name : "Electrical machinery and equipment and parts thereof; sound recorders and reproducers; television image and sound recorders and reproducers, parts and accessories of such articles" , exports : 982276757 },
		86 : { name : "Railway, tramway locomotives, rolling-stock and parts thereof; railway or tramway track fixtures and fittings and parts thereof; mechanical (including electro-mechanical) traffic signalling equipment of all kinds" , exports : 21134253 },
		87 : { name : "Vehicles; other than railway or tramway rolling stock, and parts and accessories thereof" , exports : 289880593 },
		88 : { name : "Aircraft, spacecraft and parts thereof" , exports : 316781205 },
		89 : { name : "Ships, boats and floating structures" , exports : 312573186 },
		90 : { name : "Optical, photographic, cinematographic, measuring, checking, medical or surgical instruments and apparatus; parts and accessories" , exports : 689189343 },
		91 : { name : "Clocks and watches and parts thereof" , exports : 6958386 },
		92 : { name : "Musical instruments; parts and accessories of such articles" , exports : 1959536 },
		93 : { name : "Arms and ammunition; parts and accessories thereof" , exports : 3448524 },
		94 : { name : "Furniture; bedding, mattresses, mattress supports, cushions and similar stuffed furnishings; lamps and lighting fittings, n.e.s.; illuminated signs, illuminated name-plates and the like; prefabricated buildings" , exports : 183606028 },
		95 : { name : "Toys, games and sports requisites; parts and accessories thereof" , exports : 46453751 },
		96 : { name : "Miscellaneous manufactured articles" , exports : 9993812 },
		97 : { name : "Works of art; collectors' pieces and antiques" , exports : 31083808 },
		98 : { name : "New Zealand miscellaneous provisions" , exports : 370300500 },
		99 : { name : "Non-merchandise trade" , exports : 851493768 },
		
	
	//source: http://www.stats.govt.nz/browse_for_stats/industry_sectors/imports_and_exportss/nzs-international-trade-in-services.aspx

		100 : { name : "Transportation Services" , exports : 2274000000 },
		101 : { name : "Business Travel Services" , exports : 523000000 },
		102 : { name : "Education Travel Services" , exports : 395000000 },
		103 : { name : "Health Travel Services" , exports : 12000000 },
		104 : { name : "Other Travel Services" , exports : 2959000000 },
		105 : { name : "Communication Services" , exports : 346000000 },
		106 : { name : "Construction Services" , exports : 5000000 },
		107 : { name : "Insurance Services" , exports : 28000000 },
		108 : { name : "Financial Services" , exports : 66000000 },
		109 : { name : "Computer and Information Services" , exports : 128000000 },
		110 : { name : "Royalties and licence fees" , exports : 99000000 },
		111 : { name : "Merchanting and other trade-related services" , exports : 61000000 },
		112 : { name : "Legal, accounting, management consulting and public relations Services" , exports : 148000000 },
		113 : { name : "Advertising, market research and public opinion polling Services" , exports : 42000000 },
		114 : { name : "Research and Development" , exports : 52000000 },
		115 : { name : "Agricultural, mining and on-site processing services" , exports : 2000000 },
		116 : { name : "Other business services" , exports : 114000000 },
		117 : { name : "Personal, cultural and recreational Services" , exports : 70000000 },
		118 : { name : "Government services" , exports : 114000000 }
		
	}
	
	//Guesses on industries
	
	this.NZSIC.agriculture.exports = [1,2,4,5,6,7,8,9,10,11,12,13,14,15,41,51,52,115] 
	this.NZSIC.manufacturing.exports = [11,16,17,18,19,20,21,22,23,24,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43,45,46,48,49,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,69,70,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,106]
	
	this.NZSIC.fishing.exports = [1,3,16,71]
	this.NZSIC.forestry.exports = [6,44,45,46,47,48,49]
	this.NZSIC.mining.exports = [25,26,27,31,68,69,70,72,73,74,75,76,78,79,80,81,82,83,115]
	this.NZSIC.arts_rec.exports = [97,98,117,110,104,]
	this.NZSIC.no_class.exports = [99,116,104,115,101,113]
	
	//Service industries
	this.NZSIC.acc_food.exports =[111]
	this.NZSIC.prof_sci_tech.exports = [103,105,109,110,114]
	this.NZSIC.construction.exports = [106]
	this.NZSIC.whole.exports = [111]
	this.NZSIC.retail.exports = [111]
	this.NZSIC.tran_post_ware.exports = [100]
	this.NZSIC.inform_tele.exports = [105,109]
	this.NZSIC.fin_ins.exports = [107,108,112]
	this.NZSIC.rent_hir_real.exports = []
	this.NZSIC.pub_admin_saftey.exports =	[118]
	this.NZSIC.edu_train.exports = [102]
	this.NZSIC.health_social.exports = [103]	
	this.NZSIC.admin_sup.exports = [118]
	this.NZSIC.ele_gas_wat_was.exports = []
	



	this.totalExports = function(industry)
	{
		var total = 0
		for( var e in this.NZSIC[industry].exports)
		{
			total += this.NZHSC[this.NZSIC[industry].exports[e]].exports 
		}
		
		return total
	
	}
	 //source : stats.govt.nz, assume that C = 1000000
	this.ExportCountries = {
		belgium :
		{'name': 'Belgium', 'nzimports': {2: 211635035, 3: 5836541, 4: 143436728, 5: 2566819, 6: 453650, 7: 8504848, 8: 225948, 12: 664085, 13: 41449, 16: 988337, 22: 3953737, 26: 73709, 28: 36555, 29: 2448036, 30: 9815480, 32: 44214, 33: 203487, 34: 14005, 35: 56346308, 37: 74121, 38: 699911, 39: 3933514, 40: 2330693, 41: 1672696, 42: 24488, 43: 18780, 44: 369385, 46: 8520, 47: 2357802, 48: 222587, 49: 17848, 51: 12577731, 57: 12604, 59: 964027, 60: 1647, 61: 130244, 62: 128314, 63: 41322, 64: 23432, 65: 22485, 68: 2921907, 69: 9755, 70: 17552, 71: 192712, 72: 62102, 73: 2608549, 74: 65590, 76: 257620, 79: 34498, 80: 2981, 82: 100839, 83: 17095, 84: 2973902, 85: 690014, 87: 1611825, 88: 242793, 89: 758429, 90: 1479116, 91: 1120, 94: 265451, 95: 60590, 96: 164, 97: 240509, 99: 2272600,
		
	105 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 1000000, 112 : 1000000, 113 : 1000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		malaysia :
		{'name': 'Malaysia', 'nzimports': {1: 5489129, 2: 48186530, 3: 5988512, 4: 349706199, 5: 2074851, 6: 84530, 7: 5124585, 8: 27984429, 9: 9873, 10: 752, 11: 205879, 12: 237433, 13: 34755, 15: 568314, 16: 930329, 17: 1470460, 18: 464476, 19: 57942253, 20: 7047231, 21: 7176554, 22: 4452561, 23: 4748777, 25: 1640548, 26: 117367, 27: 28547032, 28: 3661, 29: 6958578, 30: 937047, 31: 108777, 32: 2092976, 33: 771171, 34: 69945, 35: 10312219, 37: 5510, 38: 1827739, 39: 1959436, 40: 108146, 41: 124436, 42: 4921, 43: 59557, 44: 11620847, 47: 16180746, 48: 18435496, 49: 83286, 51: 1957049, 54: 1088, 55: 9115, 56: 261772, 57: 300977, 58: 24202, 59: 26333, 61: 26765, 62: 35472, 63: 183274, 64: 103929, 65: 10170, 68: 3684, 69: 111639, 70: 265669, 71: 1374, 72: 17633474, 73: 3630206, 74: 1211558, 76: 3525954, 78: 87443, 79: 25170, 80: 3048, 82: 1224836, 83: 1117415, 84: 20556427, 85: 7916163, 86: 1277218, 87: 7363131, 88: 504839, 89: 473175, 90: 2563542, 92: 3500, 94: 208403, 95: 107397, 96: 1778, 97: 1780, 99: 404193,
	105 : 1000000,  108 : 1000000, 109 : 2000000, 110 : 2000000, 111 : 1000000, 112 : 1000000, 113 : 1000000, 114 : 1000000,  116 : 1000000, 117 : 1000000}}
		,
		china :
		{'name': "People's Republic of China", 'nzimports': {1: 14835713, 2: 140522200, 3: 136393949, 4: 977760678, 5: 139349222, 6: 3158659, 7: 580547, 8: 67803061, 9: 20104, 12: 4359867, 13: 20709, 15: 98413192, 17: 2879882, 18: 736138, 19: 281139279, 20: 87680, 21: 16289864, 22: 14737537, 23: 39011893, 25: 348164, 26: 31386394, 27: 36487533, 28: 595506, 29: 57167346, 30: 1240023, 32: 1367081, 33: 709314, 34: 247293, 35: 69872904, 37: 18307, 38: 2011195, 39: 13445421, 40: 333811, 41: 80374038, 42: 59840, 43: 788897, 44: 703198381, 45: 26545, 47: 129665401, 48: 31872297, 49: 205716, 50: 7452, 51: 239642093, 52: 87844, 53: 252, 54: 104806, 55: 203480, 56: 97447, 57: 585175, 58: 21560, 59: 17557, 60: 370974, 61: 984372, 62: 881565, 63: 256383, 64: 31518, 65: 1096, 67: 83952, 68: 192557, 69: 136508, 70: 418655, 71: 164615, 72: 29623438, 73: 4946351, 74: 39904580, 76: 34516033, 78: 1196, 79: 10382, 80: 2780, 82: 207447, 83: 1390319, 84: 36158437, 85: 34876304, 86: 160654, 87: 981878, 88: 43432, 89: 712669, 90: 9471795, 91: 8792, 94: 1153590, 95: 2790960, 96: 34485, 97: 751141, 99: 85973231,	
	 106 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 1000000, 111 : 1000000, 112 : 1000000, 113 : 1000000, 114 : 1000000, 115 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		singapore :
		{'name': 'Singapore', 'nzimports': {1: 12217100, 2: 49221626, 3: 22998004, 4: 242234851, 5: 2223403, 6: 371372, 7: 5820382, 8: 21068237, 9: 31855, 10: 169787, 11: 14310, 12: 200759, 13: 155158, 15: 174074, 16: 13741726, 17: 6651426, 18: 3156953, 19: 13986071, 20: 4746771, 21: 7622221, 22: 15057867, 23: 2590437, 25: 236361, 26: 1921, 27: 319182811, 28: 48898, 29: 9213444, 30: 2506712, 31: 261345, 32: 817207, 33: 864027, 34: 76355, 35: 18090710, 36: 4974, 37: 1009817, 38: 1464935, 39: 3173349, 40: 165784, 41: 246438, 42: 1700323, 43: 298152, 44: 4566619, 46: 3173, 47: 1949833, 48: 5883462, 49: 964345, 50: 103, 51: 806844, 52: 53561, 54: 14997, 55: 19486, 56: 45195, 57: 155462, 58: 891, 59: 95345, 60: 6971, 61: 533830, 62: 474657, 63: 815737, 64: 627661, 65: 206823, 66: 23510, 67: 16670, 68: 230465, 69: 79450, 70: 147739, 71: 712844, 72: 7940984, 73: 1921268, 74: 800184, 76: 4904764, 78: 20800, 79: 1456, 80: 77019, 81: 2770, 82: 351393, 83: 393771, 84: 55088335, 85: 27990262, 86: 2942172, 87: 7527728, 88: 13763035, 89: 132024692, 90: 29835806, 91: 77111, 92: 22599, 94: 1733501, 95: 484628, 96: 109695, 97: 254273, 98: 15822, 99: 9752523,	
	105 : 1000000, 108 : 1000000, 109 : 4000000, 110 : 1000000, 111 : 1000000, 112 : 9000000, 113 : 2000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		germany :
		{'name': 'Germany', 'nzimports': {2: 446997255, 3: 28601399, 4: 31290363, 5: 3803448, 6: 406151, 7: 6094231, 8: 18185164, 9: 9387, 10: 13112, 11: 41068, 12: 10577269, 13: 291220, 15: 301717, 16: 2190614, 17: 29217, 19: 1339541, 20: 247632, 21: 265230, 22: 5037573, 23: 6811287, 24: 5368, 25: 55113, 26: 87798, 27: 241090, 28: 451169, 29: 3725470, 30: 9137550, 31: 85370, 32: 172367, 33: 1770905, 34: 133232, 35: 56342120, 36: 2539, 37: 26481, 38: 2260812, 39: 1362292, 40: 2338962, 41: 986250, 42: 298129, 43: 485509, 44: 1103597, 45: 102925, 46: 35, 47: 3895, 48: 996574, 49: 478273, 51: 22330959, 52: 9655, 53: 171, 54: 17662, 55: 49319, 56: 35815, 57: 10143, 58: 1500, 59: 3944, 60: 17473, 61: 479593, 62: 141651, 63: 235527, 64: 1016633, 65: 208842, 68: 133946, 69: 87671, 70: 484221, 71: 485035, 72: 95, 73: 1266332, 74: 53044, 76: 245734, 78: 2573, 82: 854716, 83: 1172565, 84: 30715729, 85: 10643368, 86: 199823, 87: 1421689, 88: 1073006, 89: 766740, 90: 38384924, 91: 8348, 92: 22146, 93: 21510, 94: 2822956, 95: 2085568, 96: 25571, 97: 1963597, 99: 728875,	
	105 : 1000000,  108 : 1000000, 109 : 3000000, 110 : 3000000, 111 : 1000000, 112 : 2000000, 113 : 1000000, 114 : 2000000, 115 : 1000000, 116 : 3000000, 117 : 1000000}}
		,
		australia :
		{'name': 'Australia', 'nzimports': {1: 86410835, 2: 20609899, 3: 217594373, 4: 376604675, 5: 14091480, 6: 2269642, 7: 94131566, 8: 101465133, 9: 8925069, 10: 1018391, 11: 10717753, 12: 25570284, 13: 139769, 14: 41318, 15: 11577492, 16: 88922369, 17: 61225585, 18: 58025423, 19: 258999444, 20: 148409258, 21: 249956854, 22: 447039413, 23: 54225369, 24: 24559634, 25: 6747368, 26: 3117512, 27: 1366617018, 28: 11700817, 29: 10075167, 30: 68839307, 31: 28749868, 32: 32665205, 33: 47214426, 34: 87542118, 35: 42693820, 36: 363704, 37: 9115799, 38: 105131606, 39: 265715521, 40: 28009944, 41: 15798216, 42: 8299101, 43: 2566285, 44: 331262301, 45: 447533, 46: 145625, 47: 82150505, 48: 300681259, 49: 47234521, 50: 1130358, 51: 94097447, 52: 5521785, 53: 1912354, 54: 2971444, 55: 9690760, 56: 23932629, 57: 101208010, 58: 1889310, 59: 4901474, 60: 17643780, 61: 93240589, 62: 103485734, 63: 14954644, 64: 31724178, 65: 7606252, 66: 530695, 67: 469447, 68: 12030566, 69: 3638517, 70: 14380110, 71: 768023530, 72: 180594194, 73: 100799508, 74: 38866630, 75: 12979, 76: 122849601, 78: 18781565, 79: 212737, 80: 10046339, 81: 78337, 82: 24186065, 83: 33710871, 84: 756364544, 85: 405499296, 86: 13959337, 87: 167613585, 88: 170854595, 89: 40484975, 90: 138549757, 91: 3530448, 92: 1316430, 93: 1031448, 94: 114965650, 95: 17292312, 96: 6164137, 97: 9714235, 98: 116898, 99: 173653915,	
	105 : 130000000, 106 : 1000000, 108 : 60000000, 109 : 118000000, 110 : 63000000, 111 : 1000000, 112 : 103000000, 113 : 26000000, 114 : 1000000, 115 : 1000000, 116 : 211000000, 117 : 1000000}}
		,
		netherlands :
		{'name': 'Netherlands', 'nzimports': {2: 117954369, 3: 4547026, 4: 36983624, 5: 3508142, 6: 8799573, 7: 15770938, 8: 68250501, 11: 839804, 12: 37639531, 13: 71215, 14: 3674, 15: 34504, 16: 476216, 18: 5650, 19: 14742, 20: 58751, 21: 1880515, 22: 21135623, 23: 6094863, 27: 8838, 29: 296319, 30: 4716687, 31: 7942, 32: 35546, 33: 695376, 34: 12200, 35: 6228956, 37: 55808, 38: 328808, 39: 3932618, 40: 344808, 41: 113211, 42: 133549, 43: 321976, 44: 4876779, 45: 2412, 48: 9035, 49: 108295, 50: 67, 51: 1326576, 55: 328, 56: 1696215, 57: 6015, 58: 3175, 59: 396005, 61: 83603, 62: 69336, 63: 264799, 64: 2859176, 65: 140565, 66: 48, 68: 2153613, 69: 870, 70: 457846, 71: 85901, 72: 5006907, 73: 3112797, 74: 538792, 75: 3592, 76: 36773909, 82: 192137, 83: 280023, 84: 15781124, 85: 12496751, 86: 5227, 87: 3828750, 88: 2639483, 89: 20110025, 90: 14796535, 91: 3683, 92: 2550, 93: 4900, 94: 6267620, 95: 1926132, 96: 12208, 97: 233360, 99: 171588,	
	108 : 1000000, 109 : 1000000, 110 : 7000000, 111 : 1000000, 112 : 2000000, 113 : 1000000, 114 : 1000000, 115 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		uk :
		{'name': 'United Kingdom', 'nzimports': {1: 431825, 2: 799895200, 3: 14599197, 4: 89368450, 5: 1380987, 6: 2418796, 7: 25878011, 8: 62188913, 9: 1700, 10: 200, 11: 184676, 12: 5705483, 13: 976397, 15: 687481, 16: 6180924, 17: 19110319, 18: 110517, 19: 12773724, 20: 2064282, 21: 9037333, 22: 286522535, 23: 456363, 25: 11328, 27: 80184, 28: 79485, 29: 1246224, 30: 21656258, 31: 195488, 32: 1731822, 33: 2086767, 34: 188256, 35: 3081420, 37: 143115, 38: 683624, 39: 14538751, 40: 1075522, 41: 1812392, 42: 1105528, 43: 151998, 44: 1454828, 45: 376695, 46: 119, 48: 9786595, 49: 2660650, 50: 3523, 51: 47175734, 52: 69247, 53: 1101, 54: 192736, 55: 285018, 56: 524854, 57: 462337, 58: 22320, 59: 2409061, 60: 156176, 61: 2241759, 62: 2119347, 63: 1045381, 64: 3097340, 65: 1503925, 66: 28035, 67: 207363, 68: 323483, 69: 74208, 70: 729404, 71: 781428, 72: 1358769, 73: 6157751, 74: 870277, 75: 11108, 76: 36344029, 81: 71225, 82: 745883, 83: 512643, 84: 49900451, 85: 54921389, 86: 30000, 87: 7916535, 88: 665792, 89: 11571020, 90: 33926350, 91: 62096, 92: 52467, 93: 563502, 94: 5525684, 95: 3390301, 96: 244517, 97: 6833214, 99: 7143911,	
	105 : 1000000, 106 : 1000000, 108 : 16000000, 109 : 28000000, 110 : 19000000, 111 : 8000000, 112 : 18000000, 113 : 5000000, 114 : 18000000, 115 : 1000000, 116 : 15000000, 117 : 16000000}}
		,
		uae :
		{'name': 'United Arab Emirates', 'nzimports': {1: 137500, 2: 30144622, 3: 2886434, 4: 234540978, 5: 15504, 6: 825785, 7: 1477910, 8: 16911903, 9: 45945, 12: 2756, 16: 716877, 18: 9855, 19: 2722235, 20: 219110, 21: 1220662, 22: 3785060, 23: 265792, 25: 7016, 27: 2660, 28: 76191, 29: 24432, 30: 3051012, 32: 155933, 33: 504034, 34: 4126, 35: 286219, 37: 1307975, 38: 80630, 39: 2350997, 40: 192028, 42: 31589, 43: 1445, 44: 29223190, 48: 1235886, 49: 104408, 52: 9293, 55: 2924, 56: 2960, 57: 51336, 58: 310, 59: 202395, 61: 1289138, 62: 2008417, 63: 417529, 64: 72323, 65: 49432, 66: 6555, 68: 16961, 69: 21793, 70: 46830, 71: 116311, 72: 580465, 73: 1680092, 74: 703280, 76: 802587, 82: 387791, 83: 254943, 84: 24861754, 85: 5050552, 87: 5378785, 88: 1364697, 89: 111832, 90: 1407509, 91: 15187, 92: 1564, 94: 3527118, 95: 100342, 96: 90593, 97: 26297, 99: 14808,	
	108 : 1000000, 109 : 1000000, 110 : 1000000, 111 : 1000000, 113 : 1000000, 116 : 3000000, 117 : 1000000}}
		,
		switzerland :
		{'name': 'Switzerland', 'nzimports': {2: 67650716, 3: 1236405, 4: 168861, 5: 111425, 6: 140969, 8: 143801, 12: 6994, 15: 104125, 16: 14523, 20: 388892, 21: 8118, 22: 61836, 25: 4500, 28: 34339, 29: 313621, 30: 1344469, 32: 2883, 33: 729907, 34: 135, 35: 274828, 38: 51972, 39: 161459, 40: 4699, 42: 36220, 43: 244424, 44: 152380, 45: 6869, 46: 7, 47: 1036578, 48: 4512, 49: 30707, 51: 818012, 53: 141, 54: 19370, 55: 168, 57: 20136, 59: 3700, 61: 105786, 62: 31204, 63: 12832, 64: 276987, 65: 6762, 68: 47305, 69: 16412, 70: 18503, 71: 697490, 73: 150311, 76: 4240, 82: 193072, 84: 2778234, 85: 770724, 87: 124212, 88: 3293214, 89: 54866, 90: 3441045, 91: 74299, 92: 6200, 93: 27306, 94: 33030, 95: 73308, 96: 11544, 97: 1147419,	
	105 : 1000000, 106 : 1000000, 108 : 1000000, 109 : 1000000, 111 : 1000000, 112 : 5000000, 113 : 1000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		hongkong :
		{'name': 'Hong Kong (Special Administrative Region)', 'nzimports': {1: 36156000, 2: 106281549, 3: 207927840, 4: 71336880, 5: 29920472, 6: 1617094, 7: 4435019, 8: 54222488, 9: 58041, 10: 10292, 11: 4846, 12: 1729710, 13: 21509, 15: 758252, 16: 27320175, 17: 673513, 18: 30319, 19: 3955440, 20: 874452, 21: 10760312, 22: 10982585, 23: 1201695, 25: 241634, 27: 93407, 28: 40803, 29: 497536, 30: 3980380, 32: 748030, 33: 1649690, 34: 188399, 35: 1506960, 37: 78121, 38: 4766601, 39: 18816316, 40: 359454, 41: 43845806, 42: 547029, 43: 170100, 44: 4205630, 45: 66560, 46: 1986, 47: 7134, 48: 25837748, 49: 485856, 50: 48738, 51: 5287387, 52: 219154, 53: 19648, 54: 105950, 55: 192381, 56: 117248, 57: 542853, 58: 120660, 59: 190584, 60: 2706666, 61: 541847, 62: 343974, 63: 404729, 64: 345549, 65: 287763, 66: 10, 68: 257380, 69: 22444, 70: 335020, 71: 2609190, 72: 21646975, 73: 529703, 74: 5104736, 76: 11068130, 78: 488594, 82: 18734, 83: 470877, 84: 15241949, 85: 29442801, 86: 58154, 87: 2109544, 88: 134991, 89: 412812, 90: 3278235, 91: 2180882, 94: 1804662, 95: 309397, 96: 114268, 97: 952418, 99: 5439106,	
	105 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 1000000, 111 : 5000000, 112 : 6000000, 113 : 1000000, 115 : 1000000, 116 : 3000000, 117 : 1000000}}
		,
		philippines :
		{'name': 'Philippines', 'nzimports': {1: 28000, 2: 24425287, 3: 2929711, 4: 394423007, 5: 1207352, 6: 28951, 7: 1101472, 8: 1979650, 9: 6855, 11: 31598, 12: 337604, 13: 232738, 15: 2917650, 16: 5306054, 17: 23217, 18: 3784688, 19: 20568459, 20: 73200, 21: 2541903, 22: 2222713, 23: 3477211, 25: 195362, 26: 14017, 27: 28091, 28: 31485, 29: 162966, 30: 50792, 32: 74959, 33: 206897, 34: 64457, 35: 16806627, 37: 43303, 38: 538775, 39: 2436787, 40: 21206, 42: 2455, 43: 78723, 44: 30082990, 47: 8481167, 48: 27374485, 49: 41383, 50: 1011, 51: 87130, 52: 1763, 55: 4067, 56: 84466, 57: 3467, 59: 21398, 61: 4508, 62: 14749, 63: 41969, 64: 6361, 65: 44047, 68: 154263, 69: 68848, 70: 8947, 71: 11738, 72: 9717, 73: 3447624, 74: 1305775, 76: 242084, 80: 198197, 81: 50077, 82: 129723, 83: 31459, 84: 3692282, 85: 4624115, 87: 261764, 88: 36205, 89: 36363, 90: 572342, 91: 2, 92: 70, 94: 235356, 95: 27135, 96: 10485, 99: 20918,	
	105 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 1000000, 112 : 1000000, 113 : 1000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		japan :
		{'name': 'Japan', 'nzimports': {1: 330881, 2: 274071138, 3: 133840886, 4: 301959350, 5: 14423815, 6: 32131098, 7: 132705070, 8: 249326251, 9: 33442, 10: 533944, 11: 510787, 12: 12470314, 13: 254016, 14: 2651935, 15: 2749647, 16: 27094915, 17: 6139376, 18: 11347517, 19: 18814134, 20: 38230375, 21: 156979525, 22: 8887886, 23: 9295608, 25: 121205, 26: 3376327, 27: 44780700, 28: 1488999, 29: 29921698, 30: 9349521, 32: 33642, 33: 1394178, 34: 200099, 35: 207603462, 37: 35009, 38: 2952060, 39: 6939008, 40: 172232, 41: 5795370, 42: 739250, 43: 495410, 44: 322200269, 47: 114921211, 48: 243669, 49: 256896, 51: 13745767, 52: 2063, 54: 31, 55: 515, 56: 764124, 57: 808912, 58: 40242, 59: 4400, 60: 145816, 61: 1487688, 62: 1236337, 63: 190941, 64: 513353, 65: 278438, 66: 1730, 68: 579052, 69: 1228496, 70: 329501, 71: 5325276, 72: 26451438, 73: 22046379, 74: 4826989, 76: 367697481, 78: 4, 79: 1487, 80: 5930, 82: 172492, 83: 8438292, 84: 14593259, 85: 8248784, 86: 15544, 87: 4444533, 88: 125265, 89: 1606415, 90: 22034228, 91: 316, 92: 30890, 94: 1155272, 95: 1103378, 96: 128678, 97: 235630, 98: 5349, 99: 123429004,	
	105 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 3000000, 111 : 1000000, 112 : 8000000, 113 : 1000000, 114 : 1000000, 115 : 1000000, 116 : 1000000}}
		,
		india :
		{'name': 'India', 'nzimports': {3: 242366, 4: 68232433, 5: 200276, 6: 242229, 7: 1231781, 8: 9821488, 9: 186418, 12: 715026, 13: 26866, 15: 1823664, 16: 1400, 17: 3143750, 18: 71852, 19: 71184, 20: 1777, 21: 263738, 22: 514369, 23: 128604, 25: 220225, 26: 201216, 27: 11209, 28: 5421, 29: 1683420, 30: 760388, 31: 2500, 32: 68253, 33: 3665, 34: 100, 35: 1067628, 37: 6803, 38: 221655, 39: 1358009, 40: 42497, 41: 29832807, 42: 98845, 43: 89631, 44: 92129842, 47: 7680361, 48: 4320532, 49: 67357, 51: 40237981, 54: 828, 55: 8507, 56: 17297, 57: 80885, 58: 1028, 59: 23247, 60: 4022, 61: 1218, 62: 11017, 63: 411131, 65: 17955, 69: 40860, 70: 15629, 71: 286314, 72: 19417541, 73: 58378, 74: 106770, 76: 10097325, 78: 2313065, 79: 989971, 80: 906028, 82: 140274, 83: 96527, 84: 23112694, 85: 6224468, 87: 141148, 88: 8355, 89: 576618, 90: 5193539, 91: 1600, 94: 673259, 95: 42030, 96: 22087, 99: 291588997,	
	105 : 1000000, 108 : 1000000, 109 : 1000000, 110 : 1000000, 111 : 1000000, 112 : 1000000, 113 : 1000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		korea :
		{'name': 'Republic of Korea', 'nzimports': {1: 466000, 2: 139327960, 3: 36218972, 4: 103338808, 5: 27008610, 6: 415571, 7: 12322326, 8: 72203513, 9: 27908, 10: 691297, 11: 11145, 12: 2281778, 14: 487587, 15: 6297650, 16: 9295244, 17: 1825787, 18: 2241761, 19: 8986506, 20: 7382731, 21: 33054222, 22: 7481311, 23: 434715, 25: 1527077, 27: 49919, 28: 111264, 29: 37052770, 30: 4093815, 31: 127305, 32: 464929, 33: 1502644, 34: 36190, 35: 29817613, 37: 19799, 38: 1623666, 39: 2456488, 40: 60461, 41: 22209888, 42: 38947, 43: 227507, 44: 292075420, 45: 62018, 47: 65773274, 48: 10026853, 49: 100769, 50: 1453, 51: 1437799, 52: 44049, 53: 752, 54: 10218, 55: 4584, 56: 43074, 57: 250721, 59: 33741, 60: 72224, 61: 59293, 62: 54498, 63: 174145, 64: 362783, 65: 13067, 66: 24644, 68: 27011, 69: 153868, 70: 35842, 71: 378187, 72: 39968341, 73: 1539088, 74: 1471890, 76: 149013007, 78: 8457534, 79: 32078, 80: 3533, 82: 330911, 83: 241471, 84: 19757138, 85: 5565038, 86: 7919, 87: 440156, 88: 51060, 89: 1148178, 90: 3543815, 91: 82, 92: 14098, 94: 1503476, 95: 219032, 96: 5916, 97: 1082700, 98: 13953, 99: 61413379,	
	105 : 1000000, 110 : 1000000, 111 : 1000000, 113 : 1000000, 114 : 1000000, 116 : 1000000, 117 : 1000000}}
		,
		france :
		{'name': 'France', 'nzimports': {2: 299963839, 3: 27884668, 4: 720884, 5: 4579222, 6: 723656, 7: 3545556, 8: 10420835, 10: 825176, 12: 11737925, 14: 1577, 15: 43801, 16: 431626, 17: 7653, 20: 266139, 21: 3100, 22: 2477516, 25: 7096, 26: 4602, 28: 15314, 29: 558998, 30: 24287252, 31: 8005, 32: 128271, 33: 2034363, 34: 7005, 35: 3793677, 36: 390951, 37: 1021, 38: 51524, 39: 1383989, 40: 955350, 41: 9807806, 42: 54661, 43: 43664, 44: 1685594, 48: 287286, 49: 572391, 50: 312, 51: 2081186, 54: 19401, 56: 108487, 57: 54331, 58: 3534, 59: 189, 60: 113, 61: 175358, 62: 69452, 63: 1371995, 64: 170351, 65: 77264, 66: 61, 68: 136130, 69: 1128, 70: 54192, 71: 625889, 72: 134, 73: 866132, 74: 1692, 75: 1292, 76: 2518546, 79: 178, 81: 16273, 82: 91247, 83: 36341, 84: 17085582, 85: 8080017, 87: 484871, 88: 618782, 89: 1763321, 90: 58933991, 91: 150, 92: 6835, 94: 567811, 95: 1328252, 96: 65197, 97: 343678, 99: 122638,	
	108 : 1000000, 109 : 1000000, 110 : 1000000, 112 : 3000000, 113 : 1000000, 114 : 1000000, 115 : 1000000, 116 : 2000000, 117 : 1000000}}
		,
		usa :
		{'name': 'United States of America', 'nzimports': {1: 4988508, 2: 971599362, 3: 158975785, 4: 499666223, 5: 54594042, 6: 15023622, 7: 11371202, 8: 114685733, 9: 2851, 10: 72054, 11: 24089, 12: 8294984, 13: 4185167, 14: 265482, 15: 4674686, 16: 44142217, 17: 4364961, 18: 71166, 19: 4373157, 20: 10576871, 21: 110538479, 22: 229450714, 23: 68575569, 24: 5396, 25: 1102031, 26: 24066, 27: 67165, 28: 601986, 29: 12266006, 30: 32223943, 31: 18128, 32: 35632191, 33: 1764561, 34: 1513570, 35: 401265656, 37: 179713, 38: 2458046, 39: 26189371, 40: 13146242, 41: 4753330, 42: 2670080, 43: 589050, 44: 210189137, 45: 776616, 46: 190, 47: 61190, 48: 17738197, 49: 5116764, 50: 62230, 51: 17550404, 52: 302839, 53: 78780, 54: 483134, 55: 607075, 56: 8727888, 57: 578868, 58: 2693999, 59: 1621281, 60: 289867, 61: 3002794, 62: 2516128, 63: 2664626, 64: 10766220, 65: 1240770, 66: 37483, 67: 795009, 68: 1950736, 69: 650906, 70: 619941, 71: 6714729, 72: 48911356, 73: 14280419, 74: 6378285, 75: 72845, 76: 13223303, 78: 48320, 79: 264146, 81: 732151, 82: 13152718, 83: 4542001, 84: 200277062, 85: 145996186, 86: 369788, 87: 7806580, 88: 86080703, 89: 17992170, 90: 211059568, 91: 129532, 92: 218049, 93: 712905, 94: 14133218, 95: 5066140, 96: 870697, 97: 4835613, 99: 1390864,	
	105 : 38000000, 106 : 1000000, 108 : 1000000, 109 : 89000000, 110 : 77000000, 111 : 1000000, 112 : 44000000, 113 : 1000000, 114 : 34000000, 115 : 1000000, 116 : 43000000, 117 : 275000000}}
		,
		canada :
		{'name': 'Canada', 'nzimports': {1: 3494090, 2: 239453945, 3: 12587131, 4: 45906446, 5: 1382055, 6: 1967317, 7: 3019572, 8: 8344018, 10: 63572, 12: 1318585, 13: 23050, 15: 244133, 16: 1662317, 17: 339959, 18: 2670, 19: 269753, 20: 91290, 21: 8111757, 22: 64246184, 23: 1201074, 25: 77207, 26: 9321, 27: 2612, 28: 196250, 29: 425642, 30: 5145562, 31: 67372, 32: 2047868, 33: 162657, 34: 11523, 35: 11474031, 37: 1380, 38: 91336, 39: 1397332, 40: 296231, 41: 271438, 42: 461806, 43: 63685, 44: 1460914, 46: 211, 48: 304896, 49: 1084620, 50: 1443, 51: 3307430, 52: 241890, 53: 412, 54: 7026, 55: 6655, 56: 1349029, 57: 403383, 59: 273605, 60: 110723, 61: 168834, 62: 96174, 63: 80484, 64: 792468, 65: 173556, 66: 30, 68: 63515, 69: 64218, 70: 21396, 71: 70295, 72: 9227118, 73: 956089, 74: 317849, 76: 2525677, 78: 748, 82: 212548, 83: 151398, 84: 18755758, 85: 12784003, 86: 219975, 87: 651260, 88: 4298551, 89: 531569, 90: 22714545, 92: 14793, 93: 52874, 94: 219434, 95: 337419, 96: 54877, 97: 894366, 99: 181684,	
	105 : 1000000, 108 : 1000000, 109 : 5000000, 110 : 7000000, 111 : 1000000, 112 : 3000000, 113 : 1000000, 114 : 1000000, 115 : 1000000, 116 : 1000000, 117 : 1000000}}
		}

	
	
	//FONTERRA & FISHER AND PAYKEL
	//SO... The way forward is to change the GDPPC of manufactoring (and other top 10 NZSIC) when adding companies.
	//This will significanlty move our counrty in the right direction.
	
	this.nzrevpworker = 125000
	this.aimedrevpworker = 170000 // source: http://www.manufacturingnz.org.nz/resources-and-tools/benchmarking/benchmarking-resources/heres-how-we-can-catch-australia
	
	
	
	this.nzmanufactoringrevperworker = 240000
	
	//I cannot find average revenue per New Zealander, so I assuming linear relationship between gdppc and revenue pc
	//rev/work*c = gdppc :: c = gdppc/rev/work
	
	this.revpergdp = this.nzrevpworker / (this.gdp()/this.workingPopulation);
	
	this.revperworker = function()
	{
		return (this.gdp()/this.workingPopulation)*this.revpergdp;
	}
	
	

	
	
	this.companies =
	{

		//The first are from the top 10 in the Technology investment network 2009 rankings source: http://www.tinetwork.co.nz/TIN100+Report/TIN100+2009+Rankings.html
		
		
		fandpa : {name : "Fisher&Paykel Appliances", workers : 3300, revenue : 1412000000, nzsic: "manufacturing"},
		
		datacom : {name : "Datacom", workers : 3383, revenue : 667000000, nzsic: "inform_tele"},
		
		fandphc : {name : "Fisher&Paykel Healthcare", workers : 1250, revenue : 458700000, nzsic: "manufacturing"}, // source : http://www.fphcare.com/userfiles/file/Corporate/Reports/2009/FPH%20Annual%20Report%202009.pdf and pauls talk
		
		dougpharm : {name : "Douglas Pharmaceuticals Ltd ", workers : 450, revenue : 150000000, nzsic: "manufacturing"}, //source: http://www.med.govt.nz/upload/71380/035-Douglas-Pharmaceuticals-Ltd.PDF and http://www.nzbio2011.co.nz/uploads/speakers/10fe2339f7ddc712e96a2daedd7245881d11d5eb.pdf
		
		temp : {name : "Temperzone", workers : 510, revenue : 142000000, nzsic: "manufacturing"},
		
		rakon : {name : "Rakon", workers : 800, revenue : 174300000, nzsic: "manufacturing"},
		
		tait : {name : "Tait Radio Communications", workers : 869, revenue : 190000000, nzsic: "manufacturing"}, //source: http://thescientistnz.blogspot.com/2010/02/tait-electronics.html
		
		metven : {name : "Metven", workers : 600, revenue : 137321000, nzsic: "manufacturing"},
		
		dc : {name : "Dynamic Controls", workers : 360, revenue : 100000000, nzsic: "manufacturing"},
		
		gp : {name : "Glidepath", workers : 220, revenue : 80000000, nzsic: "manufacturing"},
	}
		
		
	this.othercompanies = {
		//OTHER big New Zealand Companies
				
		fletcher: {name : "Flecher Building", workers : 20000,  revenue: 7100000000, nzsic: "construction"}, // source: http://www.fbcareers.com/images/fck/FB%20Induction%20booklet%20final.pdf and wikipedia
		
		
		fonterra : {name : "Fonterra", workers : 15600, revenue : 16726000000 , nzsic: "manufacturing" }, // source: http://www.fphcare.com/userfiles/file/Corporate/Reports/2010/2010_Full_Annual_Report.pdf and wikipeidia
				
		telecom : {name : "Telecom New Zealand", workers : 8500, revenue: 5673000000 , nzsic: "inform_tele" }, //source: wikipeidia
		
		apple : {name : "Apple Inc.", workers : 49400, revenue: 65230000000 , nzsic: "manufacturing" } // source : wikiepdia
	} 
	
	var totalrevpw = 0
	var num = 0
	for(var i in this.companies)
	{
	 	num += 1
	 	var revpw = this.companies[i].revenue/this.companies[i].workers
	 	console.log(this.companies[i].name + " : " + revpw)
	 	totalrevpw += revpw
	}
	
	this.avgrevpw = totalrevpw/num
	
	var randomnames = ["Isdom","Howvivadex","Ventoway","Goodqvolab","Technocone","Latin","Caretone","rank-media","Trippleron","J-electrics","flexlax","Hotlatcane","Groovezoom","Translux","Dansolice","Zimzabam","Codecare","Zontechno","Zimmedia","tristone","Roundron","Quoteelectrics","Techfix","Overflex","Planettaxon","Overlam","Vaiamedia","Haytontom","Zapdrill","Re-dex","Graveron","Physla","Hattrax","Xxx-ron","Sanit","Kinis","Iscore","Onto-ware","drilltrax","Salttom","ozerplex","How-trax","Anway","Jobbase","Gravetechno","Saoplex","Freeelectronics","O-drill","triodex","Zathjoin","Duoruncare","Tamzim","Iceit","Volt-can","Scotmedia","Hightrax","Stimphase","Zamhex","Fasegreen","Zensaolam","Ventocode","Trippletech","Zoomphase","Codeit","fasetechno","Damfax","baseace","Goldencorporation","Hotis","Cityzim","indigocorporation","icebam","Solfax","Dongplex","X-ex","Hotzim","u-tom","Zendax","E-dom","Drillis","unitechi","Treesolodax","Lamplus","Greentaxon","Unacom","Doubledrill","Contatech","Flexzoom","Howron","Fase-high","Uniotzap","Kanmedia","sandom","Zimrandox","Technimex","Stimtrans","Voyaphase","Zamice","Siljob","Tintax","Tresfax"]
	//source : http://online-generator.com/name-generator/company-name-generator.php
	
	this.allpseudocompanies = []
	
	var minsize = 2000
	var maxsize = 5000
	for(var i = 0 ; i < 100; i++)
	{
		var ind = "manufacturing"
		if(i % 10 == 0) { ind = "inform_tele"}
		var wor = minsize + i*(maxsize-minsize)/100
		var jitrev = this.avgrevpw + (this.avgrevpw *.05) * (Math.random() - .5) 
		this.allpseudocompanies[i] = {name : randomnames[i], workers : wor , revenue: jitrev*wor, nzsic: ind}
	}
	
	this.allpseudocompanies = shuffle(this.allpseudocompanies)
	
	this.pseudocompanies = {}
	

	//API INPUT
	
	//This function will alter the tourist worker and work by indtry values and regoin values
	this.setTourists = function(t)
	{
		
		this.tourists = t
		var workpop = this.workingPopulation;
		var tourismworkers = this.tourists / touristsperworker
		
		var nontourismworkers = workpop - tourismworkers
		
		var sum = 0
		//Distribute the tourism workers
		for(var x in this.NZSIC)
		{
			this.tourismWorkersByIndustry[x] = this.NZSIC[x].tourism_dist * tourismworkers
			this.workersByIndustry[x] = this.NZSIC[x].defaultWorkerDistribution * nontourismworkers + this.tourismWorkersByIndustry[x]
		}

		
		for(var loc in this.Region)
		{
				this.touristsByRegion[loc] = this.Region[loc].touristsdist * this.tourists;
		}
		
		this._firechanged();
		
	}
	
	this.setWorkers = function(industry,workers,ibads)
	{
		var bads = []
		if(ibads != null)
		{
			bads = ibads
		}
		
		if(! (industry in this.workersByIndustry))
		{
			throw "non existqant industry"
			return
		}
		workers = Math.min(workers,this.workingPopulation)
		var delta = this.workersByIndustry[industry] - workers
		this.workersByIndustry[industry] = workers
		
		
		//Changed this, now need to dish out remaining
		
		//Things not to change
		
		bads.push(industry)
		while(Round(delta,10) != 0 && bads.length != noOfIndustries)
		{
			var changesize = noOfIndustries - bads.length;
			
			for(var i in this.NZSIC)
			{
				var chpi = delta * this.NZSIC[i].defaultWorkerDistribution
				//if it is not in bads
				if(bads.indexOf(i) < 0)
				{
					var change = Math.max(-this.workersByIndustry[i],Math.min(this.workingPopulation-this.workersByIndustry[i],chpi)) 
					
					this.workersByIndustry[i] += change;
					delta -= change;
					if(Round(this.workersByIndustry[i],10) == 0)
					{
						bads.push(i);
					}
				}			
			}
		}
		this._firechanged()
	}
	
	var defaultinfgdppc = this.NZSIC.inform_tele.gdppc
	var defaultmangdppc = this.NZSIC.manufacturing.gdppc
	
	this.setNCompanies = function(n)
	{
		this.pseudocompanies = {}
		
		var manwork = 0
		var infwork = 0
		var manrev = 0
		var infrev = 0
		
		for(var i = 0; i < n; i ++)
		{
			var comp = this.allpseudocompanies[i]	
			this.pseudocompanies["pseudo_"+i] = comp
			if(comp.nzsic == "manufacturing")
			{
				manwork += comp.workers
				manrev += comp.revenue
			}
			else
			{
				infwork += comp.workers
				infrev += comp.revenue
			}
		}
		

		//workers
		this.setWorkers("inform_tele",this.NZSIC.inform_tele.defaultWorkerDistribution*this.workingPopulation + infwork,["manufacturing"])
		this.setWorkers("manufacturing",this.NZSIC.manufacturing.defaultWorkerDistribution*this.workingPopulation + manwork,["inform_tele"])
		
		//gdp
		this.NZSIC.inform_tele.gdppc = defaultinfgdppc
		this.NZSIC.manufacturing.gdppc = defaultmangdppc
	
		var newmangdp = manrev / this.revpergdp 
		var newinfgdp = infrev / this.revpergdp 
		
		
		
		var basemangdp = this.NZSIC.manufacturing.defaultWorkerDistribution*this.workingPopulation * this.NZSIC.manufacturing.gdppc
		var baseinfgdp = this.NZSIC.inform_tele.defaultWorkerDistribution*this.workingPopulation *  this.NZSIC.inform_tele.gdppc
		
		
		
		this.NZSIC.manufacturing.gdppc = (newmangdp + basemangdp)/this.workersByIndustry.manufacturing
		
		
		this.NZSIC.inform_tele.gdppc = (newinfgdp + baseinfgdp)/this.workersByIndustry.inform_tele
		
		
		this._firechanged();
		
	}
	
	this.setNCompanies(0)	

}


function World()
{
	this.stats = 
	{
		australia : {name:"Australia"},
		austria: {name:"Austria"},
		belgium: {name:"Belgium"},
		canada: {name:"Canada"},
		czech: {name:"Czech Republic"},
		denmark : {name:"Denmark"},
		finland  :{name:"Finland"},
		france :{name:"France"},
		germany :{name:"Germany"},
		greece :{name:"Greece"},
		hungary :{name:"Hungary"},
		ireland :{name:"Ireland"},
		italy :{name:"Italy"},
		japan :{name:"Japan"},
		korea :{name:"Korea"},
		luxembourg :{name:"Luxembourg"},
		netherlands :{name:"Netherlands"},
		norway :{name:"Norway"},
		poland :{name:"Poland"},
		portugal: {name:"Portugal"},
		slovak: {name:"Slovak Republic"},
		spain: {name:"Spain"},
		sweden: {name:"Sweden"},
		switzerland: {name:"Switzerland"},
		turkey: {name: "Turkey"},
		uk: {name:"United Kingdom"},
		usa : {name:"United States"}
	}




	this.stats.australia.work = 36
	this.stats.austria.work = 38.1
	this.stats.belgium.work = 36.8
	this.stats.canada.work = 36.5 // 2005 estimate
	this.stats.czech.work = 41.4
	this.stats.denmark.work = 33.7
	this.stats.finland.work = 37.3
	this.stats.france.work = 38
	this.stats.germany.work = 35.7
	this.stats.greece.work = 42.5
	this.stats.hungary.work = 39.8
	this.stats.ireland.work = 35.3
	this.stats.italy.work = 38
	this.stats.japan.work = 1733/52.0 //from annual working hours
	this.stats.korea.work = 46.6
	this.stats.luxembourg.work = 37.2
	this.stats.netherlands.work = 30.6
	this.stats.norway.work = 33.9
	this.stats.poland.work = 40.7
	this.stats.portugal.work = 38.9
	this.stats.slovak.work = 40.8
	this.stats.spain.work = 38.8
	this.stats.sweden.work = 36.3
	this.stats.switzerland.work = 35.1
	this.stats.turkey.work = 49.4
	this.stats.uk.work = 36.6
	this.stats.usa.work = 1768/52 // from annual workig hours

	//gdppc

	this.stats.australia.gdppc = 32273
	this.stats.austria.gdppc = 31475
	this.stats.belgium.gdppc = 29445
	this.stats.canada.gdppc = 30237
	this.stats.czech.gdppc = 19637
	this.stats.denmark.gdppc = 29193
	this.stats.finland.gdppc = 28841
	this.stats.france.gdppc = 26251
	this.stats.germany.gdppc = 27398
	this.stats.greece.gdppc = 23565
	this.stats.hungary.gdppc = 14717
	this.stats.ireland.gdppc = 31593
	this.stats.italy.gdppc = 24507
	this.stats.japan.gdppc = 26309
	this.stats.korea.gdppc = 23436
	this.stats.luxembourg.gdppc = 61432
	this.stats.netherlands.gdppc = 31817
	this.stats.norway.gdppc = 39017
	this.stats.poland.gdppc = 14944
	this.stats.portugal.gdppc = 17992
	this.stats.slovak.gdppc = 16806
	this.stats.spain.gdppc = 22961
	this.stats.sweden.gdppc = 30872
	this.stats.switzerland.gdppc = 33550
	this.stats.turkey.gdppc = 10975
	this.stats.uk.gdppc = 28201
	this.stats.usa.gdppc = 36936

	//Change values to NZD
	var USDtoNZD2000 = 2.20;
	for(var x in this.stats){this.stats[x].gdppc *= USDtoNZD2000}


	//wage

	this.stats.australia.wage = 52873
	this.stats.austria.wage = 50191
	this.stats.belgium.wage = 54491
	this.stats.canada.wage = 47883
	this.stats.czech.wage = 15762
	this.stats.denmark.wage = 68595 //2008 estimate
	this.stats.finland.wage = 49728
	this.stats.france.wage = 47699
	this.stats.germany.wage = 44564
	this.stats.greece.wage = 31253
	this.stats.hungary.wage = 13313
	this.stats.ireland.wage = 68089
	this.stats.italy.wage = 37754
	this.stats.japan.wage = 44183
	this.stats.korea.wage = 22495
	this.stats.luxembourg.wage = 69040 // 2008 value
	this.stats.netherlands.wage = 55624
	this.stats.norway.wage = 67179
	this.stats.poland.wage = 11682
	this.stats.portugal.wage = 22828
	this.stats.slovak.wage = 14432
	this.stats.spain.wage = 36064
	this.stats.sweden.wage = 44077
	this.stats.switzerland.wage = 49810 // wikipeidia value
	this.stats.turkey.wage = 12000 // A number found on the internet
	this.stats.uk.wage = 47179
	this.stats.usa.wage = 51381

	//Change values to NZD
	var USDtoNZD2009 = 1.60
	for(var x in this.stats){this.stats[x].wage *= USDtoNZD2009}



}

function AssertException(message) {
	
}



