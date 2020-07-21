$(document).ready(function(){

    $("#btnNext1").click(function(event){
        event.preventDefault();
        console.log("dime");


        let picture = $("#picture").val();
        let UserId = $("#UserId").val().trim()
        let businessname = $("#businessname").val().trim()
        let service = $("#service").val().trim()
        let availability = $("#availability").val().trim()
        let golden_paragraph = $("#golden_paragraph").val().trim()
        let  country = $("#country").val().trim()
        let  city = $("#city").val().trim()
        let  phone = $("#phone").val().trim()

        let data = $("#fmbprofile").serialize();

        // data.append

        

        $("#btnNext1").attr("disabled", true);


        if( businessname !== "" && service !== "" ){
            $.ajax({
                url:'/user/update-business-freelancer',
                type:'post',
                data:data,
                success:function(response){
                    window.location = '/user/#nav-profile'
                }
            });
        } else {

        }
    });

        

    
});
