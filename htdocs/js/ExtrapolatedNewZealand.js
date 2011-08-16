//This is what New Zealand was in 2009
function NewZealand()
{
this.population = 4315800

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

//people employed per industry and median wage per industry
this.NZSIC.agriculture.people = 119710;	
this.NZSIC.agriculture.wage = 23550;

this.NZSIC.forestry.people = 5400;
this.NZSIC.forestry.wage = 37360;

this.NZSIC.fishing.people = 4180;
this.NZSIC.fishing.wage = 35000;

var ag_fish_for_support_people = 34360;
var ag_fish_for_support_wage = 18000;

//Had to divide up the support services as they are separate 
var totalSupported = this.NZSIC.agriculture.people + this.NZSIC.forestry.people + this.NZSIC.fishing.people;

var agchange = ag_fish_for_support_people * this.NZSIC.agriculture.people/totalSupported;
var agwagetotal = this.NZSIC.agriculture.people * this.NZSIC.agriculture.wage + (agchange * ag_fish_for_support_wage);
this.NZSIC.agriculture.people += agchange;
this.NZSIC.agriculture.wage = agwagetotal / this.NZSIC.agriculture.people;

var forestc = ag_fish_for_support_people * this.NZSIC.forestry.people/totalSupported;
var forwagetotal = this.NZSIC.forestry.people * this.NZSIC.forestry.wage + (forestc * ag_fish_for_support_wage);
this.NZSIC.forestry.people += forestc;
this.NZSIC.forestry.wage = forwagetotal /this.NZSIC.forestry.people;

var fishc = ag_fish_for_support_people * this.NZSIC.fishing.people/totalSupported;
var fishwagetotal = this.NZSIC.fishing.people * this.NZSIC.fishing.wage + (fishc * ag_fish_for_support_wage);
this.NZSIC.fishing.people += fishc;
this.NZSIC.fishing.wage = fishwagetotal / this.NZSIC.fishing.people;


this.NZSIC.mining.people = 6670;
this.NZSIC.mining.wage = 60670;

this.NZSIC.manufacturing.people = 264540;
this.NZSIC.manufacturing.wage = 40460;
		
this.NZSIC.ele_gas_wat_was.people = 13910;	
this.NZSIC.ele_gas_wat_was.wage = 47380;		
	
this.NZSIC.construction.people = 186860;		
this.NZSIC.construction.wage = 39200;	

this.NZSIC.whole.people = 120660;
this.NZSIC.whole.wage = 42820;	

this.NZSIC.retail.people = 226640;	
this.NZSIC.retail.wage = 23340;	

this.NZSIC.acc_food.people = 150020;	
this.NZSIC.acc_food.wage = 	14090;

this.NZSIC.tran_post_ware.people = 98370;	
this.NZSIC.tran_post_ware.wage = 40190;	

this.NZSIC.inform_tele.people = 47040;	
this.NZSIC.inform_tele.wage = 45700;	

this.NZSIC.fin_ins.people = 62150;	
this.NZSIC.fin_ins.wage = 50310;	

this.NZSIC.rent_hir_real.people = 50770;	
this.NZSIC.rent_hir_real.wage = 32220;			
	
this.NZSIC.prof_sci_tech.people = 201870;	
this.NZSIC.prof_sci_tech.wage = 47430;

this.NZSIC.admin_sup.people = 121340;
this.NZSIC.admin_sup.wage = 20690;

this.NZSIC.pub_admin_saftey.people = 106370;		
this.NZSIC.pub_admin_saftey.wage = 50760;

this.NZSIC.edu_train.people = 177130;		
this.NZSIC.edu_train.wage = 40160;

this.NZSIC.health_social.people = 194520;		
this.NZSIC.health_social.wage = 35990;

this.NZSIC.arts_rec.people = 119960;		
this.NZSIC.arts_rec.wage = 29920;

this.NZSIC.no_class.people = 21490;		
this.NZSIC.no_class.wage = 11110;

	
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
this.NZSIC.agriculture.gdppc = GDP.agriculture/ this.NZSIC.agriculture.people;
this.NZSIC.manufacturing.gdppc = GDP.manufacturing / this.NZSIC.manufacturing.people;
this.NZSIC.ele_gas_wat_was.gdppc = GDP.electricity_gas_water / this.NZSIC.ele_gas_wat_was.people;	
this.NZSIC.construction.gdppc = GDP.construction / this.NZSIC.construction.people;		
this.NZSIC.whole.gdppc = GDP.wholesale_trade / this.NZSIC.whole.people;
this.NZSIC.fin_ins.gdppc = GDP.finance_insurance_business / this.NZSIC.fin_ins.people;

this.NZSIC.no_class.gdppc = GDP.not_specified / this.NZSIC.no_class.people;

//About the smae
this.NZSIC.pub_admin_saftey.gdppc = GDP.gov_admin_defence / this.NZSIC.pub_admin_saftey.people;	

//grouped
var totffm = this.NZSIC.forestry.people + this.NZSIC.fishing.people + this.NZSIC.mining.people;
var gdpffm = GDP.fishing_forestry_mining / totffm;
this.NZSIC.forestry.gdppc = gdpffm;
this.NZSIC.fishing.gdppc = gdpffm;
this.NZSIC.mining.gdppc = gdpffm;

var totrc = this.NZSIC.retail.people + this.NZSIC.acc_food.people;
var gdprc = GDP.retail_acc_food / totrc;
this.NZSIC.retail.gdppc = gdprc;
this.NZSIC.acc_food.gdppc = gdprc;

var tottc = this.NZSIC.tran_post_ware.people + this.NZSIC.inform_tele.people;
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
	for(x in this.NZSIC)
	{
		gdp += this.NZSIC[x].gdppc * this.NZSIC[x].people
	}
	
	return gdp

}

