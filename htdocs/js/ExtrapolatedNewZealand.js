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
	
	//
	this.setCows = function(cows){throw "Not implemented YET"}
	
	//READONLY Variables FOR ALEX
	this.workersByIndustry = {}
	this.tourismWorkersByIndustry = {}
	this.touristsByRegion = {}
	this.tourists = 2499102 //source tourism satelitte
	
	this.dairycattlebyregion = {}
	this.dairylandusagebyregion = {}
	
	//END OF API
	
	//Static 
	var population = 4315800;
	var noOfIndustries = 21;
	this.workingPopulation = 2333960;
	var touristsperworker = 26.900990312163618;
	
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
		this.NZSIC[x].defaultWorkerDistribution = this.workersByIndustry[x] / workingPopulation
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
		this.tourismWorkersByIndustry[x] = this.NZSIC.tourism_dist * (this.tourists / touristsperworker)
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
			this.totalland += this.Region[loc].land
			this.totaldairycattle += this.dairycattlebyregion[loc]
	}	
	
	var dairycattleperkm  = this.totaldairycattle/totaldairylandusage
	var agworkerspercow = this.workersByIndustry.agriculture / this.totaldairycattle
	
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
		
		
		this.setWorkers("agriculture",agworkerspercow*this.totaldairycattle)
	}
	
	
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
		return totwork/workingPopulation
	}

	this.avgwage = function()
	{
		var totwage = 0;
		for(var x in this.NZSIC)
		{
			totwage += this.NZSIC[x].wage * this.workersByIndustry[x]
		}
		return totwage/workingPopulation
	}


	//aerage length of stay source http://www.tourismresearch.govt.nz/Data--Analysis/Analytical-Tools/International-Visitor-Value/
	this.touristsInCountryToday = function()
	{
		return this.tourists * 20.3922905527/365;
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
	
	
	
	
	//API INPUT
	
	//This function will alter the tourist worker and work by indtry values and regoin values
	this.setTourists = function(t)
	{
		
		this.tourists = t
		var workpop = workingPopulation;
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
					var change = Math.max(-this.workersByIndustry[i],Math.min(workingPopulation-this.workersByIndustry[i],chpi)) 
					
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



