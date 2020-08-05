$(document).ready(function(){

    $('#fmprofile input').removeClass('form-control');
    $('#fmprofile select').removeClass('form-control');
    $('#fmprofile select').removeClass('custom-select');
    $('#fmprofile textarea').removeClass('form-control');

    $('#fmprofile input').attr('disabled', true);
    $('#fmprofile input').addClass('inputdisabled');
    $('#fmprofile select').attr('disabled', true);
    $('#fmprofile select').addClass('selectdisabled');
    $('#fmprofile textarea').attr('disabled', true);
    $('#fmprofile textarea').addClass('selectdisabled');



    
    $('#edit').click(function(event){
        $('#fmprofile input').removeAttr('disabled');
        $('#fmprofile input').removeClass('inputdisabled');
        $('#fmprofile select').removeAttr('disabled');
        $('#fmprofile select').removeClass('selectdisabled');
        $('#fmprofile textarea').removeAttr('disabled');
        $('#fmprofile textarea').removeClass('selectdisabled');

        $('#fmprofile input[type=text]').addClass('form-control');
        $('#fmprofile input[type=number]').addClass('form-control');
        $('#fmprofile input[type=email]').addClass('form-control');
        $('#fmprofile input[type=tel]').addClass('form-control');
        $('#fmprofile input[type=date]').addClass('form-control');
        $('#fmprofile select').addClass('form-control');
        $('#fmprofile select').addClass('custom-select');
    });


 

    $('#country').change(function(){
        var countryCode = "";
        var currentCities=[];
        var BATTUTA_KEY="7dbace1e554e8f281f61eb59228cb719";
        var code = $("#country option:selected").text();
    
        
    $.ajax({ type: "GET",   
             url: "https://restcountries.eu/rest/v2/name/"+code+"/?fields=callingCodes",   
             async: false,
             success : function(text)
             {

                 var arr = text; 
                 var arrayToString = JSON.stringify(Object.assign({}, arr));  // convert array to string
                 var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json 
    
                var res = $.map(text, function(stringToJsonObject, i){
                    countryCode = stringToJsonObject.alpha2code;
                    return stringToJsonObject.callingCodes;
                 });
 
    
                 $("#country_code").val(res);
    
                 console.log(res);
                 console.log(countryCode);
    
             }
    });


    
    });
    


});
