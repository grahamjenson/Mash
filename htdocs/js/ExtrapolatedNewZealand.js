//Using NZSIC06, similar to ANZSIC06, but breaks apart agriculture and foresty two larger industries in NZ
var NZSIC =
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
}

//people employed per industry and median wage per industry
NZSIC.agriculture.people = 119710	
NZSIC.agriculture.wage = 23550	

NZSIC.forestry.people = 5400
NZSIC.forestry.wage = 37360

NZSIC.fishing.people = 4180
NZSIC.fishing.wage = 35000

var ag_fish_for_support_people = 34360
var ag_fish_for_support_wage = 18000

//Had to divide up the support services as they are separate 
var totalSupported = NZSIC.agriculture.people + NZSIC.forestry.people + NZSIC.fishing.people

var agchange = ag_fish_for_support_people * NZSIC.agriculture.people/totalSupported
var agwagetotal = NZSIC.agriculture.people * NZSIC.agriculture.wage + (agchange * ag_fish_for_support_wage)
NZSIC.agriculture.people += agchange
NZSIC.agriculture.wage = agwagetotal / NZSIC.agriculture.people

var forestc = ag_fish_for_support_people * NZSIC.forestry.people/totalSupported
var forwagetotal = NZSIC.forestry.people * NZSIC.forestry.wage + (forestc * ag_fish_for_support_wage)
NZSIC.forestry.people += forestc
NZSIC.forestry.wage = forwagetotal /NZSIC.forestry.people

var fishc = ag_fish_for_support_people * NZSIC.fishing.people/totalSupported
var fishwagetotal = NZSIC.fishing.people * NZSIC.fishing.wage + (fishc * ag_fish_for_support_wage)
NZSIC.fishing.people += fishc
NZSIC.fishing.wage = fishwagetotal / NZSIC.fishing.people 


NZSIC.mining.people = 6670
NZSIC.mining.wage = 60670

NZSIC.manufacturing.people = 264540
NZSIC.manufacturing.wage = 40460
		
NZSIC.ele_gas_wat_was.people = 13910	
NZSIC.ele_gas_wat_was.wage = 47380		
	
NZSIC.construction.people = 186860		
NZSIC.construction.wage = 39200	

NZSIC.whole.people = 120660	
NZSIC.whole.wage = 42820	

NZSIC.retail.people = 226640	
NZSIC.retail.wage = 23340	

NZSIC.acc_food.people = 150020	
NZSIC.acc_food.wage = 	14090

NZSIC.tran_post_ware.people = 98370	
NZSIC.tran_post_ware.wage = 40190	

NZSIC.inform_tele.people = 47040	
NZSIC.inform_tele.wage = 45700	

NZSIC.fin_ins.people = 62150	
NZSIC.fin_ins.wage = 50310	

NZSIC.rent_hir_real.people = 50770	
NZSIC.rent_hir_real.wage = 32220			
	
NZSIC.prof_sci_tech.people = 201870	
NZSIC.prof_sci_tech.wage = 47430

NZSIC.admin_sup.people = 121340	
NZSIC.admin_sup.wage = 20690

NZSIC.pub_admin_saftey.people = 106370		
NZSIC.pub_admin_saftey.wage = 50760

NZSIC.edu_train.people = 177130		
NZSIC.edu_train.wage = 40160

NZSIC.health_social.people = 194520		
NZSIC.health_social.wage = 35990

NZSIC.arts_rec.people = 119960		
NZSIC.arts_rec.wage = 29920

NZSIC.no_class.people = 21490		
NZSIC.no_class.wage = 11110

	
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
}

//GDP per worker in industry Total GDP / Number of Wrokers in Industry

//Clear Conversion
NZSIC.agriculture.gdppc = GDP.agriculture/ NZSIC.agriculture.people
NZSIC.manufacturing.gdppc = GDP.manufacturing / NZSIC.manufacturing.people
NZSIC.ele_gas_wat_was.gdppc = GDP.electricity_gas_water / NZSIC.ele_gas_wat_was.people	
NZSIC.construction.gdppc = GDP.construction / NZSIC.construction.people			
NZSIC.whole.gdppc = GDP.wholesale_trade / NZSIC.whole.people
NZSIC.fin_ins.gdppc = GDP.finance_insurance_business_trade / NZSIC.fin_ins.people

//About the smae
NZSIC.pub_admin_saftey.gdppc = GDP.gov_admin_defence / NZSIC.pub_admin_saftey.people	

//grouped
var totffm = NZSIC.forestry.people + NZSIC.fishing.people + NZSIC.mining.people
var gdpffm = GDP.fishing_forestry_mining / totffm
NZSIC.forestry.gdppc = gdpffm
NZSIC.fishing.gdppc = gdpffm
NZSIC.mining.gdppc = gdpffm

var totrc = NZSIC.retail.people + NZSIC.acc_food.people 
var gdprc = GDP.retail_acc_food / totrc
NZSIC.retail.gdppc = gdprc		
NZSIC.acc_food.gdppc = gdprc	

var tottc = NZSIC.tran_post_ware.people + NZSIC.inform_tele.people 
var gdptc = GDP.retail_acc_food / tottc
NZSIC.tran_post_ware.gdppc = gdptc	
NZSIC.inform_tele.gdppc = gdptc

//I am giong to estimate these via Australian info since ANZSIC06 is not being used for our GDP measurement.
NZSIC.rent_hir_real.gdppc = 45797.5113122172	
NZSIC.prof_sci_tech.gdppc = 34789.1373801917	
NZSIC.admin_sup.gdppc = 15598.2073265783		
NZSIC.edu_train.gdppc = 15896.7069414831	
NZSIC.health_social.gdppc = 16461.1307420495	
NZSIC.arts_rec.gdppc = 16035.1317440402	
NZSIC.no_class.gdppc = 21490
		
//Work hours per Industry per capita 2009, source QES quartley dec 2009 by  totalweekly hours / jobsfilled
var QES2010 = 
{
forestry_mining	: 			38.4,
manufacturing :				35.6,
electricity_gas_water_waste	: 	36.7,
construction	: 			30.4,
wholesale	: 			33.4,
retail	: 				26.2,
accommodation_food : 			21.5,
transport_postal_warehousing	: 	34.2,
information_media_tele	: 		31.3,
finance_insurance	: 		32.0,
rental_hiring_realestate	: 	25.9,
professional_sci_technical_admin: 	28.3,
public_administration_safety	: 	34.3,
education_training	: 		28.7,
health_social	: 			27.1,
arts_recreation_other	: 		24.7
}


NZSIC.agriculture.people = 119710	
NZSIC.forestry.people = 5400
NZSIC.fishing.people = 4180
NZSIC.agriculture.people += agchange
NZSIC.forestry.people += forestc
NZSIC.fishing.people += fishc
NZSIC.mining.people = 6670
NZSIC.manufacturing.people = 264540
NZSIC.ele_gas_wat_was.people = 13910	
NZSIC.construction.people = 186860		
NZSIC.whole.people = 120660	
NZSIC.retail.people = 226640	
NZSIC.acc_food.people = 150020	
NZSIC.tran_post_ware.people = 98370	
NZSIC.inform_tele.people = 47040	
NZSIC.fin_ins.people = 62150	
NZSIC.rent_hir_real.people = 50770	
NZSIC.prof_sci_tech.people = 201870	
NZSIC.admin_sup.people = 121340	
NZSIC.pub_admin_saftey.people = 106370		
NZSIC.edu_train.people = 177130		
NZSIC.health_social.people = 194520		
NZSIC.arts_rec.people = 119960		
NZSIC.no_class.people = 21490		



