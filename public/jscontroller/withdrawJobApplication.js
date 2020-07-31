$(document).ready(function(){


   

    $("#deleteJobApplication").click(function(event){

       var jobId = $("#singleJobViewId").val().trim();

 
    $.ajax({
        url:'/user/delete-job-application',
        type:'post',
        data:{id: jobId},
        success:function(response){
      

            $.ajax({
                url:'/user/jobcount',
                type:'get',
                async: false,
                success:function(response){
                    
                    $("#jobsApplied").text(response.jobsApplied);
                    $("#jobsAwarded").text(response.jobsAwarded);
                    $("#jobsInProgress").text(response.jobsInProgress);
                    $("#jobsCompleted").text(response.jobsCompleted);  
                    location.reload();
                },
                error:function(response){
                    
                }
            });


        },
        error:function(response){
           alert(error)
        }
    });

});






});