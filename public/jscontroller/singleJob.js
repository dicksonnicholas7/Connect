$(document).ready(function(){

    $("#viewJob").click(function(event){
        $("#modal_jobId").value($("#jobId").text()) ;
        $("#modal_title").text($("#job_title").text()) ;
        $("#modal_posted_by").text($("#postedBy").text());
        $("#modal_city_country").text($("#cityCountry").text());
        $("#modal_price").text($("#price").text());
    });


    console.log($("#modal_jobId").value($("#jobId").text()))

});






