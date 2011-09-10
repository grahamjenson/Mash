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
	while(tmpyear < 2500)
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
	
	this.setWorkers = function(industry,workers)
	{
		var delta = this.workersByIndustry[industry] - workers
		this.workersByIndustry[industry] = workers
		
		
		//Changed this, now need to dish out remaining
		
		//Things not to change
		var bads = []
		bads.push(industry)
		while(Round(delta,10) != 0 && bads.length != noOfIndustries)
		{
			var changesize = noOfIndustries - bads.length;
			var chpi = delta / changesize
			for(var i in this.NZSIC)
			{
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



