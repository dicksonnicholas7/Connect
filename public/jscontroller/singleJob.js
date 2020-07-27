$(document).ready(function(){

    $("#viewJob").click(function(event){

        var jobId = $("#singleJobViewId").val();

        $.ajax({
            type: "GET", 
            url:'/user/view-single-job/' + jobId,
            async: false,
            success:function(response){
                $("#jobViewTitle").text(response.job.job_title);
                $("#jobViewName").text(response.user.firstname + "   " + response.user.lastname );
                $("#jobViewJobTitle").text(response.user.jobtitle);
                $("#jobViewCityCountry").text(response.user.country + ", " + response.user.city );
                $("#jobViewDes").text(response.job.job_details);
                $("#jobViewSkills").text(response.job.job_skills);
            }
        });

    });

});