this.workingpopulation = function()
{
	var totpeople = 0;
	for(x in this.NZSIC)
	{
		totpeople += this.NZSIC[x].people
	}
	
	return totpeople
}

this.gdppc = function()
{
	
	return this.gdp()/this.population
}
	
this.avgwork = function()
{
	var totwork = 0;
	var totpeople = 0;
	for(x in this.NZSIC)
	{
		totwork += this.NZSIC[x].work * this.NZSIC[x].people
		totpeople += this.NZSIC[x].people
	}
	return totwork/totpeople
}

this.avgwage = function()
{
	var totwage = 0;
	var totpeople = 0;
	for(x in this.NZSIC)
	{
		totwage += this.NZSIC[x].wage * this.NZSIC[x].people
		totpeople += this.NZSIC[x].people
	}
	return totwage/totpeople
}



//The problem with these guesses is that they will not corrospond to the information from other countries,
//So to make them more accurate we need to scale the numbers

//Scaling Hours worked per week, to OECD numbers from http://stats.oecd.org/
var OECDWorkPerWeek = 37.4
var avgw = this.avgwork()
for(x in this.NZSIC) {this.NZSIC[x].work =  this.NZSIC[x].work * OECDWorkPerWeek/avgw }


//Scaling GDPPC
var gdppcInUSD2000 = 23746; // 2009 GDP Per head, US $, constant prices, constant PPPs, OECD base year , source: http://stats.oecd.org/
var USDtoNZD2000 = 2.20; // mean over 2000, source http://www.oanda.com/currency/average
var gdppcT = USDtoNZD2000 * gdppcInUSD2000
var gdpT = gdppcT * this.population
var scale = gdpT/this.gdp()

for(x in this.NZSIC) {this.NZSIC[x].gdppc =  this.NZSIC[x].gdppc * scale }

//Scaling Wage
var averageWage = 43524 //source NZStats weeklyincome*52
var scale = averageWage/this.avgwage()
for(x in this.NZSIC) {this.NZSIC[x].wage =  this.NZSIC[x].wage * scale }


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
this.stats.japan.work = 1733/52 //from annual working hours
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
for(x in this.stats){this.stats[x].gdppc *= USDtoNZD2000}


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
for(x in this.stats){this.stats[x].wage *= USDtoNZD2009}


}

