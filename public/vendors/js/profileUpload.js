function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function businessLogoUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#business-logo')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
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
                .width(150)
                .height(200);
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
                .width(150)
                .height(200);
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


function handleChange(specific) {
    let checkBox = document.getElementById("specificFreelancers");
    if(specific.checked == true){
       checkBox.style.display ="block";
    }else{
        checkBox.style.display ="none";
   }
}