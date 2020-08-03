$(document).ready(function(){

    $("#viewJob").click(function(event){

        var jobId = $("#jobId").text().trim();

        $("#modal_jobId").val(jobId);
        $("#modal_title").text($("#job_title").text()) ;
        $("#modal_posted_by").text($("#postedBy").text());
        $("#modal_city_country").text($("#cityCountry").text());
        $("#modal_price").text($("#price").text());
    });

});






