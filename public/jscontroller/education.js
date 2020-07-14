$(document).ready(function(){

    let id = $("#id").val().trim();
    if( id !== ""){
    $.ajax({
        url:'/user/educations',
        type:'get',
        data:{id: id},
        success:function(response){
            alert(data["201"]);
        },
        error:function(response){
            alert(data["409"]);
        }
    });
}
    
    $("#delete").click(function(event){
        event.preventDefault();
        let id = $("#id").val().trim();
        if( id !== ""){
            $.ajax({
                url:'/user/delete-education',
                type:'post',
                data:{id: id},
                success:function(response){
                    if(response==="success"){
                        alert("Education Deleted");
                        window.location.replace("/user/educations");
                    }else {
                        alert(response);
                    }
                }
            });

        } else {
            alert("Education not selected");
        }
    });


});
