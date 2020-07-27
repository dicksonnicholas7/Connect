$(document).ready(function(){

    $("#viewJobBusiness").click(function(event){
 
        var jobId = $("#singleJobViewIdBusiness").val();

        $.ajax({
            type: "GET", 
            url:'/user/view-single-job-business/' + jobId,
            async: false,
            success:function(response){
                $("#jobViewTitleBusiness").text(response.job.job_title);
                $("#jobViewNameBusiness").text(response.user.businessname);
                $("#jobViewJobTitleBusiness").text(response.user.jobtitle);
                $("#jobViewCityCountryBusiness").text(response.user.country + ", " + response.user.city );
                $("#jobViewDesBusiness").text(response.job.job_details);
                $("#jobViewSkillsBusiness").text(response.job.job_skills);
            }
        });

    });

});




