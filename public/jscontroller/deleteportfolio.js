$(document).ready(function(){

    let id = $("#id").val().trim();
    if( id !== ""){
    $.ajax({
        url:'/user/portfolios',
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
    
    $("#btnPortfoliodelete").click(function(event){
        event.preventDefault();
        let id = $("#id").val().trim();
        if( id !== ""){
            $.ajax({
                url:'/user/delete-portfolio',
                type:'post',
                data:{id: id},
                success:function(response){
                    if(response==="success"){
                        alert("Portfolio Deleted");
                        window.location.replace("/user/portfolios");
                    }else {
                        alert(response);
                    }
                }
            });

        } else {
            alert("Portfolio not selected");
        }
    });


});
