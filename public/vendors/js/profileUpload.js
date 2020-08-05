function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile')
                .attr('src', e.target.result)
                .width(50)
                .height(50);

                $('#profile2')
                .attr('src', e.target.result)
                .width(96)
                .height(100); 
        };
        //clement in the building
        reader.readAsDataURL(input.files[0]);
    }
}
function businessLogoUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#business-logo')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function portfolioProfile1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#portfolio-profile1')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function portfolioProfile2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#portfolio-profile2')
                .attr('src', e.target.result)
                .width(96)
                .height(100);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function secondPortfolio(){
    
    let accordionBtn = document.getElementById("accordionButton");
    let second = document.getElementById("portfolio2");

    if (second.style.display === "none") {
        second.style.display = "block";
        accordionBtn.style.display = "none";
      
      } else {
        second.style.display = "none";
        accordionBtn.style.display = "block";

      }
}
function secondExperience(){
    
    let accordionBtn = document.getElementById("accordionButton");
    let second = document.getElementById("experience2");

    if (second.style.display === "none") {
        second.style.display = "block";
        accordionBtn.style.display = "none";
      
      } else {
        second.style.display = "none";
        accordionBtn.style.display = "block";

      }
}


function handleChange(specific) {
    let checkBox = document.getElementById("specificFreelancers");
    if(specific.checked == true){
       checkBox.style.display ="block";
    }else{
        checkBox.style.display ="none";
   }
}

function AgeValidate(){
    let dob =document.getElementById("dob").value;

    let dobArr = dob.split('-');

    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDay = today.getDay();

    let year = parseInt (dobArr[0]);
    let month = parseInt(dobArr[1]);
    let day = parseInt(dobArr[2]);

    if (todayYear - year < 18){
        document.getElementById("message").textContent = "Age must be greater than 18";
        document.getElementById("dob").style.borderColor = "red";
        document.getElementById("dob").focus();
        document.getElementById("dob").required = true;
    }
}


$(document).ready(function () {
    $("#phone").keyup(function () {
        if ($(this).val().length == 3) {
        $(this).val($(this).val() + "-");
    }
    else if ($(this).val().length == 7) {
    $(this).val($(this).val() + "-");
    }

    $(this).val($(this).val().replace(/[^\d.-]/g, ''));
       
    });
});


$(document).ready(function () {
    var maxLength = 250;
$('#details').keyup(function() {
var length = $(this).val().length;
var length = maxLength-length;
$('#chars').text(length);
});
});