$(document).ready(function(){


    var jobId = $("#singleJobViewId").val().trim();

    $("#deleteJobApplication").click(function(event){

 
    $.ajax({
        url:'/user/delete-job-application',
        type:'post',
        data:{id: jobId},
        success:function(response){
          if(response === 'success'){

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

          }
        },
        error:function(response){
           alert(error)
        }
    });

});


});