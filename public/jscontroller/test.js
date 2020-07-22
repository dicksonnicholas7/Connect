$(document).ready(function(){

var currentCities=[];
// This is a demo API key that can only be used for a short period of time, and will be unavailable soon. You should rather request your API key (free)  from http://battuta.medunes.net/ 	
var BATTUTA_KEY="7dbace1e554e8f281f61eb59228cb719"
  	// Populate country select box from battuta API
	url="https://geo-battuta.net/api/country/all/?key="+BATTUTA_KEY+"&callback=?";
  	$.getJSON(url,function(countries)
  	{
  		console.log(countries);
      $('#country').material_select();
	    //loop through countries..
	    $.each(countries,function(key,country)
	    {
	        $("<option></option>")
	         				.attr("value",country.code)
	         				.append(country.name)
	                     	.appendTo($("#country"));
	       
	    }); 
	    // trigger "change" to fire the #state section update process
	    $("#country").material_select('update');
	    $("#country").trigger("change");
	    

  	});
    
    $("#country").on("change",function()
  	{
  	
  		countryCode=$("#country").val();
  		
  		// Populate country select box from battuta API
	    url="https://geo-battuta.net/api/region/"
	    +countryCode
	    +"/all/?key="+BATTUTA_KEY+"&callback=?";

  		$.getJSON(url,function(regions)
  		{
  			$("#city option").remove();
		    //loop through regions..
		    $.each(regions,function(key,region)
		    {
		        $("<option></option>")
		         				.attr("value",region.region)
		         				.append(region.region)
		                     	.appendTo($("#city"));
		    });
		    // trigger "change" to fire the #state section update process
	    	$("#city").material_select('update');
	    	$("#city").trigger("change");
	    	
	    }); 
	    
      });
      

  	// $("#city").on("change",function()
  	// {
  		
  	// 	// Populate country select box from battuta API
  	// 	countryCode=$("#country").val();
	// 	region=$("#region").val();
	//     url="http://geo-battuta.net/api/city/"
	//     +countryCode
	//     +"/search/?region="
	//     +region
	//     +"&key="
	//     +BATTUTA_KEY
	//     +"&callback=?";
  		
  	// 	$.getJSON(url,function(cities)
  	// 	{
  	// 		currentCities=cities;
    //     	var i=0;
    //     	$("#city option").remove();
        
	// 	    //loop through regions..
	// 	    $.each(cities,function(key,city)
	// 	    {
	// 	        $("<option></option>")
	// 	         				.attr("value",i++)
	// 	         				.append(city.city)
	// 	                .appendTo($("#city"));
	// 	    });
	// 	    // trigger "change" to fire the #state section update process
	//     	$("#city").material_select('update');
	//     	$("#city").trigger("change");
	    	
	//     }); 
	    
  	// });	
  	// $("#city").on("change",function()
  	// {
    //   currentIndex=$("#city").val();
    //   currentCity=currentCities[currentIndex];
    //   city=currentCity.city;
    //   region=currentCity.region;
    //   country=currentCity.country;
    //   lat=currentCity.latitude;
    //   lng=currentCity.longitude;
    //   $("#location").html('<i class="fa fa-map-marker"></i> <strong> '+city+"/"+region+"</strong>("+lat+","+lng+")");
    // });
   //-----

});