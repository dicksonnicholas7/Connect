$(document).ready(function(){
    //login
    $("#btnlogin").click(function(event){
        event.preventDefault();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        $("#btnlogin").val("Loading...");
        $("#btnlogin").attr("disabled", true);
        if( email !== "" && password !== "" ){
            $.ajax({
                url:'/login',
                type:'post',
                data:{email:email,password:password},
                success:function(response){
                    if(response.loginRes==="success"){
                        window.location = response.RedirectUrl;
                        let pageURL = window.location.pathname;
                        if(pageURL!=="/login"){
                            location.reload();
                        }else{
                            window.location = "/user/"
                        }
                    }else {
                        alert(response.loginRes);
                    }
                }
            });
        } else {
            alert("Enter your login details");
            location.reload();

        }
        $("#btnlogin").val("Login");
        $("#btnlogin").attr("disabled", false);

    });


});
