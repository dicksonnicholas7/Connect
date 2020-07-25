$(document).ready(function(){



    $("#jobTag").click(function(event){
        
        event.preventDefault();

            $.ajax({
                url:'/user/update-job',
                type:'get',
                data:data,
                success:function(response){
                    if(response==="success"){
                        alert("Job Updated Successfully");
                        $('#responseMess').html(
                            '<div class="alert alert-success" role="alert">' +
                            'Job Updated Successfully' +
                            '</div>'
                        );
                    }else {
                        alert(response);
                        $('#responseMess').html(
                            '<div class="alert alert-danger" role="alert">' +
                            '+ response +' +
                            '</div>'
                        );
                    }
                }
            });

        }
    });


});